'use client';

import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import InfoBox from './info-box';
import BuffItem from './buff-item';
import TeamPower from './team-power';

import { Team } from '@/app/stores/team/types';
import { Records } from '@/app/stores/buff/types';

const LineUpInfo = ({ selectedTeams }: { selectedTeams: Team[] }) => {
  const [hitterLineup, pitcherLineup, clearLineup, setPinnedPlayer, setSelectedPlayer] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.pitcherLineup,
      state.clearLineup,
      state.setPinnedPlayer,
      state.setSelectedPlayer,
    ])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const buffOrder: (Team | Records)[] = useMemo(
    () => [...selectedTeams, 'all_star', 'golden_glove', 'mvp'],
    [selectedTeams]
  );

  const onReset = () => {
    clearLineup();
    clearBuff();
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  return (
    <InfoBox
      title='시너지 및 전력'
      headerRight={
        <div className='flex gap-5 pr-5 mobileL:gap-10 mobileL:pr-10'>
          <div className='flex gap-5 text-10 after:content-["|"] mobileL:gap-10 mobileL:text-12'>
            <span>타자</span>
            <span>{`${hitterLineup.filter((hitter) => hitter.player).length} / 9`}</span>
          </div>
          <div className='flex gap-5 text-10 mobileL:gap-10 mobileL:text-12'>
            <span>투수</span>
            <span>{`${pitcherLineup.filter((pitcher) => pitcher.player).length} / 10`}</span>
          </div>
        </div>
      }
    >
      <div className='flex flex-col gap-10 mobileL:gap-20'>
        <div className='flex w-full items-center justify-around'>
          {buffOrder.map((buff, index) => (
            <BuffItem buff={buff} key={index} selectedTeams={selectedTeams} />
          ))}
        </div>

        <div className='flex justify-between'>
          <button
            className='border-1 border-slate-400 px-10 py-6 text-12 mobileL:px-10 mobileL:py-4 mobileL:text-14'
            onClick={onReset}
          >
            선택 초기화
          </button>
          <TeamPower selectedTeams={selectedTeams} />
        </div>
      </div>
    </InfoBox>
  );
};

export default LineUpInfo;
