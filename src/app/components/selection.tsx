import Image from 'next/image';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import YearSelection from './year-selection';
import TeamSelection from './team-selection';

const Selection = () => {
  const { isPopupActive: isYearPopupActive, selectedYear, openPopup: openYearPopup } = useYearStore();
  const {
    isPopupActive: isTeamPopupActive,
    allTeams,
    selectedTeams,
    openPopup: openTeamPopup,
    closePopup: closeTeamPopup,
  } = useTeamStore();

  useEffect(() => {
    if (selectedTeams.length === 5) {
      closeTeamPopup();
    }
  }, [closeTeamPopup, selectedTeams]);

  const onTeamClick = () => {
    if (!selectedYear) return;

    openTeamPopup();
  };

  return (
    <div className='mx-auto mb-60 flex max-w-[700px] flex-col justify-between gap-10 laptop:max-w-[1000px] laptop:flex-row'>
      <motion.div className='flex flex-1 items-center justify-center laptop:justify-start'>
        <button
          className={classNames(
            'relative inline-block h-45 w-full overflow-hidden border-1 indent-8 text-17 font-semibold tracking-[8px] transition-colors duration-300 ease-in-out tablet:h-60 tablet:text-20 laptop:max-w-[400px]',
            'before:absolute before:-right-50 before:bottom-0 before:left-0 before:top-0 before:-z-[1] before:-translate-x-full before:border-b-[45px] before:border-r-[50px] before:border-b-white before:border-r-transparent before:transition-transform before:duration-300 before:content-[""] tablet:before:border-b-[60px]',
            'hover:text-[#a3440f] hover:before:translate-x-0',
            {
              'text-[#a3440f] before:transform-none': selectedYear,
              'text-inherit': !selectedYear,
            }
          )}
          onClick={openYearPopup}
        >
          {selectedYear ? `IN ${selectedYear}` : '연도 설정'}
        </button>

        <AnimatePresence>{isYearPopupActive && <YearSelection />}</AnimatePresence>
      </motion.div>

      <motion.div className='flex flex-1 items-center justify-center laptop:justify-end'>
        <button
          className={classNames(
            'relative inline-block h-45 w-full overflow-hidden border-1 indent-8 text-17 font-semibold tracking-[8px] transition-colors duration-300 ease-in-out tablet:h-60 tablet:text-20 laptop:max-w-[400px]',
            'before:absolute before:-right-50 before:bottom-0 before:left-0 before:top-0 before:-z-[1] before:-translate-x-full before:border-b-[45px] before:border-r-[50px] before:border-b-white before:border-r-transparent before:transition-transform before:duration-300 before:content-[""] tablet:before:border-b-[60px]',
            'hover:text-[#a3440f] hover:before:translate-x-0',
            {
              'text-[#a3440f] before:transform-none': selectedTeams.length === 5,
              'text-inherit': selectedTeams.length !== 5,
              'opacity-30 before:content-none hover:text-inherit': !selectedYear,
            }
          )}
          onClick={onTeamClick}
          disabled={!selectedYear}
        >
          {selectedTeams.length ? (
            <div className='flex justify-center gap-20 tablet:gap-18'>
              {selectedTeams.map((selectedTeam, idx) => (
                <div
                  key={idx}
                  className='relative aspect-square w-30 drop-shadow-[2px_2px_0_#333] tablet:w-45 tablet:drop-shadow-[3px_3px_0_#333]'
                >
                  <Image
                    src={allTeams.find((team) => team.id === selectedTeam.id)?.logo || ''}
                    alt={allTeams.find((team) => team.id === selectedTeam.id)?.id || ''}
                    fill
                    sizes='45px'
                  />
                </div>
              ))}
            </div>
          ) : (
            '팀 설정'
          )}
        </button>

        <AnimatePresence>{isTeamPopupActive && <TeamSelection />}</AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Selection;
