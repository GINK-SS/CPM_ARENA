import Image from 'next/image';
import Link from 'next/link';
import { IoMailOutline } from 'react-icons/io5';

import OverallFilter from './overall-filter';
import Menu from './menu';

export default async function Header({ overallLimit }: { overallLimit: number }) {
  const version = await fetch('https://api.github.com/repos/gink-ss/CPM_ARENA/releases/latest').then((res) =>
    res.json()
  );

  return (
    <div className='sticky top-0 z-20 border-b-1 border-b-slate-400/40 bg-black/70 backdrop-blur'>
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
                className='mobileL:h-auto mobileL:w-[250px]'
                priority
              />
            </div>
          </Link>
          <div className='hidden text-slate-400 tablet:block'>{version.name}</div>
        </div>

        <div data-role='options' className='hidden items-center justify-end tablet:flex'>
          <OverallFilter overallLimit={overallLimit} />

          <div className='ml-20 flex h-25 items-center border-l border-l-slate-200/20 pl-10'>
            <Link
              aria-label='contact'
              href='mailto:gink.ss00@gmail.com'
              className='rounded-full p-10 text-slate-300 duration-150 hover:bg-slate-300/30 hover:text-slate-100'
            >
              <IoMailOutline className='text-25' />
            </Link>
          </div>
        </div>

        <Menu overallLimit={overallLimit} />
      </div>
    </div>
  );
}
