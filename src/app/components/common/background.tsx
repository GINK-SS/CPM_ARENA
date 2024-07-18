import { ReactNode } from 'react';

type BackgroundProps = {
  children: ReactNode;
};

const Background = ({ children }: BackgroundProps) => {
  return (
    <div className='relative min-h-full select-none bg-[url("/assets/hideout.svg")] bg-[length:100px_100px]'>
      {children}
    </div>
  );
};

export default Background;
