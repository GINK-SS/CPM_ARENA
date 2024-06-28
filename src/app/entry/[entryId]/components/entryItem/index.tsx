import { useShallow } from 'zustand/react/shallow';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import { Hitter, HitterPosition, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

type EntryItemProps = {
  player: Hitter | Pitcher;
};

const EntryItem = ({ player }: EntryItemProps) => {
  const selectedTeams = useTeamStore((state) => state.selectedTeams);
  const [hitterLineup, pitcherLineup, addToLineup, deleteFromLineup, setSelectedPlayer] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.pitcherLineup,
      state.addToLineup,
      state.deleteFromLineup,
      state.setSelectedPlayer,
    ])
  );
  const setBuff = useBuffStore((state) => state.setBuff);

  const onClick = () => {
    if (!player.name) return;

    setSelectedPlayer(player);

    const teamIdx = selectedTeams.findIndex((selectedTeam) => selectedTeam.id === player.team);

    if (
      hitterLineup.some((hitter) => hitter.player === player) ||
      pitcherLineup.some((pitcher) => pitcher.player === player)
    ) {
      deleteFromLineup(player);
      setBuff({ player, teamIdx, action: 'DELETE' });

      return;
    }

    if (isHitter(player) && hitterLineup.filter(({ player }) => player).length >= 9) return;
    if (
      !isHitter(player) &&
      ((player.position === '선발' &&
        pitcherLineup.filter(({ position, player }) => position === '선발' && player).length >= 5) ||
        (player.position !== '선발' &&
          pitcherLineup.filter(({ position, player }) => position !== '선발' && player).length >= 5))
    )
      return;

    if (isHitter(player)) {
      let position: HitterPosition | null = null;

      if (player.position === '외야수') {
        position =
          hitterLineup.filter((hitter) => hitter.position === '외야수').length >= 3
            ? hitterLineup.some((hitter) => hitter.position === '지명타자')
              ? null
              : '지명타자'
            : '외야수';
      } else {
        position = hitterLineup.some((hitter) => hitter.position === player.position)
          ? hitterLineup.some((hitter) => hitter.position === '지명타자')
            ? null
            : '지명타자'
          : player.position;
      }

      if (!position) return;

      addToLineup(player, position);
    } else {
      addToLineup(player);
    }

    setBuff({ player, teamIdx, action: 'ADD' });
  };

  return (
    <S.Wrapper $hasData={!!player.name} onClick={onClick}>
      <S.LineUpCheck
        $isLineUp={
          isHitter(player)
            ? hitterLineup.some((hitter) => hitter.player === player)
            : pitcherLineup.some((pitcher) => pitcher.player === player)
        }
      />

      <S.Name $isAllStar={player.all_star} $isMVP={player.mvp_korea || player.mvp_league}>
        {player.name}
      </S.Name>
      <S.Overall $isOver80={player.overall >= 80} $isGoldenGlove={player.golden_glove}>
        {player.overall}
      </S.Overall>
    </S.Wrapper>
  );
};

export default EntryItem;
