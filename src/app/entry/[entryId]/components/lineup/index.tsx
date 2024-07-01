import { useShallow } from 'zustand/react/shallow';
import { ImArrowRight } from 'react-icons/im';
import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

import PlayerCard from '../playerCard';
import InfoBox from '../infoBox';
import useTeamStore from '@/app/stores/team';
import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

type LineupProps = {
  isStickyOn: boolean;
  setIsStickyOn: Dispatch<SetStateAction<boolean>>;
};

const Lineup = ({ isStickyOn, setIsStickyOn }: LineupProps) => {
  const selectedTeams = useTeamStore((state) => state.selectedTeams);
  const [
    hitterLineup,
    pitcherLineup,
    selectedPlayer,
    pinnedPlayer,
    setSelectedPlayer,
    setPinnedPlayer,
    changePositionLineup,
    changeOrderLineup,
  ] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.pitcherLineup,
      state.selectedPlayer,
      state.pinnedPlayer,
      state.setSelectedPlayer,
      state.setPinnedPlayer,
      state.changePositionLineup,
      state.changeOrderLineup,
    ])
  );
  const [isShowHitterLineup, toggleIsShowHitterLineup] = useTableStore(
    useShallow((state) => [state.isShowHitterLineup, state.toggleIsShowHitterLineup])
  );
  const changeBuff = useBuffStore((state) => state.changeBuff);
  const hitterOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const pitcherOrder = [
    '1선발',
    '2선발',
    '3선발',
    '4선발',
    '5선발',
    '승리조A',
    '승리조B',
    '추격조A',
    '추격조B',
    '마무리',
  ];

  const onCancel = () => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onChangePosition = () => {
    if (!selectedPlayer || !pinnedPlayer) return;
    if (!isHitter(selectedPlayer) || !isHitter(pinnedPlayer)) return;
    if (!hitterLineup.some((hitter) => hitter.player === selectedPlayer)) return;

    changePositionLineup({ selectedPlayer, pinnedPlayer });
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onChangeOrder = () => {
    if (!selectedPlayer || !pinnedPlayer) return;
    if (isHitter(selectedPlayer) !== isHitter(pinnedPlayer)) return;

    if (
      !hitterLineup.some((hitter) => hitter.player === selectedPlayer) &&
      !pitcherLineup.some((pitcher) => pitcher.player === selectedPlayer)
    ) {
      changeBuff({
        pinnedPlayer,
        selectedPlayer,
        pinTeamIdx: selectedTeams.findIndex((selectedTeam) => selectedTeam.id === pinnedPlayer.team),
        selectTeamIdx: selectedTeams.findIndex((selectedTeam) => selectedTeam.id === selectedPlayer.team),
      });
    }

    changeOrderLineup({ selectedPlayer, pinnedPlayer });
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onSwitchLineup = () => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    toggleIsShowHitterLineup();
  };

  return (
    <InfoBox
      title='라인업'
      headerRight={
        <S.Right>
          <p>하단에 고정하기</p>
          <S.Switch onClick={() => setIsStickyOn((prev) => !prev)} $isActive={isStickyOn}>
            <motion.div className='handle' layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} />
          </S.Switch>
        </S.Right>
      }
    >
      <S.Container>
        <S.Order>
          {(isShowHitterLineup ? hitterOrder : pitcherOrder).map((value) => (
            <S.OrderValue key={value}>{value}</S.OrderValue>
          ))}
        </S.Order>

        <S.CardWrapper>
          {(isShowHitterLineup ? hitterLineup : pitcherLineup).map((value, index) => (
            <PlayerCard key={index} card={value} order={index + 1} />
          ))}
        </S.CardWrapper>

        <S.ButtonWrapper>
          <S.Button onClick={onCancel} $isActive={!!selectedPlayer || !!pinnedPlayer}>
            <span>취</span>
            <span>소</span>
          </S.Button>

          {isShowHitterLineup && (
            <S.Button
              onClick={onChangePosition}
              $isActive={
                !!pinnedPlayer && !!selectedPlayer && hitterLineup.some((hitter) => hitter.player === selectedPlayer)
              }
            >
              <span>수</span>
              <span>비</span>
              <span>변</span>
              <span>경</span>
            </S.Button>
          )}

          <S.Button
            onClick={onChangeOrder}
            $isActive={!!pinnedPlayer && !!selectedPlayer && isHitter(selectedPlayer) === isHitter(pinnedPlayer)}
          >
            <span>교</span>
            <span>체</span>
          </S.Button>

          <S.Button onClick={onSwitchLineup} $isActive>
            <span>{isShowHitterLineup ? '투' : '타'}</span>
            <span>{isShowHitterLineup ? '수' : '자'}</span>
            <span>로</span>
            <ImArrowRight />
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </InfoBox>
  );
};

export default Lineup;
