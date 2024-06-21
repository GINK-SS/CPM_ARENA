import { IoPerson } from 'react-icons/io5';
import Image from 'next/image';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST } from '@/app/const';

import { isHitter, isTeamBuff } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Record } from '@/app/stores/buff/types';

import * as S from './styles';

const LineUpInfo = () => {
  const { selectedLineup, setSelectedLineup } = usePlayerStore();
  const { allTeams, selectedTeams } = useTeamStore();
  const { currentBuff, clearBuff } = useBuffStore();
  const buffOrder: (Team | Record)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

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
            <S.BuffWrapper key={index}>
              <S.BuffTitleWrapper>
                {!isTeamBuff(buff) ? (
                  <S.BuffName>{BUFF_LIST[buff]?.name}</S.BuffName>
                ) : (
                  <S.BuffLogo>
                    <Image src={allTeams.find((team) => team === buff)?.logo || ''} alt={buff.id} layout='fill' />
                  </S.BuffLogo>
                )}

                <S.BuffCurrentNumberWrapper
                  $isActive={
                    BUFF_LIST[isTeamBuff(buff) ? 'team' : buff].grades[0] <=
                    (isTeamBuff(buff) ? currentBuff.teams[selectedTeams.indexOf(buff)] : currentBuff[buff])
                  }
                >
                  <S.BuffCurrentIcon>
                    <IoPerson />
                  </S.BuffCurrentIcon>
                  <S.BuffCurrentNumber>
                    {isTeamBuff(buff)
                      ? currentBuff.teams[selectedTeams.findIndex((team) => team === buff)]
                      : currentBuff[buff]}
                  </S.BuffCurrentNumber>
                </S.BuffCurrentNumberWrapper>
                <S.BuffGradeWrapper>
                  {(isTeamBuff(buff) ? BUFF_LIST.team.grades : BUFF_LIST[buff].grades).map((grade) => (
                    <S.BuffGrade
                      key={grade}
                      $isActive={
                        isTeamBuff(buff)
                          ? grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                          : grade <= currentBuff[buff]
                      }
                    >
                      {grade}
                    </S.BuffGrade>
                  ))}
                </S.BuffGradeWrapper>
              </S.BuffTitleWrapper>

              <S.BuffValue
                $value={
                  isTeamBuff(buff)
                    ? BUFF_LIST.team.grades.findLastIndex(
                        (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                      ) === -1
                      ? 0
                      : BUFF_LIST.team.gradeValues[
                          BUFF_LIST.team.grades.findLastIndex(
                            (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                          )
                        ]
                    : BUFF_LIST[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
                    ? 0
                    : BUFF_LIST[buff]?.gradeValues[
                        BUFF_LIST[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])
                      ]
                }
              >{`+${
                isTeamBuff(buff)
                  ? BUFF_LIST.team.grades.findLastIndex(
                      (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                    ) === -1
                    ? 0
                    : BUFF_LIST.team.gradeValues[
                        BUFF_LIST.team.grades.findLastIndex(
                          (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                        )
                      ]
                  : BUFF_LIST[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
                  ? 0
                  : BUFF_LIST[buff]?.gradeValues[
                      BUFF_LIST[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])
                    ]
              }`}</S.BuffValue>
            </S.BuffWrapper>
          ))}
        </S.BuffContainer>

        <S.Footer>
          <S.ResetBtn onClick={onReset}>선택 초기화</S.ResetBtn>

          <S.PowerWrapper>
            <span>총 전력</span>
            <S.PowerValue>
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
            </S.PowerValue>
          </S.PowerWrapper>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
};

export default LineUpInfo;
