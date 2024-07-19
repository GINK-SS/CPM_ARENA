'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar color='#F98A58' options={{ showSpinner: false }} />
    </>
  );
};

export default Providers;
