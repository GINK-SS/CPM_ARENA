import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type TableItemProps = {
  player: Hitter | Pitcher;
};

const TablePlayer = ({ player }: TableItemProps) => {
  const { selectedTeams } = useTeamStore();
  const { selectedLineup, setSelectedLineup, setSelectedPlayer } = usePlayerStore();
  const { setBuff } = useBuffStore();

  const onClick = () => {
    if (!player.name) return;

    setSelectedPlayer(player);

    const teamIdx = selectedTeams.findIndex((selectedTeam) => selectedTeam.id === player.team);

    if (selectedLineup.includes(player)) {
      setSelectedLineup({ player, action: 'DELETE' });
      setBuff({ player, teamIdx, action: 'DELETE' });

      return;
    }

    if (!!player.batting_all && selectedLineup.filter((player) => !!player.batting_all).length >= 9) return;
    if (!!player.pitch_all && selectedLineup.filter((player) => !player.batting_all).length >= 10) return;

    setSelectedLineup({ player, action: 'ADD' });
    setBuff({ player, teamIdx, action: 'ADD' });
  };

  return (
    <S.Wrapper $hasData={!!player.name} onClick={onClick}>
      <S.LineUpCheck $isLineUp={selectedLineup.includes(player)} />

      <S.Name $isAllStar={player.all_star} $isMVP={player.mvp_korea || player.mvp_league}>
        {player.name}
      </S.Name>
      <S.Overall $isOver80={player.overall >= 80} $isGoldenGlove={player.golden_glove}>
        {player.overall}
      </S.Overall>
    </S.Wrapper>
  );
};

export default TablePlayer;
