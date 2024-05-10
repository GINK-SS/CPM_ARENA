import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';

import * as S from './styles';

const SubmitBtn = () => {
  const { selectedYear } = useYearStore();
  const { selectedTeams } = usePlayerStore();

  return (
    <S.Button
      $isActive={!!selectedYear && selectedTeams.length === 5}
      disabled={!selectedYear || selectedTeams.length < 5}
    >
      CHECK
    </S.Button>
  );
};

export default SubmitBtn;
