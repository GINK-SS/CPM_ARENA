import EntryBlock from './entry-block';
import EntryItem from './entry-item';
import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';

type PositionEntryProps = {
  selectedTeams: Team[];
  position: string;
  showLimit: number;
  filteredPlayers: (Hitter | Pitcher)[];
  overallLimit: number;
};

export default function PositionEntry({
  selectedTeams,
  position,
  showLimit,
  filteredPlayers,
  overallLimit,
}: PositionEntryProps) {
  const arrangePlayers = (selectedTeam: Team): (Hitter | Pitcher)[] => {
    const players = filteredPlayers.filter(
      (player) =>
        player.team === selectedTeam.id &&
        (player.overall >= overallLimit ||
          player.all_star ||
          player.golden_glove ||
          player.mvp_korea ||
          player.mvp_league)
    );
    const shortage = showLimit - players.length;

    return shortage > 0 ? [...players, ...Array(shortage).fill({ name: '' })] : players.slice(0, showLimit);
  };

  return (
    <div data-role='container' className='relative flex w-full gap-2 tablet:gap-3'>
      <EntryBlock position={position} />

      <div
        data-role='position-box'
        className='relative flex w-[10vw] items-center justify-center border-black bg-white text-[2.4vw] font-semibold text-black mobileL:w-70 mobileL:text-15 tablet:w-90 tablet:text-18 laptop:w-100 laptop:text-20'
      >
        <span>{position}</span>
      </div>
      {selectedTeams.map((selectedTeam) => (
        <div data-role='team-players-box' key={selectedTeam.id} className='flex flex-1 flex-col'>
          {arrangePlayers(selectedTeam).map((player, idx) => (
            <EntryItem key={idx} player={player} selectedTeams={selectedTeams} />
          ))}
        </div>
      ))}
    </div>
  );
}
