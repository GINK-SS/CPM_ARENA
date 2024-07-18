'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { IoCloseOutline } from 'react-icons/io5';
import { HiEllipsisVertical } from 'react-icons/hi2';

import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

export default function Menu() {
  const [isMenu, openMenu, closeMenu] = useTableStore(
    useShallow((state) => [state.isMenu, state.openMenu, state.closeMenu])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const buttonValueList = [55, 60, 65, 69];
  const limit = searchParams.get('limit');
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit < 55 ? 55 : +limit;

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
    closeMenu();
    router.replace(`${pathname}?limit=${Number(e.currentTarget.value)}`, { scroll: false });
  };

  return (
    <>
      <HiEllipsisVertical className='cursor-pointer text-25 tablet:hidden' onClick={() => openMenu()} />

      {isMenu && (
        <div className='fixed right-12 top-12 z-10 w-full max-w-[300px] rounded-lg bg-slate-800 p-20 text-slate-300 shadow-lg tablet:hidden'>
          <div className='mb-20 flex items-center justify-between border-b-2 border-b-slate-200/10 pb-10'>
            <div className='flex items-center gap-10'>
              <Image
                src={'/assets/main-image.png'}
                alt='logo'
                width={30}
                height={30}
                sizes='100px'
                priority
                className='drop-shadow-[0_0_1px_#fff]'
              />
              <span className='ml-3 block break-all text-25 font-extrabold'>Menu</span>
            </div>

            <button onClick={() => closeMenu()} className='flex items-center justify-center p-4'>
              <IoCloseOutline className='text-25' />
            </button>
          </div>

          <div
            className={classNames('mb-20 border-b-1 border-slate-200/10 pb-20', {
              hidden: !pathname.startsWith('/entry/'),
            })}
          >
            <span className='mb-20 block text-18 font-semibold'>오버롤 설정</span>

            <ul className='flex flex-wrap items-center justify-center gap-5'>
              {buttonValueList.map((value) => (
                <li key={value} className='flex-1'>
                  <button
                    className={classNames(
                      'aspect-square w-full rounded-md border-1 text-15 transition-[color,_background-color,_opacity] duration-200',
                      {
                        'bg-slate-100 font-semibold text-[#e56d36]': value === overallLimit,
                        'text-slate-400 opacity-50 hover:bg-slate-300 hover:text-slate-800 hover:opacity-90':
                          value !== overallLimit,
                      }
                    )}
                    value={value}
                    onClick={onFilterClick}
                  >
                    {value === 55 ? '전체' : `${value} 이상`}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-20 border-b-1 border-slate-200/10 pb-20'>
            <Link href='/news'>
              <button
                className={classNames(
                  'h-40 w-full rounded-lg border-1 p-8 text-slate-200 shadow-sm duration-200',
                  'hover:bg-slate-200 hover:text-slate-800'
                )}
              >
                업데이트 내역 / FAQ
              </button>
            </Link>
          </div>

          <Link aria-label='dcinside' href='https://gall.dcinside.com/mgallery/manager' target='_blank'>
            <button
              className={classNames(
                'mb-10 flex h-40 w-full items-center gap-20 rounded-lg border-1 py-8 pl-40 text-slate-200 shadow-sm duration-200',
                'hover:bg-slate-200 hover:text-slate-800'
              )}
            >
              <Image src={'/assets/dcinside.png'} alt='dc' sizes='50px' width={25} height={25} />
              디시 컴프매 갤러리
            </button>
          </Link>

          <Link aria-label='naver-cafe' href='https://cafe.naver.com/com2usmanager' target='_blank'>
            <button
              className={classNames(
                'flex h-40 w-full items-center gap-20 rounded-lg border-1 py-8 pl-40 text-slate-200 shadow-sm duration-200',
                'hover:bg-slate-200 hover:text-slate-800'
              )}
            >
              <Image src={'/assets/naver_cafe.webp'} alt='cafe' sizes='50px' width={25} height={25} />
              네이버 공식카페
            </button>
          </Link>

          <div className='mt-20 flex items-center justify-between border-t border-slate-200/10 pt-20'>
            <span className='font-semibold'>Contact.</span>

            <Link href='mailto:gink.ss00@gmail.com'>
              <button
                className={classNames(
                  'flex items-center rounded-lg border-1 p-8 text-slate-200 shadow-sm duration-200',
                  'hover:bg-slate-200 hover:text-slate-800'
                )}
              >
                gink.ss00@gmail.com
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
