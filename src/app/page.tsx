'use client';

import { useEffect } from 'react';
import usePlayerStore from './stores/player';
import useTableStore from './stores/table';
import MainTitle from './components/home/title';
import Selection from './components/home/selection';
import SubmitBtn from './components/home/submitBtn';
import HomeLayout from './components/home/layout';
import TablePosition from './components/tablePosition';
import Footer from './components/footer';
import PlayerDetail from './components/playerDetail';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { fetchAllTeams, fetchAllHitters, fetchAllPitchers } = usePlayerStore();
  const { isShow: isShowTable } = useTableStore();

  useEffect(() => {
    fetchAllTeams();
    fetchAllHitters();
    fetchAllPitchers();
  }, []);

  return (
    <HomeLayout>
      {isShowTable ? (
        <TablePosition />
      ) : (
        <>
          <MainTitle />

          <Selection />

          <SubmitBtn />
        </>
      )}

      <Footer />
    </HomeLayout>
  );
}
