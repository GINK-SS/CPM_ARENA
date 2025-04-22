'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useBuffStore from '@/app/stores/buff';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/app/components/common/hover-card';
import TeamLogo from '@/app/components/common/team-logo';
import { HITTER_STAT, PITCHER_POSITION_ORDER, PITCHER_STAT } from '@/app/const';
import { isHitter } from '@/app/util/decideType';
import { Hitter, HitterPosition, Pitcher } from '@/app/stores/player/types';
import { Team } from '@/app/stores/team/types';

type EntryItemProps = {
  player: Hitter | Pitcher;
  selectedTeams: Team[];
  position: string;
};

const EntryItem = ({ player, selectedTeams, position }: EntryItemProps) => {
  const [hitterLineup, pitcherLineup, selectedPlayer, pinnedPlayer, addToLineup, deleteFromLineup, setSelectedPlayer] =
    usePlayerStore(
      useShallow((state) => [
        state.hitterLineup,
        state.pitcherLineup,
        state.selectedPlayer,
        state.pinnedPlayer,
        state.addToLineup,
        state.deleteFromLineup,
        state.setSelectedPlayer,
      ])
    );
  const [isShowHitterLineup, toggleIsShowHitterLineup] = useTableStore(
    useShallow((state) => [state.isShowHitterLineup, state.toggleIsShowHitterLineup])
  );
  const setBuff = useBuffStore((state) => state.setBuff);

  const isBlocked = useMemo(() => {
    if (!pinnedPlayer) return false;
    if (!isHitter(pinnedPlayer)) return false;

    // 여기서부터 pinnerPlayer는 타자
    if (PITCHER_POSITION_ORDER.includes(position)) return false;

    const pinnedPosition = hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position;

    if (pinnedPosition === '지명타자' || pinnedPosition === position) return false;
    if (isHitter(player) && player.positions.includes(pinnedPosition as HitterPosition)) return false;

    return true;
  }, [pinnedPlayer]);

  const onClick = () => {
    if (!player.name || isBlocked) return;

    setSelectedPlayer(player);

    if ((isHitter(player) && !isShowHitterLineup) || (!isHitter(player) && isShowHitterLineup)) {
      toggleIsShowHitterLineup();
    }

    if (pinnedPlayer) return;

    const teamIdx = selectedTeams.findIndex((selectedTeam) => selectedTeam.id === player.team);

    if (
      hitterLineup.some((hitter) => hitter.player === player) ||
      pitcherLineup.some((pitcher) => pitcher.player === player)
    ) {
      deleteFromLineup(player);
      setBuff({ player, teamIdx, action: 'DELETE' });

      return;
    }

    if (isHitter(player) && hitterLineup.filter(({ player }) => player).length >= 9) return;
    if (
      !isHitter(player) &&
      ((player.position === '선발' &&
        pitcherLineup.filter(({ position, player }) => position === '선발' && player).length >= 5) ||
        (player.position !== '선발' &&
          pitcherLineup.filter(({ position, player }) => position !== '선발' && player).length >= 5))
    )
      return;

    if (isHitter(player)) {
      let hitterPosition: HitterPosition | null = null;

      if (player.positions[0] === '외야수') {
        hitterPosition =
          hitterLineup.filter((hitter) => hitter.position === '외야수').length >= 3
            ? hitterLineup.some((hitter) => hitter.position === '지명타자')
              ? null
              : '지명타자'
            : '외야수';
      } else {
        hitterPosition = hitterLineup.some((hitter) => hitter.position === player.positions[0])
          ? hitterLineup.some((hitter) => hitter.position === '지명타자')
            ? null
            : '지명타자'
          : player.positions[0];
      }

      if (!hitterPosition) return;

      addToLineup(player, hitterPosition);
    } else {
      addToLineup(player);
    }

    setBuff({ player, teamIdx, action: 'ADD' });
  };

  return (
    <HoverCard openDelay={100} closeDelay={100} open={isBlocked ? false : undefined}>
      <HoverCardTrigger asChild>
        <button
          aria-label={player.name || 'empty player'}
          className={classNames(
            'relative flex flex-1 items-center justify-center overflow-hidden',
            'border-t-1 border-black bg-white text-black first:border-t-0'
          )}
          disabled={!player.name}
          onClick={onClick}
        >
          {isBlocked && <div className='absolute z-[5] h-full w-full cursor-default bg-black/70' />}

          <div
            data-role='orange-check'
            className={classNames('absolute z-[3] h-full w-full cursor-pointer', {
              hidden: !pinnedPlayer || (player !== pinnedPlayer && player !== selectedPlayer),
              'shadow-[inset_0_0_2px_4px_#ff5a00]': player === pinnedPlayer,
              'shadow-[inset_0_0_2px_2px_#ff5a00]': player !== pinnedPlayer,
            })}
          />

          <div
            data-role='lineup-check'
            className={classNames('absolute h-[80%] w-full -rotate-3 bg-black opacity-40', {
              hidden: isHitter(player)
                ? !hitterLineup.some((hitter) => hitter.player === player)
                : !pitcherLineup.some((pitcher) => pitcher.player === player),
            })}
          />

          <div
            data-role='name'
            className={classNames(
              'flex aspect-[3/1.1] flex-[3] items-center justify-center border-r-1 border-r-black indent-[0.5px] text-[2.3vw] font-semibold tracking-[0.5px]',
              'mobileL:aspect-[3/1] mobileL:text-14 tablet:indent-1 tablet:text-17 tablet:tracking-[1px] laptop:text-20',
              {
                'bg-[#f0c2bd]': player.all_star,
                'font-extrabold text-[#ca4142]': player.mvp_korea || player.mvp_league,
              }
            )}
          >
            {player.name}
          </div>

          <div
            data-role='overall'
            className={classNames(
              'flex aspect-auto h-full flex-[1] items-center justify-center text-[2.2vw] mobileL:aspect-square mobileL:h-auto mobileL:text-14 tablet:text-16 laptop:text-19',
              {
                'font-bold text-[#1b1588]': player.overall >= 80,
                'bg-[#f5df94]': player.golden_glove,
              }
            )}
          >
            {player.overall}
          </div>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className='w-full' sideOffset={3}>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between border-b border-black/30 pb-4'>
            <div>
              <div className='relative aspect-square w-30'>
                <TeamLogo teamId={player.team} />
              </div>

              <div
                className={classNames('flex gap-1', {
                  ['hidden']: !player.all_star && !player.golden_glove && !player.mvp_korea && !player.mvp_league,
                })}
              >
                <Image
                  src='/assets/all_star.png'
                  alt='all_star'
                  width={9}
                  height={9}
                  className={classNames({ ['invisible']: !player.all_star })}
                />
                <Image
                  src='/assets/golden_glove.png'
                  alt='golden_glove'
                  width={9}
                  height={9}
                  className={classNames({ ['invisible']: !player.golden_glove })}
                />
                <Image
                  src='/assets/mvp.png'
                  alt='mvp'
                  width={9}
                  height={9}
                  className={classNames({ ['invisible']: !player.mvp_korea && !player.mvp_league })}
                />
              </div>
            </div>

            <div className='flex flex-col items-end gap-3'>
              <div className='flex gap-3 font-semibold'>
                <span>'{player.year?.toString().slice(2) || ''}</span>
                <span>{player.name}</span>
              </div>

              {player && isHitter(player) ? (
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    {player.order_numbers.map((orderNumber) => (
                      <div
                        key={orderNumber}
                        className={classNames('flex aspect-square w-12 items-center justify-center rounded-sm p-1', {
                          ['bg-[#6fb0fa]']: orderNumber <= 2,
                          ['bg-[#ff4646]']: orderNumber <= 5 && orderNumber > 2,
                          ['bg-[#7bcc35]']: orderNumber >= 6,
                        })}
                      >
                        <span className='text-10 text-white'>{orderNumber}</span>
                      </div>
                    ))}
                  </div>

                  <span
                    className={classNames('text-12 font-medium', {
                      ['text-[#9cb9d6]']: player.order_type === '상위',
                      ['text-[#f57676]']: player.order_type === '클린업',
                      ['text-[#b3dc90]']: player.order_type === '하위',
                      ['text-[#9d75c7]']: player.order_type === '밸런스',
                    })}
                  >
                    {player.order_type !== '클린업' && player.order_type !== '밸런스'
                      ? `${player.order_type}타선`
                      : player.order_type}
                  </span>
                </div>
              ) : (
                <span className='text-12 font-medium text-[#aaa]'>{player.position}</span>
              )}
            </div>
          </div>

          <div className='flex justify-between gap-5'>
            {Object.entries(isHitter(player) ? HITTER_STAT : PITCHER_STAT).map((value, index) => {
              const [statName, statKey] = value;

              const statValue = isHitter(player)
                ? (player[statKey as keyof Hitter] as number)
                : (player[statKey as keyof Pitcher] as number);

              return (
                <div key={index} className='flex flex-col items-center justify-center gap-1'>
                  <span className='text-11'>{statName}</span>
                  <span
                    className={classNames('text-13', {
                      ['text-[#e643d8]']: statValue >= 110,
                      ['text-[#a652e3]']: statValue >= 100 && statValue < 110,
                      ['text-[#e35252]']: statValue >= 90 && statValue < 100,
                      ['text-[#ea9a5c]']: statValue >= 80 && statValue < 90,
                      ['text-[#edda47]']: statValue >= 70 && statValue < 80,
                      ['text-[#ccc]']: statValue < 70,
                    })}
                  >
                    {statValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EntryItem;
