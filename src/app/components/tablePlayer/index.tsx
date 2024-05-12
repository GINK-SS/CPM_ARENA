import usePlayerStore from '@/app/stores/player';
import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type TableItemProps = {
  player: Hitter | Pitcher;
  componentId: string;
};

const TablePlayer = ({ player, componentId }: TableItemProps) => {
  const { setSelectedPlayer, setSelectedPlayerComponentId } = usePlayerStore();

  const onClick = () => {
    if (!player.name) return;

    setSelectedPlayerComponentId(componentId);
    setSelectedPlayer(player);
  };

  return (
    <S.Wrapper layoutId={componentId} $hasData={!!player.name} onClick={onClick}>
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
