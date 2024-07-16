'use client';

import { ReactNode, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import PlayerDetail from './player-detail';
import SimpleInfo from './simple-info';
import LineUpInfo from './lineup-info';
import Lineup from './lineup';

import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';

type EntryPageProps = {
  selectedTeams: Team[];
  currentHitters: Hitter[];
  currentPitchers: Pitcher[];
  selectedYear: number;
  children: ReactNode;
};

export default function EntryPage({
  selectedTeams,
  currentHitters,
  currentPitchers,
  selectedYear,
  children,
}: EntryPageProps) {
  const [isMenu, closeMenu, isOverallFilter, closeOverallFilter] = useTableStore(
    useShallow((state) => [state.isMenu, state.closeMenu, state.isOverallFilter, state.closeOverallFilter])
  );
  const [isShowDetail, selectedPlayer, pinnedPlayer, clearDetail] = usePlayerStore(
    useShallow((state) => [state.isShowDetail, state.selectedPlayer, state.pinnedPlayer, state.clearDetail])
  );
  const [isStickyOn, setIsStickyOn] = useState(true);

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      clearDetail();
      closeMenu();
      closeOverallFilter();
    }
  };

  return (
    <>
      <AnimatePresence>
        {(isShowDetail.isShow || isMenu || isOverallFilter) && (
          <motion.div
            className='fixed inset-0 z-10 bg-[#00000010] backdrop-blur-[3px]'
            onClick={onOuterClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlayerDetail />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className='relative mx-auto my-10 flex w-full flex-col items-center mobileL:my-20 mobileL:max-w-[630px] tablet:max-w-[750px] laptop:max-w-[850px]'
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}

        <div
          className={classNames('bottom-0 z-[8] w-full', {
            sticky: isStickyOn,
            relative: !isStickyOn,
          })}
        >
          <Lineup isStickyOn={isStickyOn} setIsStickyOn={setIsStickyOn} selectedTeams={selectedTeams} />
        </div>
        <div className='flex w-full flex-col items-start justify-center tablet:flex-row tablet:gap-2'>
          <SimpleInfo player={pinnedPlayer ?? selectedPlayer} />
          <SimpleInfo player={pinnedPlayer ? selectedPlayer : null} />
        </div>
        <LineUpInfo selectedTeams={selectedTeams} />
      </motion.div>
    </>
  );
}
