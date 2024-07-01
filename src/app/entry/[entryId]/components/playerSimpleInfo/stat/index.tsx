import usePlayerStore from '@/app/stores/player';
import { HITTER_STAT, PITCHER_STAT } from '@/app/const';

import { Hitter, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

type StatProps = {
  player: Hitter | Pitcher | null;
};

const Stat = ({ player }: StatProps) => {
  return (
    player && (
      <S.StatContainer>
        {Object.entries(isHitter(player) ? HITTER_STAT : PITCHER_STAT).map((value, index) => {
          const [statName, statKey] = value;

          const statValue = isHitter(player) ? player[statKey as keyof Hitter] : player[statKey as keyof Pitcher];

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
