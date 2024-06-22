import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import { POSITION_LIMIT } from '@/app/const';
import PlayerDetail from '../playerDetail';
import PlayerSimpleInfo from '../playerSimpleInfo';
import LineUpInfo from '../lineUpInfo';
import Menu from '../menu';
import Loading from '../loading';
import TeamEntry from '../teamEntry';

import * as S from './styles';

const TablePosition = () => {
  const { selectedYear } = useYearStore();
  const { isShowDetail, selectedPlayer, clearDetail } = usePlayerStore();
  const { selectedTeams } = useTeamStore();
  const { isMenu, closeMenu } = useTableStore();
  const [isLoading, setIsLoading] = useState(true);
  const descriptionList = ['올스타', '골든 글러브', 'MVP', '오버롤 80 이상'];

  useEffect(() => {
    if (!selectedTeams.length) return;

    const makeTimeout = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    makeTimeout();
  }, [selectedTeams]);

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
};

export default TablePosition;
