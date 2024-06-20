import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';

import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

const PlayerSimpleInfo = () => {
  const { selectedPlayer, showDetail } = usePlayerStore();
  const { allTeams } = useTeamStore();

  const onDetailClick = () => {
    showDetail();
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          ARENA <span>선수 정보</span>
        </S.HeaderLeft>

        <S.RecordWrapper>
          <S.Record $value={selectedPlayer?.all_star ? 'A' : ''}>A</S.Record>
          <S.Record $value={selectedPlayer?.golden_glove ? 'G' : ''}>G</S.Record>
          <S.Record $value={selectedPlayer?.mvp_korea || selectedPlayer?.mvp_league ? 'M' : ''}>M</S.Record>
        </S.RecordWrapper>
      </S.Header>

      <S.Content>
        {selectedPlayer && (
          <>
            <S.NameWrapper>
              <S.Logo>
                <Image
                  src={allTeams.find((team) => team.id === selectedPlayer.team)?.logo ?? ''}
                  alt={selectedPlayer.team}
                  layout='fill'
                  style={{ filter: 'drop-shadow(2px 2px 0 #333)' }}
                />
              </S.Logo>
              <S.Name>{`'${selectedPlayer.year.toString().slice(2)} ${selectedPlayer.name}`}</S.Name>
            </S.NameWrapper>

            <S.Overall>{selectedPlayer.overall}</S.Overall>

            <S.StatContainer>
              <S.StatWrapper>
                <S.StatName>{isHitter(selectedPlayer) ? '타격' : '변화'}</S.StatName>
                <S.StatValue $stat={isHitter(selectedPlayer) ? selectedPlayer.batting_all : selectedPlayer.pitch_all}>
                  {isHitter(selectedPlayer) ? selectedPlayer.batting_all : selectedPlayer.pitch_all}
                </S.StatValue>
              </S.StatWrapper>
              <S.StatWrapper>
                <S.StatName>{isHitter(selectedPlayer) ? '장타' : '제구'}</S.StatName>
                <S.StatValue $stat={isHitter(selectedPlayer) ? selectedPlayer.long_all : selectedPlayer.control_all}>
                  {isHitter(selectedPlayer) ? selectedPlayer.long_all : selectedPlayer.control_all}
                </S.StatValue>
              </S.StatWrapper>
              <S.StatWrapper>
                <S.StatName>{isHitter(selectedPlayer) ? '선구' : '구위'}</S.StatName>
                <S.StatValue $stat={isHitter(selectedPlayer) ? selectedPlayer.eye_all : selectedPlayer.stuff_all}>
                  {isHitter(selectedPlayer) ? selectedPlayer.eye_all : selectedPlayer.stuff_all}
                </S.StatValue>
              </S.StatWrapper>
              <S.StatWrapper>
                <S.StatName>{isHitter(selectedPlayer) ? '주루' : '멘탈'}</S.StatName>
                <S.StatValue $stat={isHitter(selectedPlayer) ? selectedPlayer.running : selectedPlayer.mental}>
                  {isHitter(selectedPlayer) ? selectedPlayer.running : selectedPlayer.mental}
                </S.StatValue>
              </S.StatWrapper>
              <S.StatWrapper>
                <S.StatName>{isHitter(selectedPlayer) ? '수비' : '체력'}</S.StatName>
                <S.StatValue $stat={isHitter(selectedPlayer) ? selectedPlayer.defense : selectedPlayer.stamina}>
                  {isHitter(selectedPlayer) ? selectedPlayer.defense : selectedPlayer.stamina}
                </S.StatValue>
              </S.StatWrapper>
            </S.StatContainer>

            <S.DetailBtn onClick={onDetailClick}>
              <IoSearchOutline />
            </S.DetailBtn>
          </>
        )}
      </S.Content>
    </S.Container>
  );
};

export default PlayerSimpleInfo;
