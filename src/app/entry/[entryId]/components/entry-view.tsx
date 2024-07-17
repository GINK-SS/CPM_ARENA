import TeamLogo from '@/app/components/common/team-logo';
import PositionEntry from './position-entry';

import { POSITION_LIMIT } from '@/app/const';

import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';

type EntryViewProps = {
  selectedTeams: Team[];
  playersOfSelectedTeams: (Hitter | Pitcher)[];
  overallLimit: number;
};

export default function EntryView({ selectedTeams, playersOfSelectedTeams, overallLimit }: EntryViewProps) {
  return (
    <div data-role='entry-container' className='w-full'>
      <div data-role='teams-container' className='mb-5 flex justify-between tablet:mb-8 laptop:mb-10'>
        <div data-role='empty-position-space' className='w-[10vw] mobileL:w-70 tablet:w-90 laptop:w-100' />

        {selectedTeams.map((selectedTeam) => (
          <div
            data-role='team-wrapper'
            key={selectedTeam.id}
            className='flex flex-1 flex-col items-center justify-center gap-1 mobileL:gap-2 laptop:gap-3'
          >
            <div
              data-role='logo'
              className='relative aspect-square w-[7vw] drop-shadow-[1px_1px_0_#333] mobileL:w-45 mobileL:drop-shadow-[3px_3px_0_#333] tablet:w-55 laptop:w-60'
            >
              <TeamLogo teamId={selectedTeam.id} />
            </div>

            <h2
              data-role='team-name'
              className='text-[2vw] font-semibold mobileL:text-12 tablet:text-14 laptop:text-16'
            >
              {selectedTeam.name}
            </h2>
          </div>
        ))}
      </div>

      <div data-role='table' className='flex w-full flex-col items-center gap-2 tablet:gap-3'>
        {Object.entries(POSITION_LIMIT).map((limit) => {
          const [position, value] = limit;
          const filteredPlayers = playersOfSelectedTeams.filter((player) => player.position === position);

          return (
            <PositionEntry
              key={position}
              selectedTeams={selectedTeams}
              position={position}
              showLimit={value}
              filteredPlayers={filteredPlayers}
              overallLimit={overallLimit}
            />
          );
        })}
      </div>
    </div>
  );
}
