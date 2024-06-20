import { Hitter, Pitcher } from '../stores/player/types';
import { Team } from '../stores/team/types';
import { Record } from '../stores/buff/types';

export const isHitter = (player: Hitter | Pitcher): player is Hitter => {
  const hitterPositionList = new Set(['포수', '1루수', '2루수', '3루수', '유격수', '외야수']);

  return hitterPositionList.has(player.position);
};

export const isTeamBuff = (buff: Team | Record): buff is Team => !!(buff as Team).id;
