import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';
import { BUFF_LIST, TEAMID_TO_SHORTEN } from '@/app/const';

import { isHitter } from '@/app/util/decideType';
import { Hitter, HitterPosition, Pitcher, PitcherPosition } from '@/app/stores/player/types';
import { Records } from '@/app/stores/buff/types';

import * as S from './styles';

type PlayerCardProps = {
  card: {
    position: HitterPosition | PitcherPosition | null;
    player: Hitter | Pitcher | null;
  };
};

const PlayerCard = ({ card: { position, player } }: PlayerCardProps) => {
  const [allTeams, selectedTeams] = useTeamStore(useShallow((state) => [state.allTeams, state.selectedTeams]));
  const [selectedPlayer, pinnedPlayer, setSelectedPlayer, setPinnedPlayer] = usePlayerStore(
    useShallow((state) => [state.selectedPlayer, state.pinnedPlayer, state.setSelectedPlayer, state.setPinnedPlayer])
  );
  const currentBuff = useBuffStore((state) => state.currentBuff);
  const [pitcherHand, hitterHand] = [player?.hand_type[0], player?.hand_type[2]];
  const imageSrc = !player
    ? ''
    : isHitter(player)
    ? `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_hitter_${hitterHand === '좌' ? 'left' : 'right'}.png`
    : `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_pitcher_${pitcherHand === '좌' ? 'left' : 'right'}.png`;

  const getCalculatedOverall = (player: Hitter | Pitcher) => {
    let calculatedOverall = player.overall;
    const records: Records[] = ['all_star', 'golden_glove', 'mvp'];
    const teamBuffGradesIdx = BUFF_LIST.team.grades.findLastIndex(
      (grade) => grade <= currentBuff.teams[selectedTeams.findIndex((selectedTeam) => selectedTeam.id === player.team)]
    );

    calculatedOverall += teamBuffGradesIdx === -1 ? 0 : BUFF_LIST.team.gradeValues[teamBuffGradesIdx];
    calculatedOverall += records.reduce((acc, curr) => {
      if (
        (curr === 'all_star' && !player.all_star) ||
        (curr === 'golden_glove' && !player.golden_glove) ||
        (curr === 'mvp' && !(player.mvp_korea || player.mvp_league))
      ) {
        return acc;
      }

      return (
        acc +
        (BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr]) === -1
          ? 0
          : BUFF_LIST[curr].gradeValues[BUFF_LIST[curr].grades.findLastIndex((grade) => grade <= currentBuff[curr])])
      );
    }, 0);

    if (!isHitter(player) && player.position !== position) {
      calculatedOverall -= 3;
    }

    return calculatedOverall;
  };

  const onClick = () => {
    if (!player) return;

    if (pinnedPlayer === player) {
      return;
    }

    if (selectedPlayer === player) {
      if (pinnedPlayer) return;

      setPinnedPlayer(player);
      setSelectedPlayer(null);

      return;
    }

    setSelectedPlayer(player);
  };

  return (
    <S.Container>
      <S.Block
        $isActive={
          pinnedPlayer && !isHitter(pinnedPlayer)
            ? (position === '선발' && pinnedPlayer.position !== '선발') ||
              (position !== '선발' && pinnedPlayer.position === '선발')
              ? true
              : false
            : false
        }
      />

      <S.Card $isActive={!!player} onClick={onClick}>
        <S.BorderBox
          $isSelected={!!selectedPlayer && selectedPlayer === player}
          $isPinned={!!pinnedPlayer && pinnedPlayer === player}
        />

        <S.Main $imageSrc={imageSrc}>
          {player && (
            <>
              <S.Wrapper>
                <S.Overall>{getCalculatedOverall(player)}</S.Overall>
                {player.all_star && <Image src={'/assets/all_star.png'} alt='all_star' width={18} height={18} />}
              </S.Wrapper>

              <S.Wrapper>
                <S.Position>{isHitter(player) ? position![0] : player.position[0]}</S.Position>
                {player.golden_glove && (
                  <Image src={'/assets/golden_glove.png'} alt='golden_glove' width={14} height={14} />
                )}
                {(player.mvp_korea || player.mvp_league) && (
                  <Image src={'/assets/mvp.png'} alt='mvp' width={14} height={14} />
                )}
              </S.Wrapper>
            </>
          )}
        </S.Main>

        <S.TeamWrapper>
          {player && (
            <Image
              src={allTeams.find((team) => team.id === player.team)!.logo}
              alt='logo'
              width={30}
              height={30}
              style={{
                position: 'absolute',
                bottom: '-7px',
                left: '2px',
                filter:
                  'drop-shadow(0px 1px 1px #222) drop-shadow(1px 0px 1px #222) drop-shadow(-1px 0px 1px #222) drop-shadow(0px -1px 1px #222)',
              }}
            />
          )}
          <span>ARENA</span>
        </S.TeamWrapper>

        <S.BottomWrapper>
          {player && (
            <>
              <S.Year>{`'${player.year.toString().slice(2)}`}</S.Year>
              <S.Name $length={player.name.length}>{player.name}</S.Name>
            </>
          )}
        </S.BottomWrapper>
      </S.Card>
    </S.Container>
  );
};

export default PlayerCard;
