'use client'

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import Link from 'next/link';
import { getCartItemDetails } from '@/lib';
import { PizzaSizes, PizzaTypes } from '@/constants/pizza';
import { useCart } from '@/hooks';
import Image from 'next/image';
import { Title } from './title';

interface Props {
    className?: string;
    children: React.ReactElement
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
    const { cartItems, totalPrice, deleteCartItem, onCountChange } = useCart(true);

    return (
        <div className={cn(className)}>
            <Sheet>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent className='flex flex-col w-full bg-[#F4F1EE] p-0 ' >
                    {/* {totalPrice > 0 ? */}
                    <div className='flex flex-col h-full justify-center'>
                        {totalPrice > 0 && (
                            <SheetHeader className='p-6'>
                                <SheetTitle className='font-[400] text-xl text-left'>В корзине <span className='font-bold'>{cartItems.length} товара</span></SheetTitle>
                            </SheetHeader>
                        )}
                        {!totalPrice && (
                            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                                <Image src='/assets/empty-box.png' alt='empty cart' width={120} height={120} />
                                <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
                                <p className='text-center text-neutral-500 mb-5'>
                                    Добавьте хотя бы 1 товар, чтобы совершить заказ
                                </p>
                                <SheetClose asChild>
                                    <Button size={'lg'} className='w-56 h-12 text-base'>
                                        Вернуться назад
                                    </Button>
                                </SheetClose>
                            </div>
                        )}
                        {totalPrice > 0 && (
                            <>
                                <div className='mt-5 overflow-auto flex-1'>
                                    {
                                        cartItems?.map((item) => (
                                            <div key={item.id} className=' mb-2'>
                                                <CartDrawerItem
                                                    name={item.name}
                                                    id={item.id}
                                                    imageUrl={item.imageUrl}
                                                    details={
                                                        getCartItemDetails(
                                                            item.pizzaSize as PizzaSizes,
                                                            item.pizzaType as PizzaTypes,
                                                            item.ingredients
                                                        )}
                                                    price={item.price}
                                                    quantity={item.quantity}
                                                    loading={item.loading}
                                                    disable={item.disable}
                                                    onClickCountButton={(type) => { onCountChange?.(item.id, item.quantity, type) }}
                                                    removeCartItem={deleteCartItem}

                                                />
                                            </div>
                                        ))
                                    }
                                </div>

                                <SheetFooter className='bg-white p-[35px]'>
                                    <div className='flex !flex-col w-full'>
                                        <div className='flex'>
                                            <span className="flex flex-1 text-lg text-neutral-500 mb-5">
                                                Итого:
                                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                            </span>
                                            <span className='text-lg font-bold'> {totalPrice} ₸</span>
                                        </div>
                                        <SheetClose asChild>
                                            <Link href={'/checkout'}>
                                                <Button size={'lg'} className='w-full' type="submit">
                                                    Оформить заказ
                                                    <ArrowLeft className="w-5 absolute right-12" />
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                    </div>
                                </SheetFooter>
                            </>)}
                    </div>
                    <SheetTitle className="sr-only">
                        menu
                    </SheetTitle>

                </SheetContent>
                <SheetDescription className="sr-only">
                    description goes here
                </SheetDescription>
            </Sheet>
        </div>
    );
};