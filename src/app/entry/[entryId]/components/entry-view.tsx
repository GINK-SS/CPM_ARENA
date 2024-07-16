'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import TeamLogo from '@/app/components/common/team-logo';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import PlayerDetail from './player-detail';
import SimpleInfo from './simple-info';
import LineUpInfo from './lineup-info';
import Lineup from './lineup';
import PositionEntry from './position-entry';

import { POSITION_LIMIT } from '@/app/const';

import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';

type EntryViewProps = {
  selectedTeams: Team[];
  currentHitters: Hitter[];
  currentPitchers: Pitcher[];
  selectedYear: number;
};

export default function EntryView({ selectedTeams, currentHitters, currentPitchers, selectedYear }: EntryViewProps) {
  const [isMenu, closeMenu, isOverallFilter, closeOverallFilter] = useTableStore(
    useShallow((state) => [state.isMenu, state.closeMenu, state.isOverallFilter, state.closeOverallFilter])
  );
  const [isShowDetail, selectedPlayer, pinnedPlayer, clearDetail] = usePlayerStore(
    useShallow((state) => [state.isShowDetail, state.selectedPlayer, state.pinnedPlayer, state.clearDetail])
  );
  const [isStickyOn, setIsStickyOn] = useState(true);
  const descriptionList = ['올스타', '골든 글러브', 'MVP', '오버롤 80 이상'];

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      clearDetail();
      closeMenu();
      closeOverallFilter();
    }
  };

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
                  <TeamLogo teamId={selectedTeam.id} />
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
              const playersOfSelectedTeams = [...currentHitters, ...currentPitchers].filter((player) =>
                selectedTeams.map((team) => team.id).includes(player.team)
              );
              const filteredPlayers = playersOfSelectedTeams.filter((player) => player.position === position);

              return (
                <PositionEntry
                  key={position}
                  selectedTeams={selectedTeams}
                  position={position}
                  showLimit={value}
                  filteredPlayers={filteredPlayers}
                />
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
          <Lineup isStickyOn={isStickyOn} setIsStickyOn={setIsStickyOn} selectedTeams={selectedTeams} />
        </div>
        <div className='flex w-full flex-col items-start justify-center tablet:flex-row tablet:gap-2'>
          <SimpleInfo player={pinnedPlayer ?? selectedPlayer} />
          <SimpleInfo player={pinnedPlayer ? selectedPlayer : null} />
        </div>
        <LineUpInfo selectedTeams={selectedTeams} />
      </motion.div>
    </>
  );
}
