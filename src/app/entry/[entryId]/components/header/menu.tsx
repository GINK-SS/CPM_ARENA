'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoCloseOutline } from 'react-icons/io5';
import { HiEllipsisVertical } from 'react-icons/hi2';

import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

export default function Menu() {
  const [isMenu, openMenu, closeMenu] = useTableStore(
    useShallow((state) => [state.isMenu, state.openMenu, state.closeMenu])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const buttonValueList = [55, 60, 65, 69];
  const limit = searchParams.get('limit');
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit;

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
    closeMenu();
    router.replace(`${pathname}?limit=${Number(e.currentTarget.value)}`, { scroll: false });
  };

  return (
    <>
      <HiEllipsisVertical className='cursor-pointer text-25 tablet:hidden' onClick={() => openMenu()} />

      {isMenu && (
        <div className='fixed right-12 top-12 z-10 w-full max-w-[300px] rounded-lg bg-slate-800 p-20 text-slate-400 shadow-lg'>
          <button onClick={() => closeMenu()} className='absolute right-12 top-12 flex items-center justify-center p-4'>
            <IoCloseOutline className='text-25' />
          </button>

          <span className='mb-20 block border-b-1 border-b-slate-200/10 pb-20 text-20 font-semibold'>오버롤 설정</span>
          <ul className='flex flex-col justify-center gap-30'>
            {buttonValueList.map((value) => (
              <li key={value}>
                <button
                  className={classNames('flex-1', {
                    'font-semibold text-[#F98A58]': value === overallLimit,
                    'hover:text-[#e0a824]': value !== overallLimit,
                  })}
                  value={value}
                  onClick={onFilterClick}
                >
                  {value === 55 ? '전체' : `${value} 이상`} 보기
                </button>
              </li>
            ))}
          </ul>

          <div className='mt-20 flex items-center justify-between border-t border-slate-200/10 pt-20'>
            <span className='font-semibold'>Contact</span>

            <Link href='mailto:gink.ss00@gmail.com'>
              <button
                className={classNames(
                  'flex items-center rounded-lg border-1 p-8 text-slate-200 shadow-sm duration-200',
                  'hover:bg-slate-200 hover:text-slate-800'
                )}
              >
                gink.ss00@gmail.com
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
