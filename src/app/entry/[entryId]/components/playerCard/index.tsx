import Image from 'next/image';

import useTeamStore from '@/app/stores/team';
import { TEAMID_TO_SHORTEN } from '@/app/const';

import { isHitter } from '@/app/util/decideType';
import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type PlayerCardProps = {
  player: Hitter | Pitcher | undefined;
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  const { allTeams } = useTeamStore();
  const [pitcherHand, hitterHand] = [player?.hand_type[0], player?.hand_type[2]];
  const imageSrc = !player
    ? ''
    : isHitter(player)
    ? `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_hitter_${hitterHand === '좌' ? 'left' : 'right'}.png`
    : `/assets/player/${TEAMID_TO_SHORTEN[player.team]}_pitcher_${pitcherHand === '좌' ? 'left' : 'right'}.png`;

  return (
    <S.Container>
      <S.Main $imageSrc={imageSrc}>
        {player && (
          <>
            <S.Wrapper>
              <S.Overall>{player.overall}</S.Overall>
              {player.all_star && <Image src={'/assets/all_star.png'} alt='all_star' width={18} height={18} />}
            </S.Wrapper>

            <S.Wrapper>
              <S.Position>{player.position[0]}</S.Position>
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
    </S.Container>
  );
};

export default PlayerCard;
