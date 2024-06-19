import { useRouter } from 'next/navigation';

import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useTeamStore from '@/app/stores/team';
import useBuffStore from '@/app/stores/buff';

import * as S from './styles';

const SubmitBtn = () => {
  const { selectedYear, closeYearList } = useYearStore();
  const { allTeams, selectedTeams, closePopup: closeTeamPopup } = useTeamStore();
  const { setSelectedPlayer, setSelectedLineup } = usePlayerStore();
  const { closeMenu, setOverallLimit } = useTableStore();
  const { clearBuff } = useBuffStore();
  const router = useRouter();

  const onSubmit = () => {
    closeYearList();
    closeTeamPopup();
    closeMenu();
    setOverallLimit(69);
    setSelectedPlayer(null);
    setSelectedLineup({ action: 'CLEAR' });
    clearBuff();

    router.push(
      `/lineup/${selectedYear}${selectedTeams
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
