import { useShallow } from 'zustand/react/shallow';
import { ImArrowRight } from 'react-icons/im';

import PlayerCard from '../playerCard';
import InfoBox from '../infoBox';
import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';

import * as S from './styles';

const Lineup = () => {
  const [hitterLineup, pitcherLineup, selectedPlayer, setSelectedPlayer] = usePlayerStore(
    useShallow((state) => [state.hitterLineup, state.pitcherLineup, state.selectedPlayer, state.setSelectedPlayer])
  );
  const [isShowHitterLineup, toggleIsShowHitterLineup] = useTableStore(
    useShallow((state) => [state.isShowHitterLineup, state.toggleIsShowHitterLineup])
  );
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
  };

  const onSwitchLineup = () => {
    setSelectedPlayer(null);
    toggleIsShowHitterLineup();
  };

  return (
    <InfoBox title='라인업'>
      <S.Order>
        {(isShowHitterLineup ? hitterOrder : pitcherOrder).map((value) => (
          <S.OrderValue key={value}>{value}</S.OrderValue>
        ))}
      </S.Order>

      <S.CardWrapper>
        {(isShowHitterLineup ? hitterLineup : pitcherLineup).map((value, index) => (
          <PlayerCard key={index} card={value} />
        ))}
      </S.CardWrapper>

      <S.ButtonWrapper>
        <S.Button onClick={onCancel} $isActive={!!selectedPlayer}>
          <span>취</span>
          <span>소</span>
        </S.Button>

        {isShowHitterLineup && (
          <S.Button $isActive={false}>
            <span>수</span>
            <span>비</span>
            <span>변</span>
            <span>경</span>
          </S.Button>
        )}

        <S.Button $isActive={false}>
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
    </InfoBox>
  );
};

export default Lineup;
