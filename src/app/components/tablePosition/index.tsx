import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import { HITTER_POSITION_ORDER, PITCHER_POSITION_ORDER, POSITION_LIMIT } from '@/app/const';
import TablePlayer from '../tablePlayer';
import PlayerDetail from '../playerDetail';
import PlayerSimpleInfo from '../playerSimpleInfo';
import LineUpInfo from '../lineUpInfo';
import Menu from '../menu';
import Loading from '../loading';

import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

const TablePosition = () => {
  const { selectedYear } = useYearStore();
  const { isShowDetail, selectedPlayer, clearDetail, allHitters, allPitchers } = usePlayerStore();
  const { allTeams, selectedTeams } = useTeamStore();
  const { isMenu, overallLimit, closeMenu } = useTableStore();
  const [isLoading, setIsLoading] = useState(true);
  const [tableComponent, setTableComponent] = useState<ReactNode>();

  useEffect(() => {
    if (!selectedTeams.length) return;
    if (!selectedYear) return;

    const makeTimeout = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    setTableComponent(
      selectedTeams.map((selectedTeam, idx) => (
        <S.LineUpWrapper key={idx}>
          <S.TeamTitle>
            <S.TeamLogo>
              <Image
                src={allTeams.find((team) => team.id === selectedTeam.id)?.logo || ''}
                alt={selectedTeam.id}
                layout='fill'
                style={{ filter: 'drop-shadow(3px 3px 0 #333)' }}
              />
            </S.TeamLogo>

            <S.TeamName>{allTeams.find((team) => team.id === selectedTeam.id)?.name}</S.TeamName>
          </S.TeamTitle>

          {hitArrangePlayers(
            (allHitters.get(selectedYear) ?? []).filter(
              (hitter) =>
                hitter.year === selectedYear &&
                hitter.team === selectedTeam.id &&
                (hitter.overall >= overallLimit ||
                  hitter.all_star ||
                  hitter.mvp_korea ||
                  hitter.mvp_league ||
                  hitter.golden_glove)
            )
          ).map((group, index) => (
            <S.PositionGroup key={`h-${index}`}>
              {group.players.map((player, iindex) => (
                <TablePlayer key={`h-${index}-${iindex}`} player={player} />
              ))}
            </S.PositionGroup>
          ))}

          {pitchArrangePlayers(
            (allPitchers.get(selectedYear) ?? []).filter(
              (pitcher) =>
                pitcher.year === selectedYear &&
                pitcher.team === selectedTeam.id &&
                (pitcher.overall >= overallLimit ||
                  pitcher.all_star ||
                  pitcher.mvp_korea ||
                  pitcher.mvp_league ||
                  pitcher.golden_glove)
            )
          ).map((group, index) => (
            <S.PositionGroup key={`p-${index}`}>
              {group.players.map((player, iindex) => (
                <TablePlayer key={`p-${index}-${iindex}`} player={player} />
              ))}
            </S.PositionGroup>
          ))}
        </S.LineUpWrapper>
      ))
    );

    makeTimeout();
  }, [selectedTeams, overallLimit]);

  const hitArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = HITTER_POSITION_ORDER.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = POSITION_LIMIT[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  const pitchArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = PITCHER_POSITION_ORDER.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = POSITION_LIMIT[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      clearDetail();
      closeMenu();
    }
  };

  if (isLoading) return <Loading text='표를 생성 중입니다.' />;

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

        <S.TableContainer>
          <S.PositionTitleBox>
            {Object.entries(POSITION_LIMIT).map((limit) => (
              <S.PositionTitle key={limit[0]} $heightNum={limit[1]}>
                {limit[0]}
              </S.PositionTitle>
            ))}
          </S.PositionTitleBox>

          {tableComponent}
        </S.TableContainer>

        <S.DescriptionWrapper>
          <S.Description>올스타</S.Description>
          <S.Description>골든 글러브</S.Description>
          <S.Description>MVP</S.Description>
          <S.Description>오버롤 80 이상</S.Description>
        </S.DescriptionWrapper>

        <S.InfoWrapper>
          <PlayerSimpleInfo />
          <LineUpInfo />
        </S.InfoWrapper>
      </S.Container>
    </>
  );
};

export default TablePosition;
