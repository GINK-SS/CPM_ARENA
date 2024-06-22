import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import BuffItem from './buffItem';
import Total from './total';

import { isHitter } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

import * as S from './styles';

const LineUpInfo = () => {
  const { selectedLineup, setSelectedLineup } = usePlayerStore();
  const { selectedTeams } = useTeamStore();
  const { clearBuff } = useBuffStore();
  const buffOrder: (Team | Records)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  const onReset = () => {
    setSelectedLineup({ action: 'CLEAR' });
    clearBuff();
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          ARENA <span>시너지 및 전력</span>
        </S.HeaderLeft>

        <S.HeaderRight>
          <S.PlayerNumberWrapper>
            <span>타자</span>
            <span>{`${selectedLineup.filter((player) => isHitter(player)).length} / 9`}</span>
          </S.PlayerNumberWrapper>
          <S.PlayerNumberWrapper>
            <span>투수</span>
            <span>{`${selectedLineup.filter((player) => !isHitter(player)).length} / 10`}</span>
          </S.PlayerNumberWrapper>
        </S.HeaderRight>
      </S.Header>

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
    </S.Container>
  );
};

export default LineUpInfo;
