import Image from 'next/image';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';

import { Team } from '@/app/stores/team/types';

import * as S from './styles';

const TeamSelection = () => {
  const { selectedYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams, closePopup } = useTeamStore();

  const onTeamClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedTeam = allTeams.find((team) => team.id === e.currentTarget.value) as Team;

    setTeams({
      team: selectedTeam,
      index: selectedTeams.includes(selectedTeam) ? selectedTeams.indexOf(selectedTeam) : selectedTeams.length,
      action: selectedTeams.includes(selectedTeam) ? 'DELETE' : 'ADD',
    });
  };

  return (
    <S.Container
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {allTeams.map((team, index) => (
        <S.Wrapper
          key={index}
          value={team.id}
          onClick={onTeamClick}
          disabled={!selectedYear || !team.years.includes(selectedYear)}
          $isDisabled={!selectedYear || !team.years.includes(selectedYear)}
          $isSelected={selectedTeams.includes(team)}
        >
          <S.TeamLogo>
            <Image
              src={team.logo}
              alt={team.name}
              placeholder='blur'
              blurDataURL={team.logo}
              fill
              sizes='40px'
              style={{
                filter: selectedTeams.includes(team) ? '' : 'drop-shadow(3px 3px 0 #333)',
              }}
            />
          </S.TeamLogo>

          <span>{team.name}</span>
        </S.Wrapper>
      ))}
    </S.Container>
  );
};

export default TeamSelection;
