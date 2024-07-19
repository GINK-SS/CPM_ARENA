import Image from 'next/image';
import Link from 'next/link';
import { IoMailOutline, IoNewspaperOutline } from 'react-icons/io5';

export default function Links() {
  return (
    <div className='flex h-25 items-center gap-10'>
      <Link
        aria-label='contact'
        href='mailto:gink.ss00@gmail.com'
        className='flex justify-center rounded-full p-10 text-slate-300 duration-150 after:absolute after:bottom-3 after:text-12 after:opacity-0 after:duration-150 after:content-["문의"] hover:bg-slate-300/30 hover:text-slate-100 after:hover:opacity-100'
      >
        <IoMailOutline className='text-25' />
      </Link>

      <Link
        aria-label='news'
        href='/news'
        className='flex justify-center rounded-full p-10 text-slate-300 duration-150 after:absolute after:bottom-3 after:text-12 after:opacity-0 after:duration-150 after:content-["소식"] hover:bg-slate-300/30 hover:text-slate-100 after:hover:opacity-100'
      >
        <IoNewspaperOutline className='text-25' />
      </Link>

      <Link
        aria-label='dcinside'
        href='https://gall.dcinside.com/mgallery/manager'
        target='_blank'
        className='flex justify-center rounded-full p-10 duration-150 after:absolute after:bottom-3 after:text-12 after:opacity-0 after:duration-150 after:content-["컴프매갤러리"] hover:bg-slate-300/30 after:hover:opacity-100'
      >
        <Image
          src={'/assets/dcinside.png'}
          alt='dc'
          sizes='50px'
          width={25}
          height={25}
          className='drop-shadow-[0_0_1px_#fff]'
        />
      </Link>

      <Link
        aria-label='naver-cafe'
        href='https://cafe.naver.com/com2usmanager'
        target='_blank'
        className='flex justify-center rounded-full p-10 duration-150 after:absolute after:bottom-3 after:text-12 after:opacity-0 after:duration-150 after:content-["공식카페"] hover:bg-slate-300/30 after:hover:opacity-100'
      >
        <Image src={'/assets/naver_cafe.webp'} alt='cafe' sizes='50px' width={25} height={25} />
      </Link>
    </div>
  );
}
