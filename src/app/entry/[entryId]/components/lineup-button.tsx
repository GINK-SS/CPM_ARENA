'use client';

import classNames from 'classnames';

type LineupButtonProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
  className?: string | object;
  rightSlot?: React.ReactNode;
};

const LineupButton = ({ text, isActive, onClick, className, rightSlot }: LineupButtonProps) => {
  return (
    <button
      className={classNames(
        'flex items-center justify-center border-none font-semibold text-white outline-none',
        'aspect-[2.2/1] w-[12vw] text-[2.2vw] mobileL:w-95 mobileL:text-18',
        {
          ['bg-gradient-to-b from-[#a82919] from-20% via-[#761d1b] via-50% to-[#a82919] to-100%']: isActive,
          ['cursor-default bg-gradient-to-b from-[#777] from-20% via-[#333] via-50% to-[#777] to-100%']: !isActive,
        },
        className
      )}
      onClick={onClick}
    >
      <span
        className={classNames({
          ['indent-[0.5vw] tracking-[0.5vw] mobileL:indent-4 mobileL:tracking-[4px]']: text.length > 2,
          ['indent-[2vw] tracking-[2vw] mobileL:indent-15 mobileL:tracking-[15px]']: text.length <= 2,
        })}
      >
        {text}
      </span>
      {rightSlot}
    </button>
  );
};

export default LineupButton;
