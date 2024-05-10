import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';

import * as S from './styles';

const SubmitBtn = () => {
  const { selectedYear, closeYearList } = useYearStore();
  const { selectedTeams, closeTeamList } = usePlayerStore();
  const { showTable } = useTableStore();

  const onSubmit = () => {
    closeYearList();
    closeTeamList();
    showTable();
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
