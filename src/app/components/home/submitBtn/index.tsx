import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';

import * as S from './styles';

const SubmitBtn = () => {
  const { selectedYear } = useYearStore();
  const { selectedTeams } = usePlayerStore();
  const { showTable } = useTableStore();

  const onSubmit = () => {
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
