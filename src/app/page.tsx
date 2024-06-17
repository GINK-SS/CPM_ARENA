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
import { motion } from 'framer-motion';

export default function Home() {
  const { isShow: isShowTable } = useTableStore();

  return (
    <HomeLayout>
      {isShowTable ? (
        <TablePosition />
      ) : (
        <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <MainTitle />

          <Selection />

          <SubmitBtn />

          <Footer />
        </motion.div>
      )}
    </HomeLayout>
  );
}
