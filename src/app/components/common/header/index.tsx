import Image from 'next/image';
import Link from 'next/link';

import OverallFilter from './overall-filter';
import Menu from './menu';
import Links from './links';
import BuffFilter from './buff-filter';

export default async function Header() {
  const version = await fetch('https://api.github.com/repos/gink-ss/CPM_ARENA/releases/latest', {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <div className='sticky top-0 z-10 border-b-1 border-b-slate-400/40 bg-black/70 backdrop-blur'>
      <div className='mx-auto flex max-w-[1280px] items-center justify-between px-15 py-15 mobileL:px-30'>
        <div data-role='title' className='flex items-end gap-5'>
          <Link href='/'>
            <div className='flex items-center gap-5 mobileL:gap-10'>
              <Image
                src={'/assets/main-image.png'}
                alt='logo'
                width={30}
                height={30}
                sizes='100px'
                priority
                className='drop-shadow-[0_0_1px_#fff]'
              />
              <Image
                src={'/assets/main-logo.svg'}
                alt='main'
                width={180}
                height={30}
                sizes='250px'
                className='h-auto w-auto mobileL:w-[250px]'
                priority
              />
            </div>
          </Link>
          <div className='hidden text-slate-400 tablet:block'>{version.name}</div>
        </div>

        <div data-role='options' className='hidden items-center justify-end tablet:flex'>
          <BuffFilter />

          <OverallFilter />

          <Links />
        </div>

        <Menu />
      </div>
    </div>
  );
}
