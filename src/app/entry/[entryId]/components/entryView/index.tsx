'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence } from 'framer-motion';

import NotFound from '@/app/not-found';
import useTeamStore from '@/app/stores/team';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import Loading from '@/app/components/common/loading';
import PlayerDetail from '../playerDetail';
import Menu from '../menu';
import TeamEntry from '../teamEntry';
import PlayerSimpleInfo from '../playerSimpleInfo';
import LineUpInfo from '../lineUpInfo';
import Lineup from '../lineup';

import { FIRST_YEAR, LAST_YEAR, PITCHER_POSITION_ORDER, POSITION_LIMIT, SHORTEN_DATA } from '@/app/const';

import { Team } from '@/app/stores/team/types';
import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

export default function EntryView() {
  const { entryId } = useParams<{ entryId: string }>();
  const [selectedYear, setYear] = useYearStore(useShallow((state) => [state.selectedYear, state.setYear]));
  const [allTeams, selectedTeams, setTeams, resetTeams] = useTeamStore(
    useShallow((state) => [state.allTeams, state.selectedTeams, state.setTeams, state.resetTeams])
  );
  const [isMenu, closeMenu] = useTableStore(useShallow((state) => [state.isMenu, state.closeMenu]));
  const [isShowDetail, selectedPlayer, pinnedPlayer, hitterLineup, pitcherLineup, clearDetail] = usePlayerStore(
    useShallow((state) => [
      state.isShowDetail,
      state.selectedPlayer,
      state.pinnedPlayer,
      state.hitterLineup,
      state.pitcherLineup,
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
    }
  };

  const isBlockActive = (position: string) => {
    if (!pinnedPlayer) return false;

    if (!isHitter(pinnedPlayer)) {
      return pinnedPlayer.position === '선발'
        ? position !== '선발'
          ? true
          : false
        : position === '계투' || position === '마무리'
        ? false
        : true;
    }

    if (PITCHER_POSITION_ORDER.includes(position)) return true;

    if (hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position !== '지명타자') {
      return position !== hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position;
    }

    return false;
  };

  if (isLoading) return <Loading text='표를 생성 중입니다.' />;

  if (status === 'invalid') return <NotFound />;
  else if (status === 'pending') return null;

  return (
    <>
      <AnimatePresence>
        {(isShowDetail.isShow || isMenu) && (
          <S.Outer onClick={onOuterClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PlayerDetail />
          </S.Outer>
        )}
      </AnimatePresence>

      <S.Container initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        <S.Header>
          <S.Title>{selectedYear}년 ARENA</S.Title>
          <Menu />
        </S.Header>

        <S.Content>
          <S.PositionTitleWrapper>
            {Object.entries(POSITION_LIMIT).map((limit) => {
              const [position, value] = limit;
              return (
                <S.PositionTitle key={position} $heightNum={value}>
                  <S.PositionBlock $isActive={isBlockActive(position)} />
                  {position}
                </S.PositionTitle>
              );
            })}
          </S.PositionTitleWrapper>

          {selectedTeams.map((selectedTeam, idx) => (
            <TeamEntry selectedTeam={selectedTeam} key={idx} />
          ))}
        </S.Content>

        <S.DescriptionWrapper>
          {descriptionList.map((description) => (
            <S.Description key={description}>{description}</S.Description>
          ))}
        </S.DescriptionWrapper>

        <S.StickyBox $isSticky={isStickyOn}>
          <Lineup isStickyOn={isStickyOn} setIsStickyOn={setIsStickyOn} />
        </S.StickyBox>

        <S.InfoWrapper>
          <PlayerSimpleInfo player={pinnedPlayer ?? selectedPlayer} />
          <PlayerSimpleInfo player={pinnedPlayer ? selectedPlayer : null} />
        </S.InfoWrapper>
        <LineUpInfo />
      </S.Container>
    </>
  );
}
