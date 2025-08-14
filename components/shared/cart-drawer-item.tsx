'use client'

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CountButton } from './count-button';
import { Ingredient } from '@prisma/client';
import { Trash2Icon } from 'lucide-react';

export interface CartItemProps {
    className?: string;
    id: number;
    imageUrl: string;
    name: string;
    ingredients?: Ingredient[];
    details: string;
    price: number;
    quantity: number;
    loading?: boolean;
    disable?: boolean;
    removeCartItem: (id: number) => void;
    onClickCountButton: (type: 'inc' | 'dec')=>void 
}

export const CartDrawerItem: React.FC<CartItemProps> = ({ className, name, id, imageUrl, details, price, quantity, loading, disable, removeCartItem, onClickCountButton }) => {
    return (
        <div className={cn(className, 'bg-white p-5 pr-6 w-full', {'opacity-50 pointer-events-none': disable})}>
            <div className='flex gap-6'>
                <img src={imageUrl} className='w-[65px] h-[65px]' />
                <div className='flex-col w-full'>
                    <div>
                        <h2 className='font-bold text-lg'>{name}</h2>
                        {details && <p className='text-gray-400 text-sm'>{details}</p>}
                    </div>
                    <hr className='mt-2 mb-4'></hr>
                    <div className='flex justify-between'>
                        
                        <CountButton loading={loading} count={quantity} changeCount={onClickCountButton} />
                        <div className='flex items-center gap-3'>
                            <h2 className='font-bold text-lg'>{price} ₽</h2>
                            <Trash2Icon className='text-gray-400 cursor-pointer hover:text-gray-600' onClick={()=>{removeCartItem(id)}} size={16}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};