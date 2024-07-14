import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoPerson } from 'react-icons/io5';

import useTeamStore from '@/app/stores/team';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST } from '@/app/const';

import { isTeamBuff } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

type BuffItemProps = {
  buff: Team | Records;
};

const BuffItem = ({ buff }: BuffItemProps) => {
  const [allTeams, selectedTeams] = useTeamStore(useShallow((state) => [state.allTeams, state.selectedTeams]));
  const currentBuff = useBuffStore((state) => state.currentBuff);

  const getGradeIdxAndValue = () => {
    const gradeIdx = isTeamBuff(buff)
      ? BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)])
      : BUFF_LIST[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]);

    const value = isTeamBuff(buff)
      ? BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)]) === -1
        ? 0
        : BUFF_LIST.team.gradeValues[
            BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(buff)])
          ]
      : BUFF_LIST[buff].grades.findLastIndex((grade) => grade <= currentBuff[buff]) === -1
        ? 0
        : BUFF_LIST[buff].gradeValues[BUFF_LIST[buff]?.grades.findLastIndex((grade) => grade <= currentBuff[buff])];

    return [gradeIdx, value];
  };

  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='flex flex-col items-center gap-2'>
        {!isTeamBuff(buff) ? (
          <div className='h-16 text-12 mobileL:h-20 mobileL:text-14 tablet:text-16'>{BUFF_LIST[buff]?.name}</div>
        ) : (
          <div className='relative aspect-square w-16 mobileL:w-20'>
            <Image src={allTeams.find((team) => team === buff)?.logo || ''} alt={buff.id} fill sizes='20px' />
          </div>
        )}

        <div
          className={classNames('flex items-center justify-center gap-2', {
            'opacity-20':
              BUFF_LIST[isTeamBuff(buff) ? 'team' : buff].grades[0] >
              (isTeamBuff(buff) ? currentBuff.teams[selectedTeams.indexOf(buff)] : currentBuff[buff]),
          })}
        >
          <div className='text-8 mobileL:text-12'>
            <IoPerson />
          </div>
          <span className='text-10 mobileL:text-14'>
            {isTeamBuff(buff) ? currentBuff.teams[selectedTeams.findIndex((team) => team === buff)] : currentBuff[buff]}
          </span>
        </div>

        <div className='flex'>
          {(isTeamBuff(buff) ? BUFF_LIST.team.grades : BUFF_LIST[buff].grades).map((grade) => (
            <span
              key={grade}
              className={classNames(
                'text-6 before:mx-1 before:content-["/"] first:before:content-none mobileL:text-10',
                {
                  'opacity-20': isTeamBuff(buff)
                    ? grade > currentBuff.teams[selectedTeams.indexOf(buff)]
                    : grade > currentBuff[buff],
                }
              )}
            >
              {grade}
            </span>
          ))}
        </div>
      </div>

      <span
        className={classNames('text-16 font-semibold mobileL:text-20', {
          'text-[#dd41ff]': getGradeIdxAndValue()[0] === 3,
          'text-[#ffe900]': getGradeIdxAndValue()[0] === 2,
          'text-[#70b3f8]': getGradeIdxAndValue()[0] === 1,
          'text-white': getGradeIdxAndValue()[0] === 0,
          'opacity-20': getGradeIdxAndValue()[0] === -1,
        })}
      >{`+${getGradeIdxAndValue()[1]}`}</span>
    </div>
  );
};

export default BuffItem;
