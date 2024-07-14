import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST, TEAMID_TO_SHORTEN } from '@/app/const';

import { isHitter } from '@/app/util/decideType';
import { Hitter, HitterPosition, Pitcher, PitcherPosition } from '@/app/stores/player/types';
import { Records } from '@/app/stores/buff/types';

type PlayerCardProps = {
  card: {
    position: HitterPosition | PitcherPosition | null;
    player: Hitter | Pitcher | null;
  };
  order: number;
};

const PlayerCard = ({ card: { position, player }, order }: PlayerCardProps) => {
  const [allTeams, selectedTeams] = useTeamStore(useShallow((state) => [state.allTeams, state.selectedTeams]));
  const [selectedPlayer, pinnedPlayer, setSelectedPlayer, setPinnedPlayer] = usePlayerStore(
    useShallow((state) => [state.selectedPlayer, state.pinnedPlayer, state.setSelectedPlayer, state.setPinnedPlayer])
  );
  const currentBuff = useBuffStore((state) => state.currentBuff);
  const [pitcherHand, hitterHand] = [player?.hand_type[0], player?.hand_type[2]];
  const imageUrl = !player
    ? ''
    : isHitter(player)
      ? `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_hitter_${hitterHand === '좌' ? 'left' : 'right'}.png`
      : `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_pitcher_${pitcherHand === '좌' ? 'left' : 'right'}.png`;

  const getCalculatedOverall = (player: Hitter | Pitcher) => {
    let calculatedOverall = player.overall;
    const records: Records[] = ['all_star', 'golden_glove', 'mvp'];
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

  const onClick = () => {
    if (!player) return;

    if (pinnedPlayer === player) {
      return;
    }

    if (selectedPlayer === player) {
      if (pinnedPlayer) return;

      setPinnedPlayer(player);
      setSelectedPlayer(null);

      return;
    }

    setSelectedPlayer(player);
  };

  return (
    <div className='relative flex flex-1 justify-center'>
      <div
        className={classNames('absolute z-[5] h-full w-full bg-black/60', {
          hidden:
            !pinnedPlayer ||
            isHitter(pinnedPlayer) ||
            (position === '선발' && pinnedPlayer.position === '선발') ||
            (position !== '선발' && pinnedPlayer.position !== '선발'),
        })}
      />

      <div
        className={classNames('relative bg-[url("/assets/card_background.png")] bg-cover', {
          'cursor-pointer': player,
        })}
        onClick={onClick}
      >
        <div
          className={classNames(
            'absolute z-[1] h-full w-full shadow-[inset_0_0_8px_1px_#ff5a00,_inset_0_-10px_10px_0_rgba(255,_187,_153,_0.4)]',
            {
              hidden: (!pinnedPlayer || pinnedPlayer !== player) && (!selectedPlayer || selectedPlayer !== player),
              'border-2 border-[#ff5a00] shadow-[inset_0_0_20px_1px_#ff5a00,_inset_0_-10px_10px_0_rgba(255,_187,_153,_0.5)] outline-1 outline-[#ff5a00]':
                pinnedPlayer && pinnedPlayer === player,
            }
          )}
        />

        <div
          className={
            'flex aspect-square w-[9.5vw] justify-between border-1 border-[#666] border-b-[#853326] bg-cover mobileL:w-73'
          }
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {player && (
            <>
              <div className='flex flex-col items-start gap-1 font-semibold mobileL:gap-2'>
                <span className='scale-y-125 text-[2.2vw] drop-shadow-[0_1px_5px_#000] mobileL:text-16'>
                  {getCalculatedOverall(player)}
                </span>
                {player.all_star && (
                  <Image
                    src={'/assets/all_star.png'}
                    alt='all_star'
                    width={18}
                    height={18}
                    className='aspect-square h-auto w-[2.5vw] mobileL:w-18'
                  />
                )}
              </div>

              <div className='flex flex-col items-end gap-2 font-semibold'>
                <div className='text-[2.2vw] drop-shadow-[0_1px_2px_#000] mobileL:text-16'>
                  {isHitter(player) ? position![0] : player.position[0]}
                </div>
                {player.golden_glove && (
                  <Image
                    src={'/assets/golden_glove.png'}
                    alt='golden_glove'
                    width={14}
                    height={14}
                    className='aspect-square h-auto w-[2vw] mobileL:w-14'
                  />
                )}
                {(player.mvp_korea || player.mvp_league) && (
                  <Image
                    src={'/assets/mvp.png'}
                    alt='mvp'
                    width={14}
                    height={14}
                    className='aspect-square h-auto w-[2vw] mobileL:w-14'
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div className='relative flex h-[1.7vw] justify-end border-b-1 border-b-black bg-gradient-to-r from-[#853326] from-30% to-[#150401] to-80% pl-2 pr-1 pt-1 font-semibold mobileL:h-7 mobileL:border-b-2 mobileL:pr-4'>
          {player && (
            <Image
              src={allTeams.find((team) => team.id === player.team)!.logo}
              alt='logo'
              width={30}
              height={30}
              sizes='30px'
              className='absolute bottom-[-0.5vw] left-[0.3vw] aspect-square h-auto w-[4vw] drop-shadow-[0_1px_1px_#222,_1px_0_1px_#222] mobileL:bottom-[-3px] mobileL:left-2 mobileL:w-30'
            />
          )}
          <span className='text-[0.8vw] text-[#948585] mobileL:text-7'>ARENA</span>
        </div>

        <div className='flex h-[2.2vw] items-center justify-between bg-gradient-to-r from-[#1c1c1a] to-black px-1 py-2 font-semibold mobileL:h-13'>
          {player && (
            <>
              <span className='text-[1.5vw] text-[#999] mobileL:text-13'>{`'${player.year.toString().slice(2)}`}</span>
              <span
                className={classNames({
                  'text-[1.3vw] mobileL:text-11': player.name.length >= 5,
                  'text-[1.5vw] mobileL:text-13': player.name.length < 5,
                })}
              >
                {player.name}
              </span>
            </>
          )}
        </div>

        <div className='flex h-[2.2vw] items-center justify-between bg-black p-1 font-semibold mobileL:h-15'>
          {player && isHitter(player) && (
            <>
              <div className='flex items-center gap-2'>
                {player.order_numbers.map((orderNumber) => (
                  <div
                    key={orderNumber}
                    className={classNames(
                      'flex aspect-square w-[1.5vw] items-center justify-center rounded-[0.3vw] p-[0.1vw] mobileL:w-11 mobileL:rounded-sm mobileL:p-1',
                      {
                        'bg-[#6fb0fa]': orderNumber <= 2,
                        'bg-[#ff4646]': orderNumber <= 5 && orderNumber > 2,
                        'bg-[#7bcc35]': orderNumber >= 6,
                      }
                    )}
                  >
                    <span className='text-[1.3vw] drop-shadow-[0px_0px_1px_#000] mobileL:text-10'>{orderNumber}</span>
                  </div>
                ))}
              </div>

              <span
                className={classNames('text-[1.4vw] mobileL:text-11', {
                  'text-[#9cb9d6]': player.order_type === '상위',
                  'text-[#f57676]': player.order_type === '클린업',
                  'text-[#b3dc90]': player.order_type === '하위',
                  'text-[#9d75c7]': player.order_type === '밸런스',
                })}
              >
                {player.order_type !== '클린업' && player.order_type !== '밸런스'
                  ? `${player.order_type}타선`
                  : player.order_type}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
