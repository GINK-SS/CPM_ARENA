'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import useTeamStore from './stores/team';
import usePlayerStore from './stores/player';
import Loading from './components/loading';
import Background from './components/background';

const Init = ({ children }: { children: ReactNode }) => {
  const { fetchAllHitters, fetchAllPitchers } = usePlayerStore();
  const { fetchAllTeams } = useTeamStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const fetchData = async () => {
    await fetchAllTeams();
    await fetchAllHitters();
    await fetchAllPitchers();
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <Background>
      {isLoading ? pathname === '/' ? null : <Loading text='선수 정보를 불러오는 중입니다.' /> : children}
    </Background>
  );
};

export default Init;