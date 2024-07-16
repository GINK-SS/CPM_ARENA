import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex h-[100vh] select-none flex-col items-center justify-center gap-20'>
      <div className='flex items-center justify-center gap-20 text-15 font-light'>
        <span className='block border-r-1 border-r-[#ffffff30] pr-20 indent-2 text-25 font-normal leading-50 tracking-[2px]'>
          404
        </span>
        <p>여기서는 아레나를 도와줄 수 없어요.</p>
      </div>

      <Link href={'/'}>
        <button className='border-1 border-[#eee] bg-[#333] px-130 py-10 indent-2 text-14 tracking-[2px] text-white transition-colors duration-200 hover:bg-[#222]'>
          HOME
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
