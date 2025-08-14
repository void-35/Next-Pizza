'use client';

import { AddToCartValues } from "@/services/dto/cart";
import { ICartItem, ICartState, useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const useCart = (runFetch?: boolean): ICartState => {
    const totalPrice = useCartStore((state) => state.totalPrice);
    const cartItems = useCartStore((state) => state.cartItems);
    const loading = useCartStore((state) => state.loading);
    const getCart = useCartStore((state) => state.getCart);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const updateItemQuantity = useCartStore((state)=>state.updateItemQuantity)
    const deleteCartItem = useCartStore((state)=> state.deleteCartItem)

    const onCountChange = async (id: number, quantity: number, type: 'inc' | 'dec') => {
        const newCount = type == 'inc' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newCount)
    }

    useEffect(() => {
        if (runFetch) {
            getCart();
        }
    }, []);

    return { cartItems, totalPrice, loading, getCart, addCartItem, updateItemQuantity, deleteCartItem, onCountChange };
};
