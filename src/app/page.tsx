'use client';

import { motion } from 'framer-motion';

import MainTitle from './components/main-title';
import Selection from './components/selection';
import SubmitBtn from './components/submit-button';
import Footer from './components/footer';

export default function Home() {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='px-5 py-20 mobileL:px-10'
    >
      <MainTitle />

      <Selection />

      <SubmitBtn />

      <Footer />
    </motion.div>
  );
}
