import Image from 'next/image';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import { TeamId } from '@/app/stores/player/types';

import * as S from './styles';

const TeamSelection = () => {
  const { selectedYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams } = usePlayerStore();

  const onTeamClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTeams({
      id: e.currentTarget.value as TeamId,
      index: selectedTeams.includes(e.currentTarget.value as TeamId)
        ? selectedTeams.indexOf(e.currentTarget.value as TeamId)
        : selectedTeams.length,
      action: selectedTeams.includes(e.currentTarget.value as TeamId) ? 'DELETE' : 'ADD',
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
          $isSelected={selectedTeams.includes(team.id)}
        >
          <S.TeamLogo>
            <Image
              src={team.logo}
              alt={team.name}
              placeholder='blur'
              blurDataURL={team.logo}
              layout='fill'
              style={{
                filter: selectedTeams.includes(team.id) ? '' : 'drop-shadow(3px 3px 0 #333)',
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
