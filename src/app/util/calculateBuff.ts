import { BUFF_LIST } from '../const';

import { isHitter } from './decideType';
import { Records } from '../stores/buff/types';
import { Hitter, HitterPosition, Pitcher, PitcherPosition } from '../stores/player/types';
import { Team } from '../stores/team/types';

type GetCalculatedOverallProps = {
  player: Hitter | Pitcher;
  selectedTeams: Team[];
  order: number;
  position: HitterPosition | PitcherPosition | null;
  currentBuff: {
    teams: number[];
    all_star: number;
    golden_glove: number;
    mvp: number;
  };
};

const records: Records[] = ['all_star', 'golden_glove', 'mvp'];

export const getCalculatedBuff = ({
  player,
  selectedTeams,
  order,
  position,
  currentBuff,
}: GetCalculatedOverallProps) => {
  let calculatedOverall = 0;
  const teamBuffGradesIdx = BUFF_LIST.team.grades.findLastIndex(
    (grade) => grade <= currentBuff.teams[selectedTeams.findIndex((selectedTeam) => selectedTeam.id === player.team)]
  );

  calculatedOverall += teamBuffGradesIdx === -1 ? 0 : BUFF_LIST.team.gradeValues[teamBuffGradesIdx];
  calculatedOverall += records.reduce((acc, curr) => {
    if (
      (curr === 'all_star' && !player.all_star) ||
      (curr === 'golden_glove' && !player.golden_glove) ||
      (curr === 'mvp' && !(player.mvp_korea || player.mvp_league))
    ) {
      return acc;
    }

    return (
      acc +
      (BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr]) === -1
        ? 0
        : BUFF_LIST[curr].gradeValues[BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr])])
    );
  }, 0);

  if (isHitter(player)) {
    if (player.order_type === '밸런스') calculatedOverall += 1;
    else if (player.order_type === '상위' && order <= 2) calculatedOverall += 2;
    else if (player.order_type === '클린업' && order <= 5 && order >= 3) calculatedOverall += 2;
    else if (player.order_type === '하위' && order >= 6) calculatedOverall += 2;

    if (player.order_numbers.includes(order)) calculatedOverall += 1;
  }

  if (!isHitter(player) && player.position !== position) {
    calculatedOverall -= 3;
  }

  return calculatedOverall;
};
