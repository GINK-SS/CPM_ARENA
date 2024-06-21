'use client';

import { motion } from 'framer-motion';
import MainTitle from './components/home/title';
import Selection from './components/home/selection';
import SubmitBtn from './components/home/submitBtn';
import Footer from './components/home/footer';

export default function Home() {
  return (
    <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <MainTitle />

      <Selection />

      <SubmitBtn />

      <Footer />
    </motion.div>
  );
}
