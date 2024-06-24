'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

import { FIRST_YEAR, LAST_YEAR, POSITION_LIMIT, SHORTEN_DATA } from '@/app/const';

import { Team } from '@/app/stores/team/types';

import * as S from './styles';

export default function EntryView() {
  const { entryId } = useParams<{ entryId: string }>();
  const { selectedYear, setYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams, resetTeams } = useTeamStore();
  const { isMenu, closeMenu } = useTableStore();
  const { isShowDetail, selectedPlayer, clearDetail } = usePlayerStore();
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) return <Loading text='표를 생성 중입니다.' />;

  if (status === 'invalid') return <NotFound />;
  else if (status === 'pending') return null;

  return (
    <>
      <AnimatePresence>
        {(isShowDetail || isMenu) && (
          <S.Outer
            onClick={onOuterClick}
            $isActive={!!selectedPlayer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <S.Container initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        <PlayerDetail />

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

        <S.InfoWrapper>
          <PlayerSimpleInfo />
          <LineUpInfo />
        </S.InfoWrapper>
      </S.Container>
    </>
  );
}
