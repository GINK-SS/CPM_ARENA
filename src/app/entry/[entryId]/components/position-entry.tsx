import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import useTableStore from '@/app/stores/table';
import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import EntryItem from './entry-item';

import { PITCHER_POSITION_ORDER } from '@/app/const';

import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

type PositionEntryProps = {
  position: string;
  showLimit: number;
  filteredPlayers: (Hitter | Pitcher)[];
};

export default function PositionEntry({ position, showLimit, filteredPlayers }: PositionEntryProps) {
  const selectedTeams = useTeamStore((state) => state.selectedTeams);
  const overallLimit = useTableStore((state) => state.overallLimit);
  const [pinnedPlayer, hitterLineup] = usePlayerStore(useShallow((state) => [state.pinnedPlayer, state.hitterLineup]));

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

  const isBlockActive = (position: string) => {
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

    if (hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position !== '지명타자') {
      return position !== hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position;
    }

    return false;
  };

  return (
    <div data-role='container' className='relative flex w-full gap-2 tablet:gap-3'>
      <div
        className={classNames('absolute z-[5] h-full w-full bg-black/70', {
          hidden: !isBlockActive(position),
        })}
      />

      <div
        data-role='position-box'
        className='mobileL:w-70 mobileL:text-15 relative flex w-[10vw] items-center justify-center border-black bg-white text-[2.4vw] font-semibold text-black tablet:w-90 tablet:text-18 laptop:w-100 laptop:text-20'
      >
        <span>{position}</span>
      </div>
      {selectedTeams.map((selectedTeam) => (
        <div data-role='team-players-box' key={selectedTeam.id} className='flex flex-1 flex-col'>
          {arrangePlayers(selectedTeam).map((player, idx) => (
            <EntryItem key={idx} player={player} position={position} />
          ))}
        </div>
      ))}
    </div>
  );
}
