'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import cpmLogo from '@/public/assets/logo/cpmRealLogo.webp';

import TeamLogo from '@/app/components/common/team-logo';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { HITTER_STAT, HITTER_STAT_DETAIL, PITCHER_STAT, PITCHER_STAT_DETAIL } from '@/app/const';

import { getCalculatedBuff } from '@/app/util/calculateBuff';
import { isHitter } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';
import useCommonStore from '@/app/stores/common';

const PlayerDetail = ({ selectedTeams }: { selectedTeams: Team[] }) => {
  const [selectedPlayer, isShowDetail, pinnedPlayer, hitterLineup, pitcherLineup, clearDetail] = usePlayerStore(
    useShallow((state) => [
      state.selectedPlayer,
      state.isShowDetail,
      state.pinnedPlayer,
      state.hitterLineup,
      state.pitcherLineup,
      state.clearDetail,
    ])
  );
  const currentBuff = useBuffStore((state) => state.currentBuff);
  const isBuffActive = useCommonStore((state) => state.isBuffActive);
  const [scale, setScale] = useState(1);
  const player =
    isShowDetail.target === 'pinned' ? pinnedPlayer : isShowDetail.target === 'selected' ? selectedPlayer : null;

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

  useEffect(() => {
    function handleResize() {
      setScale(window.innerWidth <= 470 ? 0.7 : window.innerWidth <= 560 ? 0.8 : window.innerWidth <= 660 ? 0.9 : 1);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isShowDetail.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isShowDetail.isShow]);

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      clearDetail();
    }
  };

  return (
    isShowDetail.isShow &&
    player && (
      <motion.div
        className='fixed inset-0 z-40 bg-black/10 backdrop-blur-sm'
        onClick={onOuterClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className='absolute left-[50%] top-[50%] w-[370px] border-2 border-[#aaa] bg-gradient-to-tr from-[#9e270e] to-[#82220e] leading-[1] shadow-[0_19px_38px_#00000030,_0_15px_12px_#00000022,_3px_3px_3px_#00000050,_-3px_3px_3px_#00000050]'
          style={{ scale, translate: '-50% -50%' }}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className='flex items-center justify-between px-20 py-12'>
            <span className='scale-x-125 scale-y-150 text-30 font-extrabold drop-shadow-[0_0_2px_#222]'>
              {player.overall + extraPoints}
            </span>

            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-3'>
                <span className='text-14 font-light'>
                  {selectedTeams.find((team) => team.id === player.team)?.name || ''}
                </span>
                <div className='relative h-20 w-20'>
                  <TeamLogo teamId={player.team} />
                </div>
              </div>

              <h2 className='text-30 font-semibold'>{`'${player.year.toString().slice(2)} ${player.name}`}</h2>
            </div>
          </div>

          <div className='flex bg-gradient-to-br from-[#2b1c1e] to-[#332325] p-10'>
            {isHitter(player) ? (
              <>
                <div className='flex flex-1 flex-col gap-13 p-15 pr-65 text-20'>
                  {Object.entries(HITTER_STAT).map((value, index) => (
                    <div className='flex items-center justify-between' key={index}>
                      <span>{value[0]}</span>
                      <span
                        className={classNames({
                          'text-[#e643d8]': (player[value[1]] as number) + extraPoints >= 110,
                          'text-[#a652e3]':
                            (player[value[1]] as number) + extraPoints >= 100 &&
                            (player[value[1]] as number) + extraPoints < 110,
                          'text-[#e35252]':
                            (player[value[1]] as number) + extraPoints >= 90 &&
                            (player[value[1]] as number) + extraPoints < 100,
                          'text-[#fca96a]':
                            (player[value[1]] as number) + extraPoints >= 80 &&
                            (player[value[1]] as number) + extraPoints < 90,
                          'text-[#fceb6a]':
                            (player[value[1]] as number) + extraPoints >= 70 &&
                            (player[value[1]] as number) + extraPoints < 80,
                          'text-white': (player[value[1]] as number) + extraPoints < 70,
                        })}
                      >
                        {(player[value[1]] as number) + extraPoints}
                        <span className='absolute inline-block pl-3 text-white'>
                          {extraPoints === 0 ? '' : `(+${extraPoints})`}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className='flex w-150 flex-col justify-between border-2 border-[#82220e] bg-gradient-to-br from-[#662315] to-[#6b2d20] px-13 py-10'>
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-semibold'>{player.position}</span>
                    <span>{`(${player.hand_type})`}</span>
                  </div>

                  <div className='relative h-43 w-122'>
                    <Image src={cpmLogo} alt='logo' fill sizes='120px' />
                  </div>

                  <div className='flex items-center justify-between border-1 border-[#00000010] bg-[#52160a] font-semibold'>
                    <div className='flex items-center gap-3'>
                      {player.order_numbers.map((orderNumber) => (
                        <div
                          className={classNames('flex h-16 w-16 items-center justify-center rounded p-1 text-14', {
                            'bg-[#6fb0fa]': orderNumber <= 2,
                            'bg-[#ff4646]': orderNumber > 2 && orderNumber <= 5,
                            'bg-[#7bcc35]': orderNumber > 5,
                          })}
                          key={orderNumber}
                        >
                          {orderNumber}
                        </div>
                      ))}
                    </div>

                    <span
                      className={classNames('text-17', {
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
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-1 flex-col gap-13 p-15 pr-65 text-20'>
                  {Object.entries(PITCHER_STAT).map((value, index) => (
                    <div className='flex items-center justify-between' key={index}>
                      <span>{value[0]}</span>
                      <span
                        className={classNames({
                          'text-[#e643d8]': (player[value[1]] as number) + extraPoints >= 110,
                          'text-[#a652e3]':
                            (player[value[1]] as number) + extraPoints >= 100 &&
                            (player[value[1]] as number) + extraPoints < 110,
                          'text-[#e35252]':
                            (player[value[1]] as number) + extraPoints >= 90 &&
                            (player[value[1]] as number) + extraPoints < 100,
                          'text-[#fca96a]':
                            (player[value[1]] as number) + extraPoints >= 80 &&
                            (player[value[1]] as number) + extraPoints < 90,
                          'text-[#fceb6a]':
                            (player[value[1]] as number) + extraPoints >= 70 &&
                            (player[value[1]] as number) + extraPoints < 80,
                          'text-white': (player[value[1]] as number) + extraPoints < 70,
                        })}
                      >
                        {(player[value[1]] as number) + extraPoints}
                        <span className='absolute inline-block pl-3 text-white'>
                          {extraPoints === 0 ? '' : extraPoints < 0 ? `(${extraPoints})` : `(+${extraPoints})`}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className='flex w-150 flex-col justify-between border-2 border-[#82220e] bg-gradient-to-br from-[#662315] to-[#6b2d20] px-13 py-10'>
                  <div className='flex flex-col items-center gap-2'>
                    <span className='font-semibold'>{player.position}</span>
                    <span>{`(${player.hand_type})`}</span>
                  </div>

                  <div className='border-1 border-[#aaa]'>
                    {setPitchesFourAmount(player.pitches.split(' / ')).map((pitch) => {
                      const [arsenal, grade] = pitch.split(' ');

                      return (
                        <div className='flex items-center justify-between px-6 py-4 even:bg-[#82220e]' key={pitch}>
                          <span>{arsenal}</span>
                          <div
                            className={classNames('flex h-20 w-20 items-center justify-center rounded-full text-14', {
                              'bg-[#ff2600]': grade === 'S',
                              'bg-[#ff5500]': grade === 'A',
                              'bg-[#ffea00]': grade === 'B',
                              'bg-[#3bd90b]': grade === 'C',
                              'bg-[#1b59f5]': grade === 'D',
                            })}
                          >
                            <span className='drop-shadow-[0px_0px_2px_#000]'>{grade}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='flex'>
            {isHitter(player) ? (
              <div className='grid flex-1 grid-cols-2 gap-5 bg-gradient-to-br from-[#5c1102] to-[#c23506] px-5 py-10'>
                {Object.entries(HITTER_STAT_DETAIL).map((value, index) => (
                  <div
                    className='flex flex-col items-center border-1 border-x-[#88888820] border-b-[#66666620] border-t-[#ffffff20] text-15'
                    key={index}
                  >
                    <div className='py-4'>{value[0]}</div>
                    <div className='w-full border-y-1 border-b-[#00000020] border-t-[#00000010] bg-gradient-to-br from-[#662315] to-[#5e1d10] py-4 text-center'>
                      {(player[value[1]] as number) + extraPoints}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid flex-1 grid-cols-2 gap-5 bg-gradient-to-tr from-[#5c1102] to-[#c23506] px-5 py-10'>
                {Object.entries(PITCHER_STAT_DETAIL).map((value, index) => (
                  <div
                    className='flex flex-col items-center border-1 border-x-[#88888820] border-b-[#66666620] border-t-[#ffffff20] text-15'
                    key={index}
                  >
                    <div className='py-4'>{value[0]}</div>
                    <div className='w-full border-y-1 border-b-[#00000020] border-t-[#00000010] bg-gradient-to-br from-[#662315] to-[#5e1d10] py-4 text-center'>
                      {(player[value[1]] as number) + extraPoints}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className='flex w-160 flex-col items-center justify-center gap-10 bg-gradient-to-t from-[#963515] to-[#f56738] p-7'>
              <span className='text-15'>레코드</span>

              <div className='flex h-105 w-full flex-col gap-5 border-b-1 border-b-[#00000020] bg-gradient-to-br from-[#662315] to-[#5e1d10] px-3 py-5'>
                {player.all_star && (
                  <div className='rounded border-1 border-[#fe6b35] bg-gradient-to-b from-[#0f0704] to-[#240f08] py-5 text-center text-[#fe6b35]'>
                    올스타
                  </div>
                )}
                {player.golden_glove && (
                  <div className='rounded border-1 border-[#f5d300] bg-gradient-to-b from-[#0f0704] to-[#240f08] py-5 text-center text-[#f5d300]'>
                    골든글러브
                  </div>
                )}
                {(player.mvp_korea || player.mvp_league) && (
                  <div className='rounded border-1 border-[#a0edff] bg-gradient-to-b from-[#0f0704] to-[#240f08] py-5 text-center text-[#a0edff]'>
                    MVP
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

function setPitchesFourAmount(pitches: string[]) {
  const newPitches = [...pitches];

  for (let num = newPitches.length; num < 4; num += 1) {
    newPitches.push(' ');
  }
  return newPitches;
}

export default PlayerDetail;
