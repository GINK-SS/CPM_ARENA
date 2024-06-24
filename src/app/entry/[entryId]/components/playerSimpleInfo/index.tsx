import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import InfoBox from '../infoBox';
import Stat from './stat';

import * as S from './styles';

const PlayerSimpleInfo = () => {
  const { selectedPlayer, showDetail } = usePlayerStore();
  const { allTeams } = useTeamStore();

  const onDetailClick = () => {
    showDetail();
  };

  return (
    <InfoBox
      title='선수 정보'
      headerRight={
        <S.RecordWrapper>
          <S.Record $value={selectedPlayer?.all_star ? 'A' : ''}>A</S.Record>
          <S.Record $value={selectedPlayer?.golden_glove ? 'G' : ''}>G</S.Record>
          <S.Record $value={selectedPlayer?.mvp_korea || selectedPlayer?.mvp_league ? 'M' : ''}>M</S.Record>
        </S.RecordWrapper>
      }
    >
      <S.Content>
        {selectedPlayer && (
          <>
            <S.NameWrapper>
              <S.Logo>
                <Image
                  src={allTeams.find((team) => team.id === selectedPlayer.team)?.logo ?? ''}
                  alt={selectedPlayer.team}
                  fill
                  sizes='25px'
                  style={{ filter: 'drop-shadow(2px 2px 0 #333)' }}
                />
              </S.Logo>
              <S.Name>{`'${selectedPlayer.year.toString().slice(2)} ${selectedPlayer.name}`}</S.Name>
            </S.NameWrapper>

            <S.Overall>{selectedPlayer.overall}</S.Overall>

            <Stat />

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
