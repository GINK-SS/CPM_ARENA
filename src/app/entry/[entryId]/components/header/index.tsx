import Image from 'next/image';
import Link from 'next/link';
import { IoMailOutline } from 'react-icons/io5';

import OverallFilter from './overall-filter';
import Menu from './menu';

export default async function Header() {
  const version = await fetch('https://api.github.com/repos/gink-ss/CPM_ARENA/releases/latest').then((res) =>
    res.json()
  );

  return (
    <div className='sticky top-0 z-20 border-b-1 border-b-slate-400/40 bg-black/70 backdrop-blur'>
      <div className='mobileL:px-30 mx-auto flex max-w-[1280px] items-center justify-between px-15 py-15'>
        <div data-role='title' className='flex items-end gap-10'>
          <Link href='/'>
            <Image
              src={'/assets/main-logo.svg'}
              alt='main'
              width={220}
              height={30}
              sizes='250px'
              className='mobileL:w-[250px] mobileL:h-auto'
              priority
            />
          </Link>
          <div className='hidden text-slate-400 tablet:block'>{version.name}</div>
        </div>

        <div data-role='options' className='hidden items-center justify-end tablet:flex'>
          <OverallFilter />

          <div className='ml-20 flex h-25 items-center border-l border-l-slate-200/20 pl-10'>
            <Link
              href='mailto:gink.ss00@gmail.com'
              className='rounded-full p-10 text-slate-300 duration-150 hover:bg-slate-300/30 hover:text-slate-100'
            >
              <IoMailOutline className='text-25' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
