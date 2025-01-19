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
  if (!player || !isHitter(player)) return null;

  const modalRef = useRef<HTMLDivElement>(null);
  const [hitterLineup, modifyPositionLineup, setSelectedPlayer, setPinnedPlayer] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.modifyPositionLineup,
      state.setSelectedPlayer,
      state.setPinnedPlayer,
    ])
  );
  const positions = player.positions;
  const lineupPosition = hitterLineup.find((hitter) => hitter.player === player)?.position;

  const onPositionClick = (newPosition: HitterPosition) => {
    if (lineupPosition === newPosition) return;
    if (hitterLineup.some((hitter) => hitter.player !== player && hitter.position === newPosition)) return;

    modifyPositionLineup({ pinnedPlayer: player, newPosition });
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

  return (
    <div
      ref={modalRef}
      className='absolute bottom-0 left-0 z-50 w-190 border-2 border-[#aaa] bg-black p-4 drop-shadow-[0_0_2px_#222]'
    >
      <div className='relative aspect-square w-full bg-gray-300/50'>
        <Image src={base} alt='logo' fill sizes='120px' />

        {/* 포수 */}
        <button
          className={classNames(
            'absolute bottom-2 left-1/2 flex aspect-square w-27 -translate-x-1/2 items-center justify-center rounded-full border border-white',
            {
              ['hidden']: !positions.includes('포수'),
              ['cursor-default bg-gray-300 opacity-40']:
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
              ['cursor-default bg-gray-300 opacity-40']:
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
              ['cursor-default bg-gray-300 opacity-40']:
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
              ['cursor-default bg-gray-300 opacity-40']:
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
              ['cursor-default bg-gray-300 opacity-40']:
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
              ['cursor-default bg-gray-300 opacity-40']:
                positions.includes('외야수') &&
                hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '외야수'),
              ['bg-gray-500']:
                positions.includes('외야수') &&
                lineupPosition !== '외야수' &&
                !hitterLineup.some((hitter) => hitter.player !== player && hitter.position === '외야수'),
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
              ['cursor-default bg-gray-300 opacity-40']: hitterLineup.some(
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
    </div>
  );
}
