import Image from 'next/image';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import YearSelection from './yearSelection';
import TeamSelection from './teamSelection';

import * as S from './styles';

const Selection = () => {
  const { isPopupActive: isYearPopupActive, selectedYear, openPopup: openYearPopup } = useYearStore();
  const {
    isPopupActive: isTeamPopupActive,
    allTeams,
    selectedTeams,
    openPopup: openTeamPopup,
    closePopup: closeTeamPopup,
  } = useTeamStore();

  useEffect(() => {
    if (selectedTeams.length === 5) {
      closeTeamPopup();
    }
  }, [closeTeamPopup, selectedTeams]);

  const onTeamClick = () => {
    if (!selectedYear) return;

    openTeamPopup();
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Button $hasData={!!selectedYear} onClick={openYearPopup} $isActive>
          {selectedYear ? `IN ${selectedYear}` : 'YEAR'}
        </S.Button>

        <AnimatePresence>{isYearPopupActive && <YearSelection />}</AnimatePresence>
      </S.Wrapper>

      <S.Wrapper>
        <S.Button
          $hasData={selectedTeams.length === 5}
          onClick={onTeamClick}
          $isActive={!!selectedYear}
          disabled={!selectedYear}
        >
          {selectedTeams.length ? (
            <S.LogoWrapper>
              {selectedTeams.map((selectedTeam, idx) => (
                <S.Logo key={idx}>
                  <Image
                    src={allTeams.find((team) => team.id === selectedTeam.id)?.logo || ''}
                    alt={allTeams.find((team) => team.id === selectedTeam.id)?.id || ''}
                    fill
                    sizes='45px'
                    style={{ filter: 'drop-shadow(3px 3px 0 #333)' }}
                  />
                </S.Logo>
              ))}
            </S.LogoWrapper>
          ) : (
            'TEAM'
          )}
        </S.Button>

        <AnimatePresence>{isTeamPopupActive && <TeamSelection />}</AnimatePresence>
      </S.Wrapper>
    </S.Container>
  );
};

export default Selection;
