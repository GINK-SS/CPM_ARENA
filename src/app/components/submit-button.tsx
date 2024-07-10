import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useTeamStore from '@/app/stores/team';
import useBuffStore from '@/app/stores/buff';

const SubmitBtn = () => {
  const [selectedYear, closeYearPopup] = useYearStore(useShallow((state) => [state.selectedYear, state.closePopup]));
  const [allTeams, selectedTeams, closeTeamPopup] = useTeamStore(
    useShallow((state) => [state.allTeams, state.selectedTeams, state.closePopup])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const [closeMenu, setOverallLimit] = useTableStore(useShallow((state) => [state.closeMenu, state.setOverallLimit]));
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const router = useRouter();

  const onSubmit = () => {
    closeYearPopup();
    closeTeamPopup();
    closeMenu();
    setOverallLimit(69);
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();

    router.push(
      `/entry/${selectedYear}${selectedTeams
        .map((selectedTeam) => allTeams.find((team) => team === selectedTeam)?.shorten)
        .join('')}`
    );
  };

  return (
    <div className='mx-auto mb-10 flex max-w-[700px] justify-center laptop:max-w-[1000px]'>
      <button
        className={twMerge(
          classNames(
            'relative inline-block h-45 w-full overflow-hidden border-1 indent-10 text-17 font-semibold tracking-[10px] transition-colors duration-300 ease-in-out tablet:h-60 tablet:text-20',
            'before:absolute before:inset-y-0 before:-right-50 before:left-0 before:-z-[1] before:-translate-x-full before:border-b-[45px] before:border-r-[50px] before:border-b-[#f6712a] before:border-r-transparent before:transition-transform before:duration-300 before:content-[""] tablet:before:border-b-[60px]',
            'after:absolute after:inset-y-0 after:-left-50 after:right-0 after:-z-[1] after:translate-x-full after:border-l-[50px] after:border-t-[45px] after:border-l-transparent after:border-t-[#f6712a] after:transition-transform after:duration-300 after:content-[""] tablet:after:border-t-[60px]',
            'hover:before:-translate-x-[49%] hover:after:translate-x-[49%]',
            {
              'opacity-30 before:content-none after:content-none': !selectedYear || selectedTeams.length < 5,
            }
          )
        )}
        onClick={onSubmit}
        disabled={!selectedYear || selectedTeams.length < 5}
      >
        엔트리 확인하기
      </button>
    </div>
  );
};

export default SubmitBtn;
