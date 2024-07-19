'use client';

import useTableStore from '@/app/stores/table';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from 'framer-motion';

type BackgroundProps = {
  children: ReactNode;
};

const Background = ({ children }: BackgroundProps) => {
  const [isMenu, isOverallFilter, closeMenu, closeOverallFilter] = useTableStore(
    useShallow((state) => [state.isMenu, state.isOverallFilter, state.closeMenu, state.closeOverallFilter])
  );

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      closeMenu();
      closeOverallFilter();
    }
  };

  return (
    <div className='relative min-h-full select-none bg-[url("/assets/hideout.svg")] bg-[length:100px_100px]'>
      <AnimatePresence>
        {(isMenu || isOverallFilter) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames('fixed inset-0 z-10 bg-black/40 backdrop-blur-sm', {
              'tablet:hidden': isMenu && !isOverallFilter,
              'hidden tablet:block': isOverallFilter && !isMenu,
            })}
            onClick={onOuterClick}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default Background;
