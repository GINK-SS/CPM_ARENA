'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import NotFound from '@/app/not-found';
import useTeamStore from '@/app/stores/team';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import Loading from '@/app/components/common/loading';
import PlayerDetail from './player-detail';
import SimpleInfo from './simple-info';
import LineUpInfo from './lineup-info';
import Lineup from './lineup';
import PositionEntry from './position-entry';

import { FIRST_YEAR, LAST_YEAR, POSITION_LIMIT, SHORTEN_DATA } from '@/app/const';

import { Team } from '@/app/stores/team/types';

export default function EntryView() {
  const { entryId } = useParams<{ entryId: string }>();
  const [selectedYear, setYear] = useYearStore(useShallow((state) => [state.selectedYear, state.setYear]));
  const [allTeams, selectedTeams, setTeams, resetTeams] = useTeamStore(
    useShallow((state) => [state.allTeams, state.selectedTeams, state.setTeams, state.resetTeams])
  );
  const [isMenu, closeMenu, isOverallFilter, closeOverallFilter] = useTableStore(
    useShallow((state) => [state.isMenu, state.closeMenu, state.isOverallFilter, state.closeOverallFilter])
  );
  const [isShowDetail, allHitters, allPitchers, selectedPlayer, pinnedPlayer, clearDetail] = usePlayerStore(
    useShallow((state) => [
      state.isShowDetail,
      state.allHitters,
      state.allPitchers,
      state.selectedPlayer,
      state.pinnedPlayer,
      state.clearDetail,
    ])
  );
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isStickyOn, setIsStickyOn] = useState(true);
  const descriptionList = ['올스타', '골든 글러브', 'MVP', '오버롤 80 이상'];

  useEffect(() => {
    init();
    makeTimeout();
  }, []);

  const init = () => {
    const paramYear = +entryId.slice(0, 4);
    const paramTeams = entryId.slice(4).match(/.{1,2}/g);

    if (
      isNaN(paramYear) ||
      paramYear < FIRST_YEAR ||
      paramYear > LAST_YEAR ||
      !paramTeams ||
      new Set(paramTeams).size !== 5
    ) {
      setStatus('invalid');
      return;
    }

    if (selectedTeams.length === 5 && selectedYear) {
      setStatus('valid');
      return;
    }

    for (let idx = 0; idx < 5; idx += 1) {
      const selectedTeam = SHORTEN_DATA[paramTeams[idx]];

      if (!selectedTeam || selectedTeam.start > paramYear || selectedTeam.end < paramYear) {
        resetTeams();
        setStatus('invalid');
        return;
      }

      setTeams({
        team: allTeams.find((team) => team.id === selectedTeam.name) as Team,
        index: idx,
        action: 'ADD',
      });
    }

    setYear(paramYear);
    setStatus('valid');
  };

  const makeTimeout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      clearDetail();
      closeMenu();
      closeOverallFilter();
    }
  };

  if (isLoading) return <Loading text='표를 생성 중입니다.' />;

  if (status === 'invalid') return <NotFound />;
  else if (status === 'pending') return null;

  return (
    <>
      <AnimatePresence>
        {(isShowDetail.isShow || isMenu || isOverallFilter) && (
          <motion.div
            className='fixed inset-0 z-10 bg-[#00000010] backdrop-blur-[3px]'
            onClick={onOuterClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlayerDetail />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className='relative mx-auto my-10 flex w-full flex-col items-center mobileL:my-20 mobileL:max-w-[630px] tablet:max-w-[750px] laptop:max-w-[850px]'
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div data-role='header' className='mb-10 flex items-center justify-center mobileL:mb-20'>
          <h1
            data-role='title'
            className='indent-8 text-[6vw] font-extrabold tracking-[8px] drop-shadow-[1px_1px_1px_#555] mobileL:indent-15 mobileL:text-40 mobileL:tracking-[15px] tablet:text-45 tablet:drop-shadow-[3px_3px_2px_#555] laptop:text-55'
          >
            {selectedYear}년 ARENA
          </h1>
        </div>

        <div data-role='entry-container' className='w-full'>
          <div data-role='teams-container' className='mb-5 flex justify-between tablet:mb-8 laptop:mb-10'>
            <div data-role='empty-position-space' className='w-[10vw] mobileL:w-70 tablet:w-90 laptop:w-100' />
            {selectedTeams.map((selectedTeam) => (
              <div
                data-role='team-wrapper'
                key={selectedTeam.id}
                className='flex flex-1 flex-col items-center justify-center gap-1 mobileL:gap-2 laptop:gap-3'
              >
                <div
                  data-role='logo'
                  className='relative aspect-square w-[7vw] drop-shadow-[1px_1px_0_#333] mobileL:w-45 mobileL:drop-shadow-[3px_3px_0_#333] tablet:w-55 laptop:w-60'
                >
                  <Image src={selectedTeam.logo} alt='logo' fill sizes='60px' />
                </div>

                <h2
                  data-role='team-name'
                  className='text-[2vw] font-semibold mobileL:text-12 tablet:text-14 laptop:text-16'
                >
                  {selectedTeam.name}
                </h2>
              </div>
            ))}
          </div>

          <div data-role='table' className='flex w-full flex-col items-center gap-2 tablet:gap-3'>
            {Object.entries(POSITION_LIMIT).map((limit) => {
              const [position, value] = limit;
              const playersOfSelectedTeams = [
                ...allHitters.get(selectedYear!)!,
                ...allPitchers.get(selectedYear!)!,
              ].filter((player) => selectedTeams.map((team) => team.id).includes(player.team));
              const filteredPlayers = playersOfSelectedTeams.filter((player) => player.position === position);

              return (
                <PositionEntry key={position} position={position} showLimit={value} filteredPlayers={filteredPlayers} />
              );
            })}
          </div>
        </div>

        <div className='flex w-full justify-around gap-2 border-t-2 border-t-black tablet:gap-3 tablet:border-t-3'>
          {descriptionList.map((description) => (
            <div
              className={classNames(
                'flex-1 py-9 text-center indent-1 text-10 font-semibold tracking-[1px]',
                'mobileL:py-13 mobileL:indent-2 mobileL:text-15 mobileL:tracking-[2px] tablet:text-17',
                'first:bg-[#f0c2bd] last:text-[#1b1588] [&:nth-child(-n+2)]:text-black [&:nth-child(2)]:bg-[#f5df94] [&:nth-child(3)]:text-[#ca4142] [&:nth-last-child(-n+2)]:bg-white'
              )}
              key={description}
            >
              {description}
            </div>
          ))}
        </div>
        <div
          className={classNames('bottom-0 z-[8] w-full', {
            sticky: isStickyOn,
            relative: !isStickyOn,
          })}
        >
          <Lineup isStickyOn={isStickyOn} setIsStickyOn={setIsStickyOn} />
        </div>
        <div className='flex w-full flex-col items-start justify-center tablet:flex-row tablet:gap-2'>
          <SimpleInfo player={pinnedPlayer ?? selectedPlayer} />
          <SimpleInfo player={pinnedPlayer ? selectedPlayer : null} />
        </div>
        <LineUpInfo />
      </motion.div>
    </>
  );
}
