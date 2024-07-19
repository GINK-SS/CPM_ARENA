'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import useCommonStore from '@/app/stores/common';

const Loading = () => {
  const isLoading = useCommonStore((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    isLoading && (
      <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50'>
        <span className='absolute inline-block h-48 w-48 animate-spin rounded-full border-2 border-transparent border-b-white border-r-white [mask-image:linear-gradient(transparent,_rgba(0,_0,_0,_1))]' />
        <Image src='/assets/loading_ball.png' alt='loading' sizes='120px' width={40} height={40} priority />
      </div>
    )
  );
};

export default Loading;
