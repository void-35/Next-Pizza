import React from 'react';
import { cn } from '@/lib/utils';
import { WhiteBlock } from '../white-block';
import { CartItemSkeleton } from '../skeletons/cart-item-skeleton';
import { ICartItem } from '@/store/cart';
import { PizzaSizes, PizzaTypes } from '@/constants/pizza';
import { getCartItemDetails } from '@/lib';
import { CartItem } from '../cart-item';

interface Props {
    className?: string;
    loading: boolean;
    cartItems: ICartItem[]
    deleteCartItem: (id: number) => Promise<void>
    onCountChange: ((id: number, quantity: number, type: "inc" | "dec") => Promise<void>) | undefined
}

export const CheckoutCartBlock: React.FC<Props> = ({ className, loading, cartItems, deleteCartItem, onCountChange }) => {
    return (
        <WhiteBlock className={cn(className)} title='1. Корзина'>
            <div className='flex flex-col gap-5'>
                {
                    loading ?
                        [...Array(3)].map((_, id) => <CartItemSkeleton key={id} />) :
                        cartItems.map((item) => (
                            <CartItem
                                id={item.id}
                                key={item.id}
                                imageUrl={item.imageUrl}
                                details={getCartItemDetails(
                                    item.pizzaSize as PizzaSizes,
                                    item.pizzaType as PizzaTypes,
                                    item.ingredients
                                )}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                disable={item.disable}
                                loading={item.loading}
                                removeCartItem={deleteCartItem}
                                onClickCountButton={(type) => { onCountChange?.(item.id, item.quantity, type) }}
                            />
                        ))
                }
            </div>
        </WhiteBlock>
    );
};