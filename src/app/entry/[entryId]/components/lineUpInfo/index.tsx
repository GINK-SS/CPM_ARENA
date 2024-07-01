import { useShallow } from 'zustand/react/shallow';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import InfoBox from '../infoBox';
import BuffItem from './buffItem';
import Total from './total';

import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

import * as S from './styles';

const LineUpInfo = () => {
  const [hitterLineup, pitcherLineup, clearLineup] = usePlayerStore(
    useShallow((state) => [state.hitterLineup, state.pitcherLineup, state.clearLineup])
  );
  const selectedTeams = useTeamStore((state) => state.selectedTeams);
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const buffOrder: (Team | Records)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  const onReset = () => {
    clearLineup();
    clearBuff();
  };

  return (
    <InfoBox
      title='시너지 및 전력'
      headerRight={
        <S.PlayerNumber>
          <S.Wrapper>
            <span>타자</span>
            <span>{`${hitterLineup.filter((hitter) => hitter.player).length} / 9`}</span>
          </S.Wrapper>
          <S.Wrapper>
            <span>투수</span>
            <span>{`${pitcherLineup.filter((pitcher) => pitcher.player).length} / 10`}</span>
          </S.Wrapper>
        </S.PlayerNumber>
      }
    >
      <S.Content>
        <S.BuffContainer>
          {buffOrder.map((buff, index) => (
            <BuffItem buff={buff} key={index} />
          ))}
        </S.BuffContainer>

        <S.Footer>
          <S.ResetBtn onClick={onReset}>선택 초기화</S.ResetBtn>
          <Total />
        </S.Footer>
      </S.Content>
    </InfoBox>
  );
};

export default LineUpInfo;
