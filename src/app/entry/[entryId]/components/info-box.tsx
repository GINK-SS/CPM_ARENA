import { ReactNode } from 'react';

type InfoBoxProps = {
  headerRight?: ReactNode;
  title: string;
  children: ReactNode;
};

const InfoBox = ({ headerRight = null, title, children }: InfoBoxProps) => {
  return (
    <div className='mt-2 flex w-full flex-col items-center justify-between bg-gradient-to-tr from-black to-[#111] px-1 tablet:mt-3'>
      <div className='flex w-full items-center justify-between border-1 border-[#333] border-b-black border-l-[#ff1e1e] bg-gradient-to-r from-[#ff1e1e] from-0% via-black via-15% to-[#333] to-90%'>
        <span className='flex items-center py-5 pl-40 text-12 font-semibold text-[#ff1e1e] mobileL:pl-50'>
          ARENA <span className='ml-5 text-11 text-white'>{title}</span>
        </span>

        {headerRight}
      </div>

      <div className='w-full border-1 border-t-0 border-[#333] p-3 tablet:p-7'>{children}</div>
    </div>
  );
};

export default InfoBox;
