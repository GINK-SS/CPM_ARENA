import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useTeamStore from '@/app/stores/team';
import useBuffStore from '@/app/stores/buff';

import * as S from './styles';

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
    <S.Button
      onClick={onSubmit}
      $isActive={!!selectedYear && selectedTeams.length === 5}
      disabled={!selectedYear || selectedTeams.length < 5}
    >
      CHECK
    </S.Button>
  );
};

export default SubmitBtn;
