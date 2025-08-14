'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { CartItemProps } from './cart-drawer-item';
import { CountButton } from './count-button';
import { X } from 'lucide-react';

export const CartItem: React.FC<CartItemProps> = ({ className, name, id, imageUrl, details, price, quantity, loading, disable, removeCartItem, onClickCountButton }) => {
    return (
        <div className={cn('flex flex-col justify-between', { 'opacity-50 pointer-events-none': disable }, className)}>
            <div className='flex items-center gap-5 flex-1 pb-3 border-b-[1px] border-[rgb(226, 226, 233)]'>
                <img src={imageUrl} className='w-[65px] h-[65px]' />
                <div className='w-[90%]'>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-lg'>{name}</h2>
                        <button onClick={() => { removeCartItem(id) }}>
                            <X className='text-gray-400 cursor-pointer hover:text-gray-600' size={20} />
                        </button>
                    </div>
                    {details && <p className='text-gray-400 text-sm w-[90%]'>{details}</p>}
                </div>

            </div>
            <div className='flex justify-between mt-3'>
                <h2 className='font-bold text-lg'>{price} ₽</h2>

                <div className='flex items-center gap-5 ml-20'>
                    <CountButton loading={loading} count={quantity} changeCount={onClickCountButton} />

                </div>
            </div>

        </div>
    );
};