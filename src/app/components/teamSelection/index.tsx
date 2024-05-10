import Image from 'next/image';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';

import * as S from './styles';

const TeamSelection = () => {
  const { selectedYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams } = usePlayerStore();

  const onTeamClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTeams({
      id: e.currentTarget.value,
      index: selectedTeams.includes(e.currentTarget.value)
        ? selectedTeams.indexOf(e.currentTarget.value)
        : selectedTeams.length,
      action: selectedTeams.includes(e.currentTarget.value) ? 'DELETE' : 'ADD',
    });
  };

  return (
    <S.Container>
      {allTeams.map((team, index) => (
        <S.Wrapper
          key={index}
          value={team.id}
          onClick={onTeamClick}
          disabled={!selectedYear || !team.years.includes(selectedYear)}
          $isDisabled={!selectedYear || !team.years.includes(selectedYear)}
          $isSelected={selectedTeams.includes(team.id)}
        >
          <Image
            src={team.logo}
            alt={team.name}
            placeholder='blur'
            blurDataURL={team.logo}
            width={40}
            height={40}
            style={{
              filter: selectedTeams.includes(team.id) ? '' : 'drop-shadow(3px 3px 0 #333)',
            }}
          />

          <span>{team.name}</span>
        </S.Wrapper>
      ))}
    </S.Container>
  );
};

export default TeamSelection;
