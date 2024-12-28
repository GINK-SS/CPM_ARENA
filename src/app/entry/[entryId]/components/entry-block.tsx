'use client';

import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import { PITCHER_POSITION_ORDER } from '@/app/const';
import { isHitter } from '@/app/util/decideType';

function EntryBlockComponent({ position }: { position: string }) {
  const [pinnedPlayer] = usePlayerStore(useShallow((state) => [state.pinnedPlayer]));
  const isActive = useMemo(() => {
    if (!pinnedPlayer) return false;

    if (!isHitter(pinnedPlayer)) {
      return pinnedPlayer.position === '선발'
        ? position !== '선발'
          ? true
          : false
        : position === '계투' || position === '마무리'
          ? false
          : true;
    }

    if (PITCHER_POSITION_ORDER.includes(position)) return true;

    return false;
  }, [pinnedPlayer]);

  return isActive && <div className='absolute z-[5] h-full w-full bg-black/70' />;
}

export default EntryBlockComponent;
