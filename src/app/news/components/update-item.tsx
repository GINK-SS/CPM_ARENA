'use client';

import { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

type UpdateItemProps = {
  date: string;
  version: string;
  contents: { title: string; descriptions: string[] | null }[];
  isFirst?: boolean;
};

export default function UpdateItem({ date, version, contents, isFirst = false }: UpdateItemProps) {
  const [isOpen, setIsOpen] = useState(isFirst);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='border-t-1 border-white/80 leading-[1.3]'>
      <div
        className='group flex cursor-pointer items-center justify-between gap-10 px-0 py-30 mobileL:gap-15 mobileL:px-10'
        onClick={onClick}
      >
        <h3 className='rounded-md bg-slate-700 px-8 py-3 indent-1 text-22 font-semibold tracking-[1px] text-[#F98A58] transition-colors duration-200 group-hover:bg-slate-600'>{`Ver. ${version}`}</h3>
        <span className='opacity-70 transition-opacity duration-200 group-hover:opacity-85'>{date}</span>
        <div className='flex-1 border-1 opacity-10 transition-opacity duration-200 group-hover:opacity-20' />
        {isOpen ? (
          <IoRemoveOutline size={25} className='opacity-80 transition-opacity duration-200 group-hover:opacity-100' />
        ) : (
          <IoAddOutline size={25} className='opacity-80 transition-opacity duration-200 group-hover:opacity-100' />
        )}
      </div>

      {isOpen && (
        <ol className='px-0 pb-30 mobileL:px-10'>
          {contents.map((content, idx) => (
            <li key={idx} className='mb-15'>
              <h4 className='mb-10 font-medium'>{`${idx + 1}. ${content.title}`}</h4>
              <ul className='ml-20'>
                {content.descriptions &&
                  content.descriptions.map((description) => (
                    <li key={description} className='mb-5 flex gap-5 text-13 text-slate-200 opacity-90 last:mb-0'>
                      <span>•</span>
                      <span>{description}</span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
