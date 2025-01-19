import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import { Hitter, HitterPosition } from '@/app/stores/player/types';
import usePlayerStore from '@/app/stores/player';
import base from '@/public/assets/base.png';
import { isHitter } from '@/app/util/decideType';

type PositionModalProps = {
  player: Hitter | null;
  onClose: () => void;
};

export default function PositionModal({ player, onClose }: PositionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [hitterLineup, modifyPositionLineup, setSelectedPlayer, setPinnedPlayer] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.modifyPositionLineup,
      state.setSelectedPlayer,
      state.setPinnedPlayer,
    ])
  );
  const positions = player?.positions ?? [];
  const lineupPosition = hitterLineup.find((hitter) => hitter.player === player)?.position;

  const onPositionClick = (newPosition: HitterPosition) => {
    if (lineupPosition === newPosition) return;
    if (newPosition === '외야수' && hitterLineup.filter((hitter) => hitter.position === '외야수').length >= 3) return;
    if (
      newPosition !== '외야수' &&
      hitterLineup.some((hitter) => hitter.player !== player && hitter.position === newPosition)
    )
      return;

    modifyPositionLineup({ pinnedPlayer: player as Hitter, newPosition });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedPlayer(null);
        setPinnedPlayer(null);
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  if (!player || !isHitter(player) || !positions.length) return null;

  return (
    <div
      ref={modalRef}
      className={classNames(
        'absolute bottom-0 left-0 z-50 w-190 border-2 border-[#aaa] bg-black p-4 drop-shadow-[0_0_2px_#222]',
        'origin-bottom-left scale-75 mobileL:scale-[80%] tablet:scale-95 laptop:scale-100'
      )}
    >
      <div className='relative aspect-square w-full bg-gray-300/50'>
        <Image src={base} alt='logo' fill sizes='120px' />

        {/* 포수 */}
        <button
          className={classNames(
            'absolute bottom-2 left-1/2 flex aspect-square w-27 -translate-x-1/2 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('포수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('포수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '포수'),
              ['bg-gray-500']:
                positions.includes('포수') &&
                lineupPosition !== '포수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '포수'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '포수',
            }
          )}
          onClick={() => onPositionClick('포수')}
        >
          <span className='text-14 font-semibold'>포</span>
        </button>

        {/* 1루수 */}
        <button
          className={classNames(
            'absolute right-20 top-100 flex aspect-square w-27 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('1루수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('1루수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '1루수'),
              ['bg-gray-500']:
                positions.includes('1루수') &&
                lineupPosition !== '1루수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '1루수'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '1루수',
            }
          )}
          onClick={() => onPositionClick('1루수')}
        >
          <span className='text-14 font-semibold'>1</span>
        </button>

        {/* 2루수 */}
        <button
          className={classNames(
            'absolute right-30 top-55 flex aspect-square w-27 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('2루수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('2루수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '2루수'),
              ['bg-gray-500']:
                positions.includes('2루수') &&
                lineupPosition !== '2루수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '2루수'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '2루수',
            }
          )}
          onClick={() => onPositionClick('2루수')}
        >
          <span className='text-14 font-semibold'>2</span>
        </button>

        {/* 3루수 */}
        <button
          className={classNames(
            'absolute left-20 top-100 flex aspect-square w-27 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('3루수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('3루수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '3루수'),
              ['bg-gray-500']:
                positions.includes('3루수') &&
                lineupPosition !== '3루수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '3루수'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '3루수',
            }
          )}
          onClick={() => onPositionClick('3루수')}
        >
          <span className='text-14 font-semibold'>3</span>
        </button>

        {/* 유격수 */}
        <button
          className={classNames(
            'absolute left-30 top-55 flex aspect-square w-27 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('유격수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('유격수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '유격수'),
              ['bg-gray-500']:
                positions.includes('유격수') &&
                lineupPosition !== '유격수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '유격수'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '유격수',
            }
          )}
          onClick={() => onPositionClick('유격수')}
        >
          <span className='text-14 font-semibold'>유</span>
        </button>

        {/* 외야수 */}
        <button
          className={classNames(
            'absolute left-1/2 top-10 flex aspect-square w-27 -translate-x-1/2 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('외야수'),
              ['cursor-default bg-gray-600 opacity-30']:
                positions.includes('외야수') &&
                lineupPosition !== '외야수' &&
                hitterLineup.filter((hitter) => hitter.position === '외야수').length >= 3,
              ['bg-gray-500']:
                positions.includes('외야수') &&
                lineupPosition !== '외야수' &&
                hitterLineup.filter((hitter) => hitter.position === '외야수').length < 3,
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '외야수',
            }
          )}
          onClick={() => onPositionClick('외야수')}
        >
          <span className='text-14 font-semibold'>외</span>
        </button>

        {/* 지명타자 */}
        <button
          className={classNames(
            'absolute bottom-5 left-5 flex aspect-square w-27 items-center justify-center rounded-full border border-white',
            {
              ['cursor-default bg-gray-600 opacity-30']: hitterLineup.some(
                (hitter) => hitter.player !== player && hitter.player !== player && hitter.position === '지명타자'
              ),
              ['bg-gray-500']:
                lineupPosition !== '지명타자' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '지명타자'),
              ['cursor-default bg-[#91260F]/95']: lineupPosition === '지명타자',
            }
          )}
          onClick={() => onPositionClick('지명타자')}
        >
          <span className='text-14 font-semibold'>지</span>
        </button>
      </div>

      <div className='my-2 mt-4 flex flex-col gap-6'>
        <div className='flex gap-2'>
          <p className='text-13 text-white/50'>·</p>
          <p className='text-13 text-white/50'>클릭 시, 포지션이 변경됩니다.</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-13 text-white/50'>·</p>
          <p className='text-13 leading-15 text-white/50'>
            라인업에 해당 포지션의 선수가 존재한다면 <span className='text-red-500'>투명</span>하게 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
