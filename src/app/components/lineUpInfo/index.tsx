import { IoPerson } from 'react-icons/io5';
import Image from 'next/image';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import { Team } from '@/app/stores/team/types';
import { Buff, Record } from '@/app/stores/buff/types';

import * as S from './styles';

const LineUpInfo = () => {
  const { selectedLineup, setSelectedLineup } = usePlayerStore();
  const { allTeams, selectedTeams } = useTeamStore();
  const { currentBuff, clearBuff } = useBuffStore();

  const buffList: { [key in Buff]: { name?: string; grades: number[]; gradeValues: number[] } } = {
    team: {
      grades: [2, 4, 6, 9],
      gradeValues: [3, 6, 9, 10],
    },
    all_star: {
      name: '올스타',
      grades: [5, 9, 12],
      gradeValues: [2, 3, 4],
    },
    golden_glove: {
      name: '골글',
      grades: [2, 3, 5],
      gradeValues: [2, 3, 5],
    },
    mvp: {
      name: 'MVP',
      grades: [1, 2],
      gradeValues: [2, 4],
    },
  };
  const buffOrder: (Team | Record)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  const isTeamBuff = (buff: Team | Record): buff is Team => !!(buff as Team).id;

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
            <span>{`${selectedLineup.filter((player) => !!player.batting_all).length} / 9`}</span>
          </S.PlayerNumberWrapper>
          <S.PlayerNumberWrapper>
            <span>투수</span>
            <span>{`${selectedLineup.filter((player) => !player.batting_all).length} / 10`}</span>
          </S.PlayerNumberWrapper>
        </S.HeaderRight>
      </S.Header>

      <S.Content>
        <S.BuffContainer>
          {buffOrder.map((buff, index) => (
            <S.BuffWrapper key={index}>
              <S.BuffTitleWrapper>
                {!isTeamBuff(buff) ? (
                  <S.BuffName>{buffList[buff]?.name}</S.BuffName>
                ) : (
                  <S.BuffLogo>
                    <Image src={allTeams.find((team) => team === buff)?.logo || ''} alt={buff.id} layout='fill' />
                  </S.BuffLogo>
                )}

                <S.BuffCurrentNumberWrapper
                  $isActive={
                    buffList[isTeamBuff(buff) ? 'team' : buff].grades[0] <=
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
                  {(isTeamBuff(buff) ? buffList.team.grades : buffList[buff].grades).map((grade) => (
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
                    ? buffList.team.grades.findLastIndex(
                        (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                      ) === -1
                      ? 0
                      : buffList.team.gradeValues[
                          buffList.team.grades.findLastIndex(
                            (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                          )
                        ]
                    : buffList[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
                    ? 0
                    : buffList[buff]?.gradeValues[
                        buffList[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])
                      ]
                }
              >{`+${
                isTeamBuff(buff)
                  ? buffList.team.grades.findLastIndex(
                      (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                    ) === -1
                    ? 0
                    : buffList.team.gradeValues[
                        buffList.team.grades.findLastIndex(
                          (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]
                        )
                      ]
                  : buffList[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
                  ? 0
                  : buffList[buff]?.gradeValues[
                      buffList[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])
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
                    ? buffList.team.grades.findLastIndex(
                        (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)]
                      ) === -1
                      ? 0
                      : buffList.team.gradeValues[
                          buffList.team.grades.findLastIndex(
                            (grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)]
                          )
                        ]
                    : buffList[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr]) === -1
                    ? 0
                    : buffList[curr]?.gradeValues[
                        buffList[curr]?.grades.findLastIndex((grade) => grade <= currentBuff[curr])
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
