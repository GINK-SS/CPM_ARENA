'use client';

import { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

type UpdateItemProps = {
  question: string;
  answer: string[];
};

export default function FAQItem({ question, answer }: UpdateItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='border-t-1 border-white/80 leading-[1.3]'>
      <div
        className='group flex cursor-pointer items-center justify-between gap-10 px-0 py-30 mobileL:gap-15 mobileL:px-10'
        onClick={onClick}
      >
        <h3 className='text-18 font-semibold text-white/90 transition-colors duration-200 group-hover:text-white'>
          {question}
        </h3>
        <div className='flex-1 border-1 opacity-10 transition-opacity duration-200 group-hover:opacity-20' />
        {isOpen ? (
          <IoRemoveOutline size={25} className='opacity-80 transition-opacity duration-200 group-hover:opacity-100' />
        ) : (
          <IoAddOutline size={25} className='opacity-80 transition-opacity duration-200 group-hover:opacity-100' />
        )}
      </div>

      {isOpen && (
        <ol className='px-0 pb-30 mobileL:px-10'>
          {answer.map((sentence, idx) => (
            <li key={idx} className='mb-15'>
              <p className='mb-10 text-15 font-medium text-slate-200 opacity-90'>{sentence}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
