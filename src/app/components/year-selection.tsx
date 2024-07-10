import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import { YEAR_LIST } from '@/app/const';

const YearSelection = () => {
  const [selectedYear, setYear, closePopup] = useYearStore(
    useShallow((state) => [state.selectedYear, state.setYear, state.closePopup])
  );
  const resetTeams = useTeamStore((state) => state.resetTeams);

  const onYearClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYear(Number(e.currentTarget.value));
    closePopup();
    resetTeams();
  };

  return (
    <motion.div
      className='absolute z-[1] grid w-[95vw] grid-cols-10 gap-2 rounded-sm border-2 bg-slate-200 p-5 tablet:w-[600px] laptop:w-[495px]'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {YEAR_LIST.map((item, index) => (
        <button
          className={classNames(
            'flex aspect-square items-center justify-center border-1 border-slate-900 bg-slate-100 text-[2.5vw] tablet:text-16 laptop:text-14',
            {
              'text-black hover:bg-[#e0a82433]': item && item !== selectedYear,
              'bg-[#410] text-white': item && item === selectedYear,
              'opacity-30': !item,
            }
          )}
          key={index}
          value={item ?? 0}
          onClick={onYearClick}
          disabled={!item}
        >
          {item ?? ''}
        </button>
      ))}
    </motion.div>
  );
};

export default YearSelection;
