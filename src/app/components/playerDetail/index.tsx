import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import usePlayerStore from '@/app/stores/player';
import { Hitter, Pitcher } from '@/app/stores/player/types';

import * as S from './styles';
import { useEffect, useState } from 'react';

const PlayerDetail = () => {
  const { selectedPlayer, selectedPlayerComponentId, allTeams } = usePlayerStore();
  const hitterStat = {
    타격: 'batting_all',
    장타: 'long_all',
    선구: 'eye_all',
    주루: 'running',
    수비: 'defense',
  };
  const pitcherStat = {
    변화: 'pitch_all',
    제구: 'control_all',
    구위: 'stuff_all',
    멘탈: 'mental',
    체력: 'stamina',
  };
  const hitterStatDetail = {
    '타격(우투)': 'batting_right',
    '장타(우투)': 'long_right',
    '타격(좌투)': 'batting_left',
    '장타(좌투)': 'long_left',
    '타격(언더)': 'batting_under',
    '장타(언더)': 'long_under',
  };
  const pitcherStatDetail = {
    '변화(우타)': 'pitch_right',
    '변화(좌타)': 'pitch_left',
    '제구(우타)': 'control_right',
    '제구(좌타)': 'control_left',
    '구위(우타)': 'stuff_right',
    '구위(좌타)': 'stuff_left',
  };

  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      setScale(
        window.innerWidth <= 416
          ? 0.5
          : window.innerWidth <= 470
          ? 0.6
          : window.innerWidth <= 560
          ? 0.7
          : window.innerWidth <= 660
          ? 0.8
          : window.innerWidth <= 726
          ? 0.9
          : 1
      );
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {selectedPlayer && (
        <S.Container
          layoutId={selectedPlayerComponentId}
          // initial={{ scale }}
          // animate={{ scale }}
          style={{ scale, translate: '-50% -50%' }}
        >
          <S.Header>
            <S.Overall>{selectedPlayer.overall}</S.Overall>

            <S.NameWrapper>
              <S.TeamWrapper>
                <S.Team>{allTeams.find((team) => team.id === selectedPlayer.team)?.name || ''}</S.Team>
                <S.TeamLogo>
                  <Image
                    src={allTeams.find((team) => team.id === selectedPlayer.team)?.logo || ''}
                    alt={selectedPlayer.team}
                    layout='fill'
                  />
                </S.TeamLogo>
              </S.TeamWrapper>

              <S.Name>{`'${selectedPlayer.year.toString().slice(2)} ${selectedPlayer.name}`}</S.Name>
            </S.NameWrapper>
          </S.Header>

          <S.MiddleContainer>
            {isHitter(selectedPlayer) ? (
              <>
                <S.MainStatContainer>
                  {Object.entries(hitterStat).map((value, index) => (
                    <S.MainStatWrapper key={index}>
                      <span>{value[0]}</span>
                      <S.MainStatValue $stat={selectedPlayer[value[1]]}>{selectedPlayer[value[1]]}</S.MainStatValue>
                    </S.MainStatWrapper>
                  ))}
                </S.MainStatContainer>

                <S.MiddleRightContainer>
                  <S.PositionHandTypeWrapper>
                    <S.Position>{selectedPlayer.position}</S.Position>
                    <span>{`(${selectedPlayer.hand_type})`}</span>
                  </S.PositionHandTypeWrapper>

                  <S.RealLogo>
                    <Image src='/assets/logo/cpmRealLogo.webp' alt='logo' layout='fill' />
                  </S.RealLogo>

                  <S.OrderWrapper>
                    <S.OrderNumberWrapper>
                      {selectedPlayer.order_numbers.map((orderNumber) => (
                        <S.OrderNumber key={orderNumber} $orderNumber={Number(orderNumber)}>
                          {orderNumber}
                        </S.OrderNumber>
                      ))}
                    </S.OrderNumberWrapper>

                    <S.OrderType $orderType={selectedPlayer.order_type}>
                      {selectedPlayer.order_type !== '클린업' && selectedPlayer.order_type !== '밸런스'
                        ? `${selectedPlayer.order_type}타선`
                        : selectedPlayer.order_type}
                    </S.OrderType>
                  </S.OrderWrapper>
                </S.MiddleRightContainer>
              </>
            ) : (
              <>
                <S.MainStatContainer>
                  {Object.entries(pitcherStat).map((value, index) => (
                    <S.MainStatWrapper key={index}>
                      <span>{value[0]}</span>
                      <S.MainStatValue $stat={selectedPlayer[value[1]]}>{selectedPlayer[value[1]]}</S.MainStatValue>
                    </S.MainStatWrapper>
                  ))}
                </S.MainStatContainer>

                <S.MiddleRightContainer>
                  <S.PositionHandTypeWrapper>
                    <S.Position>{selectedPlayer.position}</S.Position>
                    <span>{`(${selectedPlayer.hand_type})`}</span>
                  </S.PositionHandTypeWrapper>

                  <S.PitchesContainer>
                    {setPitchesFourAmount(selectedPlayer.pitches.split(' / ')).map((pitch) => {
                      const [arsenal, grade] = pitch.split(' ');

                      return (
                        <S.PitchesWrapper key={pitch}>
                          <span>{arsenal}</span>
                          <S.ArsenalGrade $grade={grade}>{grade}</S.ArsenalGrade>
                        </S.PitchesWrapper>
                      );
                    })}
                  </S.PitchesContainer>
                </S.MiddleRightContainer>
              </>
            )}
          </S.MiddleContainer>

          <S.BottomContainer>
            {isHitter(selectedPlayer) ? (
              <S.DetailStatContainer>
                {Object.entries(hitterStatDetail).map((value, index) => (
                  <S.DetailStatWrapper key={index}>
                    <S.DetailStatName>{value[0]}</S.DetailStatName>
                    <S.DetailStatValue>{selectedPlayer[value[1]]}</S.DetailStatValue>
                  </S.DetailStatWrapper>
                ))}
              </S.DetailStatContainer>
            ) : (
              <S.DetailStatContainer>
                {Object.entries(pitcherStatDetail).map((value, index) => (
                  <S.DetailStatWrapper key={index}>
                    <S.DetailStatName>{value[0]}</S.DetailStatName>
                    <S.DetailStatValue>{selectedPlayer[value[1]]}</S.DetailStatValue>
                  </S.DetailStatWrapper>
                ))}
              </S.DetailStatContainer>
            )}

            <S.RecordContainer>
              <S.RecordTitle>레코드</S.RecordTitle>

              <S.RecordWrapper>
                {selectedPlayer.all_star && <S.Record $recordName='all_star'>올스타</S.Record>}
                {selectedPlayer.golden_glove && <S.Record $recordName='golden_glove'>골든글러브</S.Record>}
                {(selectedPlayer.mvp_korea || selectedPlayer.mvp_league) && <S.Record $recordName='mvp'>MVP</S.Record>}
              </S.RecordWrapper>
            </S.RecordContainer>
          </S.BottomContainer>
        </S.Container>
      )}
    </AnimatePresence>
  );
};

function isHitter(player: Hitter | Pitcher): player is Hitter {
  const hitterPositionList = ['포수', '1루수', '2루수', '3루수', '유격수', '외야수'];

  return hitterPositionList.includes(player.position);
}

function setPitchesFourAmount(pitches: string[]) {
  const newPitches = [...pitches];

  for (let num = newPitches.length; num < 4; num += 1) {
    newPitches.push(' ');
  }
  return newPitches;
}

export default PlayerDetail;
