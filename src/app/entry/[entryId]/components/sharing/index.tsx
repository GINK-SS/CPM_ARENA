'use client';

import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';
import { toJpeg } from 'html-to-image';
import { cn } from '@/app/lib/utils';
import type { Team } from '@/app/stores/team/types';

type SharingProps = {
  year: number;
  selectedTeams: Team[];
};

export default function Sharing({ year, selectedTeams }: SharingProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    const node = document.getElementById('sharing-container');

    if (!node) {
      setIsDownloading(false);
      return;
    }

    const filter = (node: HTMLElement) => {
      const exclusionClassName = 'sharing-remove';

      return !node.classList?.contains(exclusionClassName);
    };

    toJpeg(node, { quality: 0.95, filter, includeQueryParams: true }).then(function (dataUrl) {
      const link = document.createElement('a');

      link.download = `${year}년_${selectedTeams.map((team) => team.id).join('_')}_아레나.jpeg`;
      link.href = dataUrl;
      link.click();
      setIsDownloading(false);
    });
  };

  return (
    <div className='sharing-remove absolute right-10 top-10 z-50'>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(
          'group relative flex aspect-square w-[6vw] items-center justify-center rounded-sm bg-white text-black',
          'shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:bg-white/40 mobileL:w-40 tablet:w-45 laptop:w-55'
        )}
        aria-label='download-image'
      >
        <IoDownloadOutline className='text-[3.5vw] transition-transform duration-200 group-hover:-translate-y-0.5 mobileL:text-22 tablet:text-25 laptop:text-30' />
      </button>
    </div>
  );
}
