import { Hitter, Pitcher, PositionLimit } from '@/app/stores/player/types';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import TablePlayer from '../tablePlayer';

const TablePosition = () => {
  const { selectedYear } = useYearStore();
  const { selectedTeams, allTeams, allHitters, allPitchers } = usePlayerStore();
  const positionLimit: PositionLimit = {
    포수: 2,
    '1루수': 2,
    '2루수': 2,
    '3루수': 2,
    유격수: 2,
    외야수: 5,
    선발: 5,
    계투: 5,
    마무리: 2,
  };
  const hitterPositionOrder = ['포수', '1루수', '2루수', '3루수', '유격수', '외야수'];
  const pitcherPositionOrder = ['선발', '계투', '마무리'];

  const hitArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = hitterPositionOrder.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = positionLimit[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  const pitchArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = pitcherPositionOrder.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = positionLimit[item.position];
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
    <div style={{ display: 'flex' }}>
      {selectedTeams.map((selectedTeam, idx) => (
        <div key={idx}>
          <h1>{allTeams.find((team) => team.id === selectedTeam)?.name}</h1>
          {hitArrangePlayers(
            allHitters.filter((hitter) => hitter.year === selectedYear && hitter.team === selectedTeam)
          ).map((group, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {group.players.map((player, iindex) => (
                <TablePlayer key={iindex} player={player} />
              ))}
            </div>
          ))}

          {pitchArrangePlayers(
            allPitchers.filter((pitcher) => pitcher.year === selectedYear && pitcher.team === selectedTeam)
          ).map((group, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {group.players.map((player, iindex) => (
                <TablePlayer key={iindex} player={player} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TablePosition;
