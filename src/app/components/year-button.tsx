'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import YearModal from './year-modal';
import useYearStore from '../stores/year';

export default function YearButton() {
  const selectedYear = useYearStore((state) => state.selectedYear);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => setIsOpen(true);

  return (
    <div className='flex flex-1 items-center justify-center laptop:justify-start'>
      <button
        className={classNames(
          'relative z-[1] inline-block h-45 w-full overflow-hidden border-1 indent-8 text-17 font-semibold tracking-[8px] transition-colors duration-300 ease-in-out mobileL:h-60 mobileL:text-20 laptop:max-w-[400px]',
          'before:absolute before:-right-50 before:bottom-0 before:left-0 before:top-0 before:-z-[1] before:-translate-x-full before:border-b-[45px] before:border-r-[50px] before:border-b-white before:border-r-transparent before:transition-transform before:duration-300 before:content-[""] mobileL:before:border-b-[60px]',
          'hover:text-[#a3440f] hover:before:translate-x-0',
          {
            'text-[#a3440f] before:transform-none': selectedYear,
            'text-inherit': !selectedYear,
          }
        )}
        onClick={onClick}
      >
        {selectedYear ? `IN ${selectedYear}` : '연도 설정'}
      </button>

      <AnimatePresence>{isOpen && <YearModal setIsOpen={setIsOpen} />}</AnimatePresence>
    </div>
  );
}
