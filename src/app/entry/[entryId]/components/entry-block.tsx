'use client';

import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import { PITCHER_POSITION_ORDER } from '@/app/const';
import { isHitter } from '@/app/util/decideType';

function EntryBlockComponent({ position, isJustPosition = false }: { position: string; isJustPosition?: boolean }) {
  const [hitterLineup, pinnedPlayer] = usePlayerStore(useShallow((state) => [state.hitterLineup, state.pinnedPlayer]));
  const isActive = useMemo(() => {
    if (!pinnedPlayer) return false;

    if (!isHitter(pinnedPlayer)) {
      if (isJustPosition) return false;

      return pinnedPlayer.position === '선발'
        ? position !== '선발'
          ? true
          : false
        : position === '계투' || position === '마무리'
          ? false
          : true;
    }

    if (isJustPosition) {
      if (PITCHER_POSITION_ORDER.includes(position)) return false;

      const pinnedPosition = hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position;

      if (pinnedPosition === '지명타자') return false;
      if (pinnedPosition === position) return false;

      return true;
    }

    if (PITCHER_POSITION_ORDER.includes(position)) return true;

    return false;
  }, [pinnedPlayer]);

  return isActive && <div className='absolute z-[5] h-full w-full bg-black/70' />;
}

export default EntryBlockComponent;
