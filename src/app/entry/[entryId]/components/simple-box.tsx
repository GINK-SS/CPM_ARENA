'use client';

import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import SimpleInfo from './simple-info';
import { Team } from '@/app/stores/team/types';

export default function SimpleBox({ selectedTeams }: { selectedTeams: Team[] }) {
  const [pinnedPlayer, selectedPlayer] = usePlayerStore(
    useShallow((state) => [state.pinnedPlayer, state.selectedPlayer])
  );

  return (
    <div className='flex w-full flex-col items-start justify-center tablet:flex-row tablet:gap-2'>
      <SimpleInfo player={pinnedPlayer ?? selectedPlayer} selectedTeams={selectedTeams} />
      <SimpleInfo player={pinnedPlayer ? selectedPlayer : null} selectedTeams={selectedTeams} />
    </div>
  );
}
