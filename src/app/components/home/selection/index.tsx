import Image from 'next/image';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import YearSelection from '../../yearSelection';
import TeamSelection from '../../teamSelection';

import * as S from './styles';

const Selection = () => {
  const { isShow: isShowOfYear, selectedYear, setShowYearList } = useYearStore();
  const { isShow: isShowOfTeam, allTeams, selectedTeams, setShowTeamList } = usePlayerStore();

  const onTeamList = () => {
    if (!selectedYear) return;

    setShowTeamList();
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Button $hasData={!!selectedYear} onClick={setShowYearList} $isActive>
          {selectedYear ? `IN ${selectedYear}` : 'YEAR'}
        </S.Button>

        {isShowOfYear && <YearSelection />}
      </S.Wrapper>

      <S.Wrapper>
        <S.Button
          $hasData={selectedTeams.length === 5}
          onClick={onTeamList}
          $isActive={!!selectedYear}
          disabled={!selectedYear}
        >
          {selectedTeams.length ? (
            <S.LogoWrapper>
              {selectedTeams.map((selectedTeam, idx) => (
                <S.Logo key={idx}>
                  <Image
                    src={allTeams.find((team) => team.id === selectedTeam)?.logo || ''}
                    alt={allTeams.find((team) => team.id === selectedTeam)?.id || ''}
                    layout='fill'
                    style={{ filter: 'drop-shadow(3px 3px 0 #333)' }}
                  />
                </S.Logo>
              ))}
            </S.LogoWrapper>
          ) : (
            'TEAM'
          )}
        </S.Button>

        {isShowOfTeam && <TeamSelection />}
      </S.Wrapper>
    </S.Container>
  );
};

export default Selection;
