import usePlayerStore from '@/app/stores/player';
import { HITTER_STAT, PITCHER_STAT } from '@/app/const';

import { Hitter, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

const Stat = () => {
  const { selectedPlayer } = usePlayerStore();

  return (
    selectedPlayer && (
      <S.StatContainer>
        {Object.entries(isHitter(selectedPlayer) ? HITTER_STAT : PITCHER_STAT).map((value, index) => {
          const [statName, statKey] = value;

          const statValue = isHitter(selectedPlayer)
            ? selectedPlayer[statKey as keyof Hitter]
            : selectedPlayer[statKey as keyof Pitcher];

          return (
            <S.StatWrapper key={index}>
              <S.StatName>{statName}</S.StatName>
              <S.StatValue $stat={statValue as number}>{statValue}</S.StatValue>
            </S.StatWrapper>
          );
        })}
      </S.StatContainer>
    )
  );
};

export default Stat;
