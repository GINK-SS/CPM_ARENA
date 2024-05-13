import { IoPerson } from 'react-icons/io5';

import * as S from './styles';
import usePlayerStore from '@/app/stores/player';
import Image from 'next/image';
import { PointTitle, TeamId } from '@/app/stores/player/types';

const LineUpInfo = () => {
  const { selectedTeams, allTeams, selectedLineUp, setSelectedLineUp } = usePlayerStore();
  const buffList: { [key in PointTitle]?: { name?: string; grades: number[]; gradeValues: number[] } } = {
    any_team: {
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
  const buffOrder: PointTitle[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  const onReset = () => {
    setSelectedLineUp(null);
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          ARENA <span>시너지 및 전력</span>
        </S.HeaderLeft>
      </S.Header>

      <S.Content>
        <S.BuffContainer>
          {buffOrder.map((buff, index) => (
            <S.BuffWrapper key={index}>
              <S.BuffTitleWrapper>
                {buffList[buff]?.name ? (
                  <S.BuffName>{buffList[buff]?.name}</S.BuffName>
                ) : (
                  <Image
                    src={allTeams.find((team) => team.id === buff)?.logo || ''}
                    alt={buff}
                    width={20}
                    height={20}
                  />
                )}

                <S.BuffCurrentNumberWrapper
                  $isActive={
                    (buffList[buff]?.grades ?? buffList.any_team?.grades)?.some((grade) =>
                      selectedLineUp?.count[buff]
                        ? grade <= (selectedLineUp.count[buff] as number)
                        : grade <= (selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)] as number)
                    ) as boolean
                  }
                >
                  <S.BuffCurrentIcon>
                    <IoPerson />
                  </S.BuffCurrentIcon>
                  <S.BuffCurrentNumber>
                    {selectedLineUp.count[buff] ?? selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)]}
                  </S.BuffCurrentNumber>
                </S.BuffCurrentNumberWrapper>
                <S.BuffGradeWrapper>
                  {(buffList[buff]?.grades ?? buffList.any_team?.grades)?.map((grade) => (
                    <S.BuffGrade
                      key={grade}
                      $isActive={
                        selectedLineUp?.count[buff]
                          ? grade <= (selectedLineUp.count[buff] as number)
                          : grade <= (selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)] as number)
                      }
                    >
                      {grade}
                    </S.BuffGrade>
                  ))}
                </S.BuffGradeWrapper>
              </S.BuffTitleWrapper>

              <S.BuffValue
                $value={
                  selectedLineUp.count[buff] === undefined
                    ? buffList.any_team?.grades.findLastIndex(
                        (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)]
                      ) === -1
                      ? 0
                      : (buffList.any_team?.gradeValues[
                          buffList.any_team?.grades.findLastIndex(
                            (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)]
                          )
                        ] as number)
                    : buffList[buff]?.grades.findLastIndex(
                        (grade) => grade <= (selectedLineUp.count[buff] as number)
                      ) === -1
                    ? 0
                    : (buffList[buff]?.gradeValues[
                        buffList[buff]?.grades.findLastIndex(
                          (grade) => grade <= (selectedLineUp.count[buff] as number)
                        ) as number
                      ] as number)
                }
              >{`+${
                selectedLineUp.count[buff] === undefined
                  ? buffList.any_team?.grades.findLastIndex(
                      (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)]
                    ) === -1
                    ? 0
                    : (buffList.any_team?.gradeValues[
                        buffList.any_team?.grades.findLastIndex(
                          (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(buff as TeamId)]
                        )
                      ] as number)
                  : buffList[buff]?.grades.findLastIndex((grade) => grade <= (selectedLineUp.count[buff] as number)) ===
                    -1
                  ? 0
                  : (buffList[buff]?.gradeValues[
                      buffList[buff]?.grades.findLastIndex(
                        (grade) => grade <= (selectedLineUp.count[buff] as number)
                      ) as number
                    ] as number)
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
                  (selectedLineUp.count[curr] === undefined
                    ? buffList.any_team?.grades.findLastIndex(
                        (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(curr as TeamId)]
                      ) === -1
                      ? 0
                      : (buffList.any_team?.gradeValues[
                          buffList.any_team?.grades.findLastIndex(
                            (grade) => grade <= selectedLineUp.count.teams[selectedTeams.indexOf(curr as TeamId)]
                          )
                        ] as number)
                    : buffList[curr]?.grades.findLastIndex(
                        (grade) => grade <= (selectedLineUp.count[curr] as number)
                      ) === -1
                    ? 0
                    : (buffList[curr]?.gradeValues[
                        buffList[curr]?.grades.findLastIndex(
                          (grade) => grade <= (selectedLineUp.count[curr] as number)
                        ) as number
                      ] as number)) *
                    ((selectedLineUp.count[curr] as number) ??
                      selectedLineUp.count.teams[selectedTeams.indexOf(curr as TeamId)]),
                0
              ) + selectedLineUp.players.reduce((acc, curr) => acc + curr.overall, 0)}
            </S.PowerValue>
          </S.PowerWrapper>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
};

export default LineUpInfo;
