import Image from 'next/image';
import classNames from 'classnames';

import base from '@/public/assets/base.png';

type PositionBaseProps = {
  positions: string[];
};

export default function PositionBase({ positions }: PositionBaseProps) {
  const mainPosition = positions[0];

  return (
    <div className='relative aspect-square w-full bg-gray-300/50'>
      <Image src={base} alt='logo' fill sizes='120px' />

      {/* 포수 */}
      <div
        className={classNames(
          'absolute bottom-2 left-1/2 flex aspect-square w-22 -translate-x-1/2 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('포수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '포수',
          })}
        />
      </div>

      {/* 1루수 */}
      <div
        className={classNames(
          'absolute right-13 top-63 flex aspect-square w-22 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('1루수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '1루수',
          })}
        />
      </div>

      {/* 2루수 */}
      <div
        className={classNames(
          'absolute right-18 top-30 flex aspect-square w-22 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('2루수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '2루수',
          })}
        />
      </div>

      {/* 3루수 */}
      <div
        className={classNames(
          'absolute left-13 top-63 flex aspect-square w-22 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('3루수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '3루수',
          })}
        />
      </div>

      {/* 유격수 */}
      <div
        className={classNames(
          'absolute left-18 top-30 flex aspect-square w-22 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('유격수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '유격수',
          })}
        />
      </div>

      {/* 외야수 */}
      <div
        className={classNames(
          'absolute left-1/2 top-5 flex aspect-square w-22 -translate-x-1/2 items-center justify-center rounded-full border border-white bg-[#91260F]/95',
          {
            ['hidden']: !positions.includes('외야수'),
          }
        )}
      >
        <div
          className={classNames('aspect-square w-10 rounded-full bg-white', {
            ['hidden']: mainPosition !== '외야수',
          })}
        />
      </div>
    </div>
  );
}
