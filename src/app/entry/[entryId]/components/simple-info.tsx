import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoSearchOutline } from 'react-icons/io5';

import TeamLogo from '@/app/components/common/team-logo';
import usePlayerStore from '@/app/stores/player';
import useCommonStore from '@/app/stores/common';
import InfoBox from './info-box';
import SimpleStat from './simple-stat';
import { getCalculatedBuff } from '@/app/util/calculateBuff';

import { Hitter, Pitcher } from '@/app/stores/player/types';
import useBuffStore from '@/app/stores/buff';
import { Team } from '@/app/stores/team/types';
import { isHitter } from '@/app/util/decideType';

type SimpleInfoProps = {
  player: Hitter | Pitcher | null;
  selectedTeams: Team[];
};

const SimpleInfo = ({ player, selectedTeams }: SimpleInfoProps) => {
  const [showDetail, pinnedPlayer, hitterLineup, pitcherLineup] = usePlayerStore(
    useShallow((state) => [state.showDetail, state.pinnedPlayer, state.hitterLineup, state.pitcherLineup])
  );
  const currentBuff = useBuffStore((state) => state.currentBuff);
  const isBuffActive = useCommonStore((state) => state.isBuffActive);
  const extraPoints =
    isBuffActive &&
    player &&
    ((isHitter(player) && hitterLineup.some((hitter) => hitter.player === player)) ||
      (!isHitter(player) && pitcherLineup.some((pitcher) => pitcher.player === player)))
      ? getCalculatedBuff({
          player,
          selectedTeams,
          order: isHitter(player) ? hitterLineup.findIndex((lineup) => lineup.player === player) + 1 : 0,
          position: isHitter(player)
            ? hitterLineup.find((hitter) => hitter.player === player)!.position
            : pitcherLineup.find((pitcher) => pitcher.player === player)!.position,
          currentBuff,
        })
      : 0;

  const onDetailClick = () => {
    showDetail(player === pinnedPlayer ? 'pinned' : 'selected');
  };

  return (
    <InfoBox
      title='선수 정보'
      headerRight={
        <div className='mr-5 flex items-center justify-center gap-5'>
          <div
            className={classNames(
              'w-20 items-center justify-center border-1 border-[#fe6b35] py-1 font-extrabold text-[#fe6b35]',
              {
                flex: player?.all_star,
                hidden: !player?.all_star,
              }
            )}
          >
            A
          </div>
          <div
            className={classNames(
              'w-20 items-center justify-center border-1 border-[#f5d300] py-1 font-extrabold text-[#f5d300]',
              {
                flex: player?.golden_glove,
                hidden: !player?.golden_glove,
              }
            )}
          >
            G
          </div>
          <div
            className={classNames(
              'w-20 items-center justify-center border-1 border-[#a0edff] py-1 font-extrabold text-[#a0edff]',
              {
                flex: player?.mvp_korea || player?.mvp_league,
                hidden: !player?.mvp_korea && !player?.mvp_league,
              }
            )}
          >
            M
          </div>
        </div>
      }
    >
      <div className='flex h-40 flex-1 items-center justify-around tablet:justify-between'>
        {player && (
          <>
            <div className='flex items-center gap-3 tablet:gap-5'>
              <div className='relative aspect-square w-25 drop-shadow-[2px_2px_0_#333]'>
                <TeamLogo teamId={player.team} />
              </div>
              <span
                className={classNames('font-semibold', {
                  'text-15': player.name.length >= 4,
                  'text-17': player.name.length < 4,
                })}
              >{`'${player.year.toString().slice(2)} ${player.name}`}</span>
            </div>

            <span className='scale-y-125 text-18 font-semibold'>{player.overall + extraPoints}</span>

            <div className='flex items-center gap-8 mobileL:gap-20 tablet:gap-7 laptop:gap-10'>
              <SimpleStat player={player} extraPoints={extraPoints} />

              <button
                className='flex aspect-square w-30 items-center justify-center rounded-md border-1 border-slate-400 text-16 font-semibold'
                onClick={onDetailClick}
              >
                <IoSearchOutline />
              </button>
            </div>
          </>
        )}
      </div>
    </InfoBox>
  );
};

export default SimpleInfo;
