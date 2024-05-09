'use client';

import { useEffect } from 'react';
import useYearStore from './stores/year';
import usePlayerStore from './stores/player';
import YearSelection from './components/yearSelection';
import TeamSelection from './components/teamSelection';
import TablePosition from './components/tablePosition';

export default function Home() {
  const { selectedYear, isShow: isYearShow, setShowYearList } = useYearStore();
  const {
    isShow: isTeamShow,
    selectedTeams,
    allHitters,
    allPitchers,
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

      <div style={{ display: 'flex' }}>
        {selectedTeams.map((team, idx) => {
          return (
            <>
              <h1>{team}</h1>
              <div key={idx}>
                <TablePosition
                  key={idx}
                  players={allHitters.filter((hitter) => hitter.year === selectedYear && hitter.team === team)}
                  isHitter
                />
              </div>
            </>
          );
        })}
      </div>

      <div style={{ display: 'flex' }}>
        {selectedTeams.map((team, idx) => {
          return (
            <div key={idx}>
              <TablePosition
                key={idx}
                players={allPitchers.filter((pitcher) => pitcher.year === selectedYear && pitcher.team === team)}
                isHitter={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
