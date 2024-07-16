'use client';

import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import SimpleInfo from './simple-info';

export default function SimpleWrapper() {
  const [pinnedPlayer, selectedPlayer] = usePlayerStore(
    useShallow((state) => [state.pinnedPlayer, state.selectedPlayer])
  );

  return (
    <div className='flex w-full flex-col items-start justify-center tablet:flex-row tablet:gap-2'>
      <SimpleInfo player={pinnedPlayer ?? selectedPlayer} />
      <SimpleInfo player={pinnedPlayer ? selectedPlayer : null} />
    </div>
  );
}
