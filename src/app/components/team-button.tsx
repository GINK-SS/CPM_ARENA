'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import TeamModal from './team-modal';
import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';

import { Team } from '../stores/team/types';
import TeamLogo from './common/team-logo';

type TeamButtonProps = {
  allTeams: Team[];
};

export default function TeamButton({ allTeams }: TeamButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedYear = useYearStore((state) => state.selectedYear);
  const selectedTeams = useTeamStore((state) => state.selectedTeams);

  const onClick = () => {
    if (!selectedYear) return;

    setIsOpen(true);
  };

  return (
    <div className='flex flex-1 items-center justify-center laptop:justify-end'>
      <button
        className={classNames(
          'relative z-[1] inline-block h-45 w-full overflow-hidden border-1 indent-8 text-17 font-semibold tracking-[8px] transition-colors duration-300 ease-in-out mobileL:h-60 mobileL:text-20 laptop:max-w-[400px]',
          'before:absolute before:-right-50 before:bottom-0 before:left-0 before:top-0 before:-z-[1] before:-translate-x-full before:border-b-[45px] before:border-r-[50px] before:border-b-white before:border-r-transparent before:transition-transform before:duration-300 before:content-[""] mobileL:before:border-b-[60px]',
          'hover:text-[#a3440f] hover:before:translate-x-0',
          {
            'text-[#a3440f] before:transform-none': selectedTeams.length === 5,
            'text-inherit': selectedTeams.length !== 5,
            'opacity-30 before:content-none hover:text-inherit': !selectedYear,
          }
        )}
        onClick={onClick}
        disabled={!selectedYear}
      >
        {selectedTeams.length ? (
          <div className='flex justify-center gap-20 mobileL:gap-18'>
            {selectedTeams.map((selectedTeam, idx) => (
              <div
                key={idx}
                className='relative aspect-square w-30 drop-shadow-[2px_2px_0_#333] mobileL:w-45 mobileL:drop-shadow-[3px_3px_0_#333]'
              >
                <TeamLogo teamId={selectedTeam.id} />
              </div>
            ))}
          </div>
        ) : (
          '팀 설정'
        )}
      </button>

      <AnimatePresence>{isOpen && <TeamModal allTeams={allTeams} setIsOpen={setIsOpen} />}</AnimatePresence>
    </div>
  );
}
