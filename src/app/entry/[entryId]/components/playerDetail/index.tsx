import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence } from 'framer-motion';

import useTeamStore from '@/app/stores/team';
import usePlayerStore from '@/app/stores/player';
import { HITTER_STAT, HITTER_STAT_DETAIL, PITCHER_STAT, PITCHER_STAT_DETAIL } from '@/app/const';

import { isHitter } from '@/app/util/decideType';

import * as S from './styles';

const PlayerDetail = () => {
  const [selectedPlayer, isShowDetail, pinnedPlayer] = usePlayerStore(
    useShallow((state) => [state.selectedPlayer, state.isShowDetail, state.pinnedPlayer])
  );
  const allTeams = useTeamStore((state) => state.allTeams);
  const [scale, setScale] = useState(1);
  const player =
    isShowDetail.target === 'pinned' ? pinnedPlayer : isShowDetail.target === 'selected' ? selectedPlayer : null;

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
      {isShowDetail.isShow && player && (
        <S.Container
          style={{ scale, translate: '-50% -50%' }}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <S.Header>
            <S.Overall>{player.overall}</S.Overall>

            <S.NameWrapper>
              <S.TeamWrapper>
                <S.Team>{allTeams.find((team) => team.id === player.team)?.name || ''}</S.Team>
                <S.TeamLogo>
                  <Image
                    src={allTeams.find((team) => team.id === player.team)?.logo || ''}
                    alt={player.team}
                    fill
                    sizes='20px'
                  />
                </S.TeamLogo>
              </S.TeamWrapper>

              <S.Name>{`'${player.year.toString().slice(2)} ${player.name}`}</S.Name>
            </S.NameWrapper>
          </S.Header>

          <S.MiddleContainer>
            {isHitter(player) ? (
              <>
                <S.MainStatContainer>
                  {Object.entries(HITTER_STAT).map((value, index) => (
                    <S.MainStatWrapper key={index}>
                      <span>{value[0]}</span>
                      <S.MainStatValue $stat={player[value[1]] as number}>{player[value[1]]}</S.MainStatValue>
                    </S.MainStatWrapper>
                  ))}
                </S.MainStatContainer>

                <S.MiddleRightContainer>
                  <S.PositionHandTypeWrapper>
                    <S.Position>{player.position}</S.Position>
                    <span>{`(${player.hand_type})`}</span>
                  </S.PositionHandTypeWrapper>

                  <S.RealLogo>
                    <Image src='/assets/logo/cpmRealLogo.webp' alt='logo' fill sizes='120px' />
                  </S.RealLogo>

                  <S.OrderWrapper>
                    <S.OrderNumberWrapper>
                      {player.order_numbers.map((orderNumber) => (
                        <S.OrderNumber key={orderNumber} $orderNumber={orderNumber}>
                          {orderNumber}
                        </S.OrderNumber>
                      ))}
                    </S.OrderNumberWrapper>

                    <S.OrderType $orderType={player.order_type}>
                      {player.order_type !== '클린업' && player.order_type !== '밸런스'
                        ? `${player.order_type}타선`
                        : player.order_type}
                    </S.OrderType>
                  </S.OrderWrapper>
                </S.MiddleRightContainer>
              </>
            ) : (
              <>
                <S.MainStatContainer>
                  {Object.entries(PITCHER_STAT).map((value, index) => (
                    <S.MainStatWrapper key={index}>
                      <span>{value[0]}</span>
                      <S.MainStatValue $stat={player[value[1]] as number}>{player[value[1]]}</S.MainStatValue>
                    </S.MainStatWrapper>
                  ))}
                </S.MainStatContainer>

                <S.MiddleRightContainer>
                  <S.PositionHandTypeWrapper>
                    <S.Position>{player.position}</S.Position>
                    <span>{`(${player.hand_type})`}</span>
                  </S.PositionHandTypeWrapper>

                  <S.PitchesContainer>
                    {setPitchesFourAmount(player.pitches.split(' / ')).map((pitch) => {
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
            {isHitter(player) ? (
              <S.DetailStatContainer>
                {Object.entries(HITTER_STAT_DETAIL).map((value, index) => (
                  <S.DetailStatWrapper key={index}>
                    <S.DetailStatName>{value[0]}</S.DetailStatName>
                    <S.DetailStatValue>{player[value[1]]}</S.DetailStatValue>
                  </S.DetailStatWrapper>
                ))}
              </S.DetailStatContainer>
            ) : (
              <S.DetailStatContainer>
                {Object.entries(PITCHER_STAT_DETAIL).map((value, index) => (
                  <S.DetailStatWrapper key={index}>
                    <S.DetailStatName>{value[0]}</S.DetailStatName>
                    <S.DetailStatValue>{player[value[1]]}</S.DetailStatValue>
                  </S.DetailStatWrapper>
                ))}
              </S.DetailStatContainer>
            )}

            <S.RecordContainer>
              <S.RecordTitle>레코드</S.RecordTitle>

              <S.RecordWrapper>
                {player.all_star && <S.Record $recordName='all_star'>올스타</S.Record>}
                {player.golden_glove && <S.Record $recordName='golden_glove'>골든글러브</S.Record>}
                {(player.mvp_korea || player.mvp_league) && <S.Record $recordName='mvp'>MVP</S.Record>}
              </S.RecordWrapper>
            </S.RecordContainer>
          </S.BottomContainer>
        </S.Container>
      )}
    </AnimatePresence>
  );
};

function setPitchesFourAmount(pitches: string[]) {
  const newPitches = [...pitches];

  for (let num = newPitches.length; num < 4; num += 1) {
    newPitches.push(' ');
  }
  return newPitches;
}

export default PlayerDetail;
