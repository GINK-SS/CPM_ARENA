'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import TablePosition from '@/app/components/tablePosition';
import NotFound from '@/app/not-found';
import useTeamStore from '@/app/stores/team';
import useYearStore from '@/app/stores/year';
import { FIRST_YEAR, LAST_YEAR } from '@/app/const';

export default function LineupPage() {
  const { lineupId } = useParams<{ lineupId: string }>();
  const { selectedYear, setYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams, resetTeams } = useTeamStore();
  const [status, setStatus] = useState('pending');

  const init = () => {
    const paramYear = +lineupId.slice(0, 4);
    const paramTeams = lineupId.slice(4).match(/.{1,2}/g);

    if (
      isNaN(paramYear) ||
      paramYear < FIRST_YEAR ||
      paramYear > LAST_YEAR ||
      !paramTeams ||
      new Set(paramTeams).size !== 5
    ) {
      setStatus('invalid');
      return;
    }

    if (selectedTeams.length === 5 && selectedYear) {
      setStatus('valid');
      return;
    }

    for (let idx = 0; idx < 5; idx += 1) {
      const selectedTeam = allTeams.find((team) => team.shorten === paramTeams[idx]);

      if (!selectedTeam || !selectedTeam.years.includes(paramYear)) {
        resetTeams();
        setStatus('invalid');
        return;
      }

      setTeams({
        team: selectedTeam,
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
