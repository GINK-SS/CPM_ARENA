'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import useTeamStore from './stores/team';
import usePlayerStore from './stores/player';
import Loading from './components/common/loading';
import Background from './components/common/background';

const Init = ({ children }: { children: ReactNode }) => {
  const [fetchAllHitters, fetchAllPitchers] = usePlayerStore(
    useShallow((state) => [state.fetchAllHitters, state.fetchAllPitchers])
  );
  const fetchAllTeams = useTeamStore((state) => state.fetchAllTeams);
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
