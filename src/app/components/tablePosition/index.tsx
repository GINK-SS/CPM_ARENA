import { Hitter, Pitcher, PositionLimit } from '@/app/stores/player/types';
import TablePlayer from '../\btablePlayer';

type TablePositionProps = {
  players: (Hitter | Pitcher)[];
  isHitter: boolean;
};

const TablePosition = ({ players, isHitter }: TablePositionProps) => {
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

  const hitArrangedPlayers = hitArrangePlayers(players);
  const pitchArrangedPlayers = pitchArrangePlayers(players);

  return (
    <>
      {isHitter
        ? hitArrangedPlayers.map((group, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {group.players.map((player, index) => (
                <TablePlayer key={index} player={player} />
              ))}
            </div>
          ))
        : pitchArrangedPlayers.map((group, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {group.players.map((player, index) => (
                <TablePlayer key={index} player={player} />
              ))}
            </div>
          ))}
    </>
  );
};

export default TablePosition;
