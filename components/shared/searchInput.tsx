'use client'

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import pizza from '../../public/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg'
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focus, setFocus] = useState(false)
  return (
    <>
      {/* <div className={'fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30'}></div> */}
      
      <div className={cn('flex flex-1 rounded-2xl justify-between relative h-11 z-30', className)}>
        <Search className='absolute w-5 top-1/2 translate-y-[-50%] left-3 text-gray-400' />
        <input
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className='bg-gray-50 pl-11 outline-none w-[100%] h-full rounded-2xl'
          placeholder='Найти продукт'
        />
        <div className='w-full top-[50px] pr-3 pt-3 pl-3 bg-gray-50 rounded-2xl absolute'>
          <div className='flex items-center p-2 mb-3 rounded-2xl hover:bg-primary/10 cursor-pointer'>
            <Image className='mr-2' height={30} width={30} src={"/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg"} alt=''/>
            <p className='text-[16px] mr-2 '>Пепперони</p>
            <span className='text-[14px] text-gray-400'>2000₸</span>
          </div>
          <div className='flex items-center p-2 mb-3 rounded-2xl hover:bg-primary/10 cursor-pointer'>
            <Image className='mr-2' width={30} src={pizza} alt=''/>
            <p className='text-[16px] mr-2 '>Пепперони</p>
            <span className='text-[14px] text-gray-400'>2000₸</span>
          </div>
        </div>
      </div>
    </>
  );
};
