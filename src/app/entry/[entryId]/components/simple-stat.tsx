import classNames from 'classnames';

import { HITTER_STAT, PITCHER_STAT } from '@/app/const';

import { Hitter, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

type SimpleStatProps = {
  player: Hitter | Pitcher | null;
};

const SimpleStat = ({ player }: SimpleStatProps) => {
  return (
    player && (
      <div className='flex gap-5 mobileL:gap-20 tablet:gap-5 laptop:gap-10'>
        {Object.entries(isHitter(player) ? HITTER_STAT : PITCHER_STAT).map((value, index) => {
          const [statName, statKey] = value;

          const statValue = isHitter(player)
            ? (player[statKey as keyof Hitter] as number)
            : (player[statKey as keyof Pitcher] as number);

          return (
            <div key={index} className='flex flex-col items-center justify-center gap-3 laptop:gap-5'>
              <span className='text-11 mobileL:text-14 laptop:text-16'>{statName}</span>
              <span
                className={classNames('text-13 mobileL:text-15 laptop:text-16', {
                  'text-[#e643d8]': statValue >= 110,
                  'text-[#a652e3]': statValue >= 100 && statValue < 110,
                  'text-[#e35252]': statValue >= 90 && statValue < 100,
                  'text-[#fca96a]': statValue >= 80 && statValue < 90,
                  'text-[#fceb6a]': statValue >= 70 && statValue < 80,
                  'text-white': statValue < 70,
                })}
              >
                {statValue}
              </span>
            </div>
          );
        })}
      </div>
    )
  );
};

export default SimpleStat;
