import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { IoSearchOutline } from 'react-icons/io5';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import InfoBox from '../info-box';
import Stat from './stat';

import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';

type PlayerSimpleInfoProps = {
  player: Hitter | Pitcher | null;
};

const PlayerSimpleInfo = ({ player }: PlayerSimpleInfoProps) => {
  const [showDetail, pinnedPlayer] = usePlayerStore(useShallow((state) => [state.showDetail, state.pinnedPlayer]));
  const allTeams = useTeamStore((state) => state.allTeams);

  const onDetailClick = () => {
    showDetail(player === pinnedPlayer ? 'pinned' : 'selected');
  };

  return (
    <InfoBox
      title='선수 정보'
      headerRight={
        <S.RecordWrapper>
          <S.Record $value={player?.all_star ? 'A' : ''}>A</S.Record>
          <S.Record $value={player?.golden_glove ? 'G' : ''}>G</S.Record>
          <S.Record $value={player?.mvp_korea || player?.mvp_league ? 'M' : ''}>M</S.Record>
        </S.RecordWrapper>
      }
    >
      <S.Content>
        {player && (
          <>
            <S.NameWrapper>
              <S.Logo>
                <Image
                  src={allTeams.find((team) => team.id === player.team)?.logo ?? ''}
                  alt={player.team}
                  fill
                  sizes='25px'
                  style={{ filter: 'drop-shadow(2px 2px 0 #333)' }}
                />
              </S.Logo>
              <S.Name>{`'${player.year.toString().slice(2)} ${player.name}`}</S.Name>
            </S.NameWrapper>

            <S.Overall>{player.overall}</S.Overall>

            <Stat player={player} />

            <S.DetailBtn onClick={onDetailClick}>
              <IoSearchOutline />
            </S.DetailBtn>
          </>
        )}
      </S.Content>
    </InfoBox>
  );
};

export default PlayerSimpleInfo;
