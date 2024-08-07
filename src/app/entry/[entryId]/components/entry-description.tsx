import classNames from 'classnames';

const descriptionList = ['올스타', '골든 글러브', 'MVP', '오버롤 80 이상'];

export default function EntryDescription() {
  return (
    <div className='flex w-full justify-around gap-2 border-t-2 border-t-black px-1 mobileL:px-0 tablet:gap-3 tablet:border-t-3'>
      {descriptionList.map((description) => (
        <div
          className={classNames(
            'flex-1 py-9 text-center indent-1 text-10 font-semibold tracking-[1px]',
            'mobileL:py-13 mobileL:indent-2 mobileL:text-15 mobileL:tracking-[2px] tablet:text-17',
            'first:bg-[#f0c2bd] last:text-[#1b1588] [&:nth-child(-n+2)]:text-black [&:nth-child(2)]:bg-[#f5df94] [&:nth-child(3)]:text-[#ca4142] [&:nth-last-child(-n+2)]:bg-white'
          )}
          key={description}
        >
          {description}
        </div>
      ))}
    </div>
  );
}
