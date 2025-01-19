import { Hitter, Pitcher } from '../stores/player/types';
import { Team } from '../stores/team/types';
import { Records } from '../stores/buff/types';

export const isHitter = (player: Hitter | Pitcher): player is Hitter => {
  return 'positions' in player;
};

export const isTeamBuff = (buff: Team | Records): buff is Team => !!(buff as Team).id;
