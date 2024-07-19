import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import useCommonStore from '@/app/stores/common';

const buttonValueList = [55, 60, 65, 69];

export default function MenuFilter() {
  const router = useRouter();
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const setIsLoading = useCommonStore((state) => state.setIsLoading);
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit');
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit < 55 ? 55 : +limit;

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (overallLimit === Number(e.currentTarget.value)) return;

    setIsLoading(true);
    router.replace(`${pathname}?limit=${Number(e.currentTarget.value)}`, { scroll: false });
  };

  useEffect(() => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
    setIsLoading(false);
  }, [overallLimit]);

  return (
    <div
      className={classNames('mb-20 border-b-1 border-slate-200/10 pb-20', {
        hidden: !pathname.startsWith('/entry/'),
      })}
    >
      <span className='mb-10 block text-18 font-semibold'>오버롤 설정</span>

      <span className='mb-10 block text-12 text-red-300 opacity-80'>
        오버롤 필터 변경 시 선택한 선수들이 초기화됩니다.
      </span>

      <ul className='flex flex-wrap items-center justify-center gap-5'>
        {buttonValueList.map((value) => (
          <li key={value} className='flex-1'>
            <button
              className={classNames(
                'aspect-square w-full rounded-md border-1 text-15 transition-[color,_background-color,_opacity] duration-200',
                {
                  'bg-slate-100 font-semibold text-[#e56d36]': value === overallLimit,
                  'text-slate-400 opacity-50 hover:bg-slate-300 hover:text-slate-800 hover:opacity-90':
                    value !== overallLimit,
                }
              )}
              value={value}
              onClick={onFilterClick}
            >
              {value === 55 ? '전체' : `${value} 이상`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
