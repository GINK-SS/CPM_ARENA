const LoadingText = ({ text }: { text: string }) => {
  return (
    <div className='flex h-[100vh] select-none items-center justify-center'>
      <div className='flex items-center justify-center gap-10 mobileL:gap-20'>
        <span className='inline-block h-18 w-18 animate-spin rounded-full border-4 border-white border-b-transparent mobileL:h-24 mobileL:w-24 mobileL:border-5' />

        <span className='block indent-2 text-15 tracking-[2px] mobileL:text-20'>{text}</span>
      </div>
    </div>
  );
};

export default LoadingText;
