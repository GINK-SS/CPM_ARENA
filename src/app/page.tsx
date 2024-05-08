'use client';

import { useEffect } from 'react';
import useYearStore from './stores/year';
import usePlayerStore from './stores/player';
import YearSelection from './components/yearSelection';
import TeamSelection from './components/teamSelection';

export default function Home() {
  const { selectedYear, isShow: isYearShow, setShowYearList } = useYearStore();
  const {
    isShow: isTeamShow,
    selectedTeams,
    setShowTeamList,
    fetchAllTeams,
    fetchAllHitters,
    fetchAllPitchers,
  } = usePlayerStore();

  useEffect(() => {
    fetchAllTeams();
    fetchAllHitters();
    fetchAllPitchers();
  }, []);

  const onYearList = () => {
    setShowYearList();
  };

  const onTeamList = () => {
    setShowTeamList();
  };

  return (
    <div>
      <button onClick={onYearList}>연도 선택</button>
      <span>{selectedYear ?? '연도를 선택해주세요.'}</span>

      <button onClick={onTeamList}>팀 선택</button>
      {selectedTeams.map((team, index) => (
        <span key={index}>{team}</span>
      ))}

      {isYearShow && <YearSelection />}
      {isTeamShow && <TeamSelection />}
    </div>
  );
}
