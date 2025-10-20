'use client';

import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';
import { toJpeg } from 'html-to-image';
import { cn } from '@/app/lib/utils';

export default function Sharing() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    const node = document.getElementById('sharing-container');

    if (!node) {
      setIsDownloading(false);
      return;
    }

    const filter = (node: HTMLElement) => {
      const exclusionClassName = 'remove-me';
      return !node.classList?.contains(exclusionClassName);
    };

    toJpeg(node, { quality: 0.95, filter }).then(function (dataUrl) {
      const link = document.createElement('a');

      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
      setIsDownloading(false);
    });
  };

  return (
    <div className='remove-me fixed bottom-30 right-30 z-50'>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(
          'group relative flex h-40 w-40 items-center justify-center rounded-sm bg-white text-black',
          'shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:bg-white/40'
        )}
        aria-label='download-image'
      >
        <IoDownloadOutline size={25} className='transition-transform duration-200 group-hover:-translate-y-0.5' />
      </button>
    </div>
  );
}
