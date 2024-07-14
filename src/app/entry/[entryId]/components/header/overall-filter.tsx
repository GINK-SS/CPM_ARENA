'use client';

import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

export default function OverallFilter() {
  const [overallLimit, isOverallFilter, setOverallLimit, openOverallFilter, closeOverallFilter] = useTableStore(
    useShallow((state) => [
      state.overallLimit,
      state.isOverallFilter,
      state.setOverallLimit,
      state.openOverallFilter,
      state.closeOverallFilter,
    ])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const buttonValueList = [55, 60, 65, 69];

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOverallLimit(Number(e.currentTarget.value));
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
    closeOverallFilter();
  };

  return (
    <div className='relative w-120'>
      <div className='flex cursor-pointer items-center justify-end gap-5 text-17' onClick={() => openOverallFilter()}>
        <span className='font-semibold text-[#F98A58]'>
          {overallLimit === 55 ? '전체' : `${overallLimit} 이상`} 보기
        </span>
        {isOverallFilter ? <IoCaretUp className='text-white/50' /> : <IoCaretDown className='text-white/50' />}
      </div>

      {isOverallFilter && (
        <ul className='absolute top-30 z-10 flex flex-col items-center justify-center bg-white'>
          {buttonValueList.map((value) => (
            <li key={value}>
              <button
                className={classNames('w-120 p-10 text-black', {
                  'bg-[#410] text-white': value === overallLimit,
                  'hover:bg-[#e0a824]/30': value !== overallLimit,
                })}
                value={value}
                onClick={onFilterClick}
              >
                {value === 55 ? '전체' : `${value} 이상`} 보기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
