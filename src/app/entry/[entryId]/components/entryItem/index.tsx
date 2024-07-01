import { useShallow } from 'zustand/react/shallow';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useBuffStore from '@/app/stores/buff';
import { PITCHER_POSITION_ORDER } from '@/app/const';

import { Hitter, HitterPosition, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

type EntryItemProps = {
  player: Hitter | Pitcher;
  position: string;
};

const EntryItem = ({ player, position }: EntryItemProps) => {
  const selectedTeams = useTeamStore((state) => state.selectedTeams);
  const [hitterLineup, pitcherLineup, selectedPlayer, pinnedPlayer, addToLineup, deleteFromLineup, setSelectedPlayer] =
    usePlayerStore(
      useShallow((state) => [
        state.hitterLineup,
        state.pitcherLineup,
        state.selectedPlayer,
        state.pinnedPlayer,
        state.addToLineup,
        state.deleteFromLineup,
        state.setSelectedPlayer,
      ])
    );
  const [isShowHitterLineup, toggleIsShowHitterLineup] = useTableStore(
    useShallow((state) => [state.isShowHitterLineup, state.toggleIsShowHitterLineup])
  );
  const setBuff = useBuffStore((state) => state.setBuff);

  const onClick = () => {
    if (!player.name) return;

    setSelectedPlayer(player);

    if ((isHitter(player) && !isShowHitterLineup) || (!isHitter(player) && isShowHitterLineup)) {
      toggleIsShowHitterLineup();
    }

    if (pinnedPlayer) return;

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
      let hitterPosition: HitterPosition | null = null;

      if (player.position === '외야수') {
        hitterPosition =
          hitterLineup.filter((hitter) => hitter.position === '외야수').length >= 3
            ? hitterLineup.some((hitter) => hitter.position === '지명타자')
              ? null
              : '지명타자'
            : '외야수';
      } else {
        hitterPosition = hitterLineup.some((hitter) => hitter.position === player.position)
          ? hitterLineup.some((hitter) => hitter.position === '지명타자')
            ? null
            : '지명타자'
          : player.position;
      }

      if (!hitterPosition) return;

      addToLineup(player, hitterPosition);
    } else {
      addToLineup(player);
    }

    setBuff({ player, teamIdx, action: 'ADD' });
  };

  const isBlockActive = () => {
    if (!pinnedPlayer) return false;

    if (!isHitter(pinnedPlayer)) {
      return pinnedPlayer.position === '선발'
        ? position !== '선발'
          ? true
          : false
        : position === '계투' || position === '마무리'
        ? false
        : true;
    }

    if (PITCHER_POSITION_ORDER.includes(position)) return true;

    if (hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position !== '지명타자') {
      return position !== hitterLineup.find((hitter) => hitter.player === pinnedPlayer)?.position;
    }

    return false;
  };

  return (
    <S.Container>
      <S.Block $isActive={isBlockActive()} />

      <S.SelectedEffect
        $isActive={!!pinnedPlayer && (player === pinnedPlayer || player === selectedPlayer)}
        $isPinned={player === pinnedPlayer}
      />

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
    </S.Container>
  );
};

export default EntryItem;
