import Image from 'next/image';
import { IoPerson } from 'react-icons/io5';

import useTeamStore from '@/app/stores/team';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST } from '@/app/const';

import { isTeamBuff } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

import * as S from './styles';

type BuffItemProps = {
  buff: Team | Records;
};

const BuffItem = ({ buff }: BuffItemProps) => {
  const { allTeams, selectedTeams } = useTeamStore();
  const { currentBuff } = useBuffStore();
  const value = isTeamBuff(buff)
    ? BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]) === -1
      ? 0
      : BUFF_LIST.team.gradeValues[
          BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)])
        ]
    : BUFF_LIST[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
    ? 0
    : BUFF_LIST[buff].gradeValues[BUFF_LIST[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])];

  return (
    <S.Container>
      <S.Wrapper>
        {!isTeamBuff(buff) ? (
          <S.Title>{BUFF_LIST[buff]?.name}</S.Title>
        ) : (
          <S.Logo>
            <Image src={allTeams.find((team) => team === buff)?.logo || ''} alt={buff.id} fill sizes='20px' />
          </S.Logo>
        )}

        <S.CurrentNumberWrapper
          $isActive={
            BUFF_LIST[isTeamBuff(buff) ? 'team' : buff].grades[0] <=
            (isTeamBuff(buff) ? currentBuff.teams[selectedTeams.indexOf(buff)] : currentBuff[buff])
          }
        >
          <S.Icon>
            <IoPerson />
          </S.Icon>
          <S.CurrentNumber>
            {isTeamBuff(buff) ? currentBuff.teams[selectedTeams.findIndex((team) => team === buff)] : currentBuff[buff]}
          </S.CurrentNumber>
        </S.CurrentNumberWrapper>

        <S.GradeWrapper>
          {(isTeamBuff(buff) ? BUFF_LIST.team.grades : BUFF_LIST[buff].grades).map((grade) => (
            <S.Grade
              key={grade}
              $isActive={
                isTeamBuff(buff) ? grade <= currentBuff.teams[selectedTeams.indexOf(buff)] : grade <= currentBuff[buff]
              }
            >
              {grade}
            </S.Grade>
          ))}
        </S.GradeWrapper>
      </S.Wrapper>

      <S.Value $value={value}>{`+${value}`}</S.Value>
    </S.Container>
  );
};

export default BuffItem;
