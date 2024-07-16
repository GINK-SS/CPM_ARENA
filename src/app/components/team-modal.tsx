import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';

import { Team } from '@/app/stores/team/types';
import TeamLogo from './common/team-logo';

type TeamModalProps = {
  allTeams: Team[];
  setIsOpen: (value: boolean) => void;
};

const TeamModal = ({ allTeams, setIsOpen }: TeamModalProps) => {
  const selectedYear = useYearStore((state) => state.selectedYear);
  const [selectedTeams, setTeams] = useTeamStore(useShallow((state) => [state.selectedTeams, state.setTeams]));
  const [selected, setSelected] = useState<Team[]>(selectedTeams);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedTeam = allTeams.find((team) => team.id === e.currentTarget.value)!;

    if (selected.includes(selectedTeam)) {
      setSelected((prev) => prev.filter((team) => team !== selectedTeam));
      return;
    }

    if (selected.length >= 5) return;

    setSelected((prev) => [...prev, selectedTeam]);
  };

  const onSubmit = () => {
    setTeams(selected);
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-10' onClick={onOuterClick} />

      <motion.div
        className={classNames(
          'absolute z-10 grid w-[95vw] grid-cols-6 gap-2 rounded-sm border-2 bg-slate-200 p-5 mobileL:w-[600px] laptop:w-[495px]'
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'tween',
          duration: 0.25,
        }}
      >
        {allTeams.map((team, index) => (
          <button
            key={index}
            className={classNames(
              'flex flex-col items-center justify-center gap-2 break-keep rounded-md border-1 border-slate-900 p-5',
              'disabled:opacity-20',
              {
                'bg-[#410] font-semibold text-white': selected.includes(team),
                'bg-white text-black': !selected.includes(team),
                'hover:bg-[#e0a82433]': !selected.includes(team) && selectedYear && team.years.includes(selectedYear),
              }
            )}
            value={team.id}
            onClick={onClick}
            disabled={!selectedYear || !team.years.includes(selectedYear)}
          >
            <div className='relative aspect-square w-[8vw] rounded-full drop-shadow-[0.5vw_0.5vw_0_#333] mobileL:w-45 mobileL:drop-shadow-[3px_3px_0_#333] laptop:w-40'>
              <TeamLogo teamId={team.id} />
            </div>

            <div className='flex w-full flex-1 items-center justify-center text-[2.2vw] mobileL:h-35 mobileL:flex-none mobileL:text-15'>
              <span>{team.name}</span>
            </div>
          </button>
        ))}

        <div className='absolute bottom-5 right-5 flex gap-10'>
          <button
            className='flex aspect-[2.3/1] w-[15vw] items-center justify-center border-1 border-slate-500 bg-orange-800 indent-4 text-[2.5vw] font-semibold tracking-[4px] shadow-md transition-[background-color,_opacity] hover:bg-orange-900 disabled:opacity-30 mobileL:w-100 mobileL:text-16'
            onClick={onSubmit}
            disabled={selected.length !== 5}
          >
            확인
          </button>

          <button
            className={
              'flex aspect-[2.3/1] w-[15vw] items-center justify-center border-1 border-slate-500 bg-slate-600 indent-4 text-[2.5vw] font-semibold tracking-[4px] shadow-md transition-colors hover:bg-slate-700 mobileL:w-100 mobileL:text-16'
            }
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default TeamModal;
