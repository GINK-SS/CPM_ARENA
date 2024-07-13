import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useTableStore from '@/app/stores/table';
import useBuffStore from '@/app/stores/buff';
import { PITCHER_POSITION_ORDER } from '@/app/const';

import { Hitter, HitterPosition, Pitcher } from '@/app/stores/player/types';
import { isHitter } from '@/app/util/decideType';

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
    <div
      className={classNames(
        'relative flex flex-1 items-center justify-center overflow-hidden border-t-1 border-black bg-white text-black first:border-t-0',
        {
          'cursor-pointer': player.name,
        }
      )}
      onClick={onClick}
    >
      <div
        data-role='orange-check'
        className={classNames('absolute z-[3] h-full w-full cursor-pointer', {
          hidden: !pinnedPlayer || (player !== pinnedPlayer && player !== selectedPlayer),
          'shadow-[inset_0_0_2px_4px_#ff5a00]': player === pinnedPlayer,
          'shadow-[inset_0_0_2px_2px_#ff5a00]': player !== pinnedPlayer,
        })}
      />

      <div
        data-role='lineup-check'
        className={classNames('absolute h-[80%] w-full -rotate-3 bg-black opacity-40', {
          hidden: isHitter(player)
            ? !hitterLineup.some((hitter) => hitter.player === player)
            : !pitcherLineup.some((pitcher) => pitcher.player === player),
        })}
      />

      <div
        data-role='name'
        className={classNames(
          'mobileL:text-14 flex aspect-[3/1] flex-[3] items-center justify-center border-r-1 border-r-black indent-[0.5px] text-[2.2vw] font-semibold tracking-[0.5px] tablet:indent-1 tablet:text-17 tablet:tracking-[1px] laptop:text-20',
          {
            'bg-[#f0c2bd]': player.all_star,
            'font-extrabold text-[#ca4142]': player.mvp_korea || player.mvp_league,
          }
        )}
      >
        {player.name}
      </div>

      <div
        data-role='overall'
        className={classNames(
          'mobileL:text-14 flex aspect-square flex-[1] items-center justify-center text-[2.2vw] tablet:text-16 laptop:text-19',
          {
            'font-bold text-[#1b1588]': player.overall >= 80,
            'bg-[#f5df94]': player.golden_glove,
          }
        )}
      >
        {player.overall}
      </div>
    </div>
  );
};

export default EntryItem;
