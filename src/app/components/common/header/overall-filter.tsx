'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';

import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import useCommonStore from '@/app/stores/common';

export default function OverallFilter() {
  const [isOverallFilter, openOverallFilter, closeOverallFilter] = useTableStore(
    useShallow((state) => [state.isOverallFilter, state.openOverallFilter, state.closeOverallFilter])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const setIsLoading = useCommonStore((state) => state.setIsLoading);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const buttonValueList = [55, 60, 65, 69];
  const limit = searchParams.get('limit');
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit < 55 ? 55 : +limit;

  const onSelectClick = () => {
    if (isOverallFilter) closeOverallFilter();
    else openOverallFilter();
  };
  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (overallLimit === Number(e.currentTarget.value)) return;

    setIsLoading(true);
    router.replace(`${pathname}?limit=${Number(e.currentTarget.value)}`, { scroll: false });
  };

  useEffect(() => {
    closeOverallFilter();
  }, [pathname]);

  useEffect(() => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
    setIsLoading(false);
  }, [overallLimit]);

  return (
    <div
      className={classNames('relative mr-15 flex items-center justify-center border-r-1 border-r-slate-200/20 pr-15', {
        hidden: !pathname.startsWith('/entry/'),
      })}
    >
      <div className='flex cursor-pointer items-center justify-end gap-5 py-5 text-17' onClick={onSelectClick}>
        <span className='font-semibold text-[#F98A58]'>
          {overallLimit <= 55 ? '전체' : `${overallLimit} 이상`} 보기
        </span>
        {isOverallFilter ? <IoCaretUp className='text-white/50' /> : <IoCaretDown className='text-white/50' />}
      </div>

      {isOverallFilter && (
        <ul className='absolute top-30 z-10 flex w-[200px] flex-col items-center justify-center rounded-lg bg-slate-800 p-15 shadow-lg'>
          <div className='mb-15 flex flex-col gap-2 border-b-2 border-slate-200/20 pb-15 text-13 text-red-300 opacity-80'>
            <span>오버롤 필터 변경 시,</span>
            <span>선택한 선수들이 초기화됩니다.</span>
          </div>

          {buttonValueList.map((value) => (
            <li key={value} className='mb-5 w-full flex-1 last:mb-0'>
              <button
                className={classNames(
                  'w-full border-1 p-10 transition-[color,_background-color,_opacity] duration-200',
                  {
                    'bg-slate-100 font-semibold text-[#e56d36]': value === overallLimit,
                    'text-slate-400 opacity-50 hover:bg-slate-300 hover:text-slate-800 hover:opacity-90':
                      value !== overallLimit,
                  }
                )}
                value={value}
                onClick={onFilterClick}
              >
                {value <= 55 ? '전체' : `${value} 이상`} 보기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
