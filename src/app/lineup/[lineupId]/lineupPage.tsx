'use client';

import TablePosition from '@/app/components/tablePosition';
import NotFound from '@/app/not-found';
import usePlayerStore from '@/app/stores/player';
import useYearStore from '@/app/stores/year';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LineupPage() {
  const { lineupId } = useParams<{ lineupId: string }>();
  const { selectedYear, setYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams, setSelectedTeamsReset } = usePlayerStore();
  const [status, setStatus] = useState('pending');

  const init = () => {
    const paramYear = +lineupId.slice(0, 4);
    const paramTeams = lineupId.slice(4).match(/.{1,2}/g);

    if (isNaN(paramYear) || paramYear < 1982 || paramYear > 2023 || !paramTeams || new Set(paramTeams).size !== 5) {
      setStatus('invalid');
      return;
    }

    if (selectedTeams.length && selectedYear) {
      setStatus('valid');
      return;
    }

    for (let idx = 0; idx < 5; idx += 1) {
      const selectedTeam = allTeams.find((team) => team.shorten === paramTeams[idx]);

      if (!selectedTeam || !selectedTeam.years.includes(paramYear)) {
        setSelectedTeamsReset();
        setStatus('invalid');
        return;
      }

      setTeams({
        id: selectedTeam.id,
        index: idx,
        action: 'ADD',
      });
    }

    setYear(paramYear);
    setStatus('valid');
  };

  useEffect(() => {
    init();
  }, []);

  return status === 'invalid' ? <NotFound /> : status === 'valid' ? <TablePosition /> : null;
}
