import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoSearchOutline } from 'react-icons/io5';

import TeamLogo from '@/app/components/common/team-logo';
import usePlayerStore from '@/app/stores/player';
import InfoBox from './info-box';
import SimpleStat from './simple-stat';

import { Hitter, Pitcher } from '@/app/stores/player/types';

type SimpleInfoProps = {
  player: Hitter | Pitcher | null;
};

const SimpleInfo = ({ player }: SimpleInfoProps) => {
  const [showDetail, pinnedPlayer] = usePlayerStore(useShallow((state) => [state.showDetail, state.pinnedPlayer]));

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

            <span className='scale-y-125 text-18 font-semibold'>{player.overall}</span>

            <div className='flex items-center gap-8 mobileL:gap-20 tablet:gap-7 laptop:gap-10'>
              <SimpleStat player={player} />

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
