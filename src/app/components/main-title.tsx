import Image from 'next/image';

const MainTitle = () => {
  return (
    <div className='mb-20 flex flex-col items-center mobileL:mb-80 laptop:mb-140'>
      <div className='relative h-[min(110px,_13vw)] w-[min(110px,_13vw)]'>
        <Image src='/assets/logo/mainLogo.webp' alt='mainLogo' priority fill sizes='100px' className='rounded-full' />
      </div>

      <div className='flex flex-col items-center'>
        <h1 className='bg-gradient-to-b from-[#eee] from-20% to-[#ed5907] to-100% bg-[length:100%_120%] bg-clip-text text-[min(180px,_20vw)] font-extrabold leading-[0.8] text-transparent'>
          ARENA
        </h1>
        <h1 className='bg-gradient-to-b from-[#eee] from-20% to-[#ed5907] to-100% bg-[length:100%_120%] bg-clip-text text-[min(180px,_20vw)] font-extrabold leading-[0.8] text-transparent'>
          HELPER
        </h1>

        <h2 className='mt-10 border-t-2 indent-[min(23px,_2.4vw)] text-[min(30px,_3.5vw)] font-bold tracking-[min(23px,_2.4vw)] opacity-80'>
          컴투스 프로야구 for 매니저
        </h2>
      </div>
    </div>
  );
};

export default MainTitle;
