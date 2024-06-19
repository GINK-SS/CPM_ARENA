import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import YearSelection from '../../yearSelection';
import TeamSelection from '../../teamSelection';

import * as S from './styles';

const Selection = () => {
  const { isShow: isShowOfYear, selectedYear, setShowYearList } = useYearStore();
  const {
    isPopupActive: isTeamPopupActive,
    allTeams,
    selectedTeams,
    openPopup: openTeamPopup,
    closePopup: closeTeamPopup,
  } = useTeamStore();

  const onTeamList = () => {
    if (!selectedYear) return;

    openTeamPopup();
  };

  useEffect(() => {
    if (selectedTeams.length === 5) closeTeamPopup();
  }, [closeTeamPopup, selectedTeams]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Button $hasData={!!selectedYear} onClick={setShowYearList} $isActive>
          {selectedYear ? `IN ${selectedYear}` : 'YEAR'}
        </S.Button>

        <AnimatePresence>{isShowOfYear && <YearSelection />}</AnimatePresence>
      </S.Wrapper>

      <S.Wrapper>
        <S.Button
          $hasData={selectedTeams.length === 5}
          onClick={onTeamList}
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
                    layout='fill'
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
