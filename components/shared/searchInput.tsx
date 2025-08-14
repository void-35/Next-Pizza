'use client'

import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import pizza from '../../public/assets/Pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.jpg'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useProducts } from '@/store/product';
import { search } from '@/services/products';
import { useDebounce } from 'react-use';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focus, setFocus] = useState(false)
  const { items, setItems } = useProducts()
  const [searchText, setSearchText] = useState('')
  useDebounce(() => {
    async function getProducts() {
      const data = await search(searchText)
      console.log(data)
      setItems(data)
    }
    getProducts()
  }, 250, [searchText])

  const onLink = ()=>{
    setItems([])
    setSearchText('')
  } 

  return (
    <>
      {focus ? <div className={'fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30'}></div> : ''}

      <div className={cn('flex flex-1 rounded-2xl justify-between relative h-11 z-30', className)}>
        <Search className='absolute w-5 top-1/2 translate-y-[-50%] left-3 text-gray-400' />
        <input
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className='bg-gray-50 pl-11 outline-none w-[100%] h-full rounded-2xl'
          placeholder='Найти продукт'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {items.length > 0 &&
          <div className={cn('w-full max-h-[300px] top-[52px] overflow-auto transition-all duration-200 invisible opacity-0 pr-3 pt-3 pl-3 bg-gray-50 rounded-2xl absolute',
            focus && "opacity-100 visible top-[50px]")}>
            {items.map((item, id) => (
              <Link href={`/product/${id}`} key={id} onClick={onLink}>
                <div className='flex items-center p-2 mb-3 rounded-2xl hover:bg-primary/10 cursor-pointer'>
                  <Image className='mr-2' height={30} width={30} src={item.imageUrl} alt='' />
                  <p className='text-[16px] mr-2 '>{item.name}</p>
                  <span className='mt-[2px] text-[14px] text-gray-400'>{`${item.variants[0].price}₸`}</span>
                </div>
              </Link>
            ))}
          </div>
        }
      </div>
    </>
  );
};
