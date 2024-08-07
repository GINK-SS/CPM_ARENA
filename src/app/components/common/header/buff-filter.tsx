'use client';

import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useShallow } from 'zustand/react/shallow';

import useCommonStore from '@/app/stores/common';

export default function BuffFilter() {
  const [isBuffActive, setIsBuffActive] = useCommonStore(
    useShallow((state) => [state.isBuffActive, state.setIsBuffActive])
  );
  const pathname = usePathname();

  const onClick = () => {
    setIsBuffActive();
  };

  return (
    pathname.startsWith('/entry/') && (
      <button
        className='mr-15 w-50 break-all border-r-1 border-r-slate-200/20 pr-18 laptop:h-30 laptop:w-auto'
        onClick={onClick}
      >
        <span
          className={classNames('font-bold', {
            'text-[#F98A58]': isBuffActive,
            'text-slate-400': !isBuffActive,
          })}
        >
          버프 적용
        </span>
      </button>
    )
  );
}
