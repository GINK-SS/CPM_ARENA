import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST } from '@/app/const';

import { isTeamBuff } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

import * as S from './styles';

const Total = () => {
  const { selectedTeams } = useTeamStore();
  const { selectedLineup } = usePlayerStore();
  const { currentBuff } = useBuffStore();
  const buffOrder: (Team | Records)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  return (
    <S.Wrapper>
      <span>총 전력</span>
      <S.Value>
        {buffOrder.reduce(
          (acc, curr) =>
            acc +
            (isTeamBuff(curr)
              ? BUFF_LIST.team.grades.findLastIndex(
                  (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)]
                ) === -1
                ? 0
                : BUFF_LIST.team.gradeValues[
                    BUFF_LIST.team.grades.findLastIndex(
                      (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)]
                    )
                  ]
              : BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr]) === -1
              ? 0
              : BUFF_LIST[curr]?.gradeValues[
                  BUFF_LIST[curr]?.grades.findLastIndex((grade) => grade <= currentBuff[curr])
                ]) *
              (isTeamBuff(curr) ? currentBuff.teams[selectedTeams.indexOf(curr)] : currentBuff[curr]),
          0
        ) + selectedLineup.reduce((acc, curr) => acc + curr.overall, 0)}
      </S.Value>
    </S.Wrapper>
  );
};

export default Total;
