import Image from 'next/image';

import useYearStore from '@/app/stores/year';
import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import EntryItem from '../entryItem';

import { HITTER_POSITION_ORDER, PITCHER_POSITION_ORDER, POSITION_LIMIT } from '@/app/const';

import { Team } from '@/app/stores/team/types';
import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type TeamEntryProps = {
  selectedTeam: Team;
};

const TeamEntry = ({ selectedTeam }: TeamEntryProps) => {
  const { selectedYear } = useYearStore();
  const { overallLimit } = useTableStore();
  const { allHitters, allPitchers } = usePlayerStore();

  const arrangePlayers = () => {
    const players = [
      ...(allHitters.get(selectedYear as number) as Hitter[]),
      ...(allPitchers.get(selectedYear as number) as Pitcher[]),
    ].filter(
      (player) =>
        player.team === selectedTeam.id &&
        (player.overall >= overallLimit ||
          player.all_star ||
          player.golden_glove ||
          player.mvp_korea ||
          player.mvp_league)
    );
    const arranged = HITTER_POSITION_ORDER.concat(PITCHER_POSITION_ORDER).map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = POSITION_LIMIT[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  return (
    <S.Wrapper>
      <S.Title>
        <S.Logo>
          <Image
            src={selectedTeam.logo}
            alt={selectedTeam.id}
            fill
            sizes='60px'
            style={{ filter: 'drop-shadow(3px 3px 0 #333)' }}
          />
        </S.Logo>

        <S.Name>{selectedTeam.name}</S.Name>
      </S.Title>

      {arrangePlayers().map((group, index) => (
        <S.PositionGroup key={index}>
          {group.players.map((player, iindex) => (
            <EntryItem key={iindex} player={player} />
          ))}
        </S.PositionGroup>
      ))}
    </S.Wrapper>
  );
};

export default TeamEntry;
