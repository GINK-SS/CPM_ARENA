import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST } from '@/app/const';

import { isTeamBuff } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import { Hitter } from '@/app/stores/player/types';
import { Records } from '@/app/stores/buff/types';

const TeamPower = ({ selectedTeams }: { selectedTeams: Team[] }) => {
  const [hitterLineup, pitcherLineup] = usePlayerStore(
    useShallow((state) => [state.hitterLineup, state.pitcherLineup])
  );
  const currentBuff = useBuffStore((state) => state.currentBuff);
  const buffOrder: (Team | Records)[] = [...selectedTeams, 'all_star', 'golden_glove', 'mvp'];

  const getOrderBuff = (player: Hitter | null, order: number) => {
    if (!player) return 0;

    let value = 0;

    if (player.order_numbers.includes(order)) value += 1;

    if (player.order_type === '밸런스') value += 1;
    else if (player.order_type === '상위' && order <= 2) value += 2;
    else if (player.order_type === '클린업' && order <= 5 && order >= 3) value += 2;
    else if (player.order_type === '하위' && order >= 6) value += 2;

    return value;
  };

  const totalValue =
    buffOrder.reduce(
      (acc, curr) =>
        acc +
        (isTeamBuff(curr)
          ? BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)]) ===
            -1
            ? 0
            : BUFF_LIST.team.gradeValues[
                BUFF_LIST.team.grades.findLastIndex((grade) => grade <= currentBuff.teams[selectedTeams.indexOf(curr)])
              ]
          : BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr]) === -1
            ? 0
            : BUFF_LIST[curr]?.gradeValues[
                BUFF_LIST[curr]?.grades.findLastIndex((grade) => grade <= currentBuff[curr])
              ]) *
          (isTeamBuff(curr) ? currentBuff.teams[selectedTeams.indexOf(curr)] : currentBuff[curr]),
      0
    ) +
    hitterLineup.reduce(
      (acc, curr, index) => acc + (curr.player?.overall ?? 0) + getOrderBuff(curr.player, index + 1),
      0
    ) +
    pitcherLineup.reduce(
      (acc, curr) =>
        acc +
        (curr.player?.overall ?? 0) -
        (!!curr.player && curr.position !== '선발' && curr.position !== curr.player.position ? 3 : 0),
      0
    );

  return (
    <div className='flex items-center gap-10 text-17 font-semibold mobileL:text-24'>
      <span>총 전력</span>
      <span className='w-40 text-center mobileL:w-56'>{totalValue}</span>
    </div>
  );
};

export default TeamPower;
