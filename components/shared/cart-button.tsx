'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks';
import { Icons } from './spin-icon';
import { CartDrawer } from './cart-drawer';

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    const { totalPrice, loading, cartItems } = useCart()
    return (
        <CartDrawer>
            <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
                <b className='max-sm:hidden'>{totalPrice} ₸</b>
                <span className='h-full w-[1px] bg-white/30 mx-3 max-sm:hidden'></span>
                <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                    <ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
                    {
                        loading ? <Icons.spinner className="h-4 w-4 animate-spin" /> :<b>{cartItems.length}</b>
                    }
                    
                </div>
                <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </CartDrawer>
    );
};