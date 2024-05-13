import usePlayerStore from '@/app/stores/player';
import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type TableItemProps = {
  player: Hitter | Pitcher;
};

const TablePlayer = ({ player }: TableItemProps) => {
  const { selectedLineUp, setSelectedLineUp, setSelectedPlayer } = usePlayerStore();

  const onClick = () => {
    if (!player.name) return;

    setSelectedPlayer(player);

    if (selectedLineUp.players.includes(player)) {
      setSelectedLineUp(player, 'DELETE');

      return;
    }

    if (!!player.batting_all && selectedLineUp.count.hitters >= 9) return;
    if (!!player.pitch_all && selectedLineUp.count.pitchers >= 10) return;

    setSelectedLineUp(player);
  };

  return (
    <S.Wrapper $hasData={!!player.name} onClick={onClick}>
      <S.LineUpCheck $isLineUp={selectedLineUp.players.includes(player)} />

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
