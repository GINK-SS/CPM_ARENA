import { HITTER_POSITION_ORDER } from '../const';

import { Hitter, Pitcher } from '../stores/player/types';
import { Team } from '../stores/team/types';
import { Record } from '../stores/buff/types';

export const isHitter = (player: Hitter | Pitcher): player is Hitter => {
  const hitterPositionList = new Set(HITTER_POSITION_ORDER);

  return hitterPositionList.has(player.position);
};

export const isTeamBuff = (buff: Team | Record): buff is Team => !!(buff as Team).id;
