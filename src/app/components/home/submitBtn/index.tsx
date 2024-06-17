import { useRouter } from 'next/navigation';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';

import * as S from './styles';

const SubmitBtn = () => {
  const { selectedYear, closeYearList } = useYearStore();
  const { selectedTeams, closeTeamList, allTeams } = usePlayerStore();
  const { closeMenu } = useTableStore();
  const router = useRouter();

  const onSubmit = () => {
    closeYearList();
    closeTeamList();
    closeMenu();

    router.push(
      `/lineup/${selectedYear}${selectedTeams
        .map((selectedTeam) => allTeams.find((team) => team.id === selectedTeam)?.shorten)
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
