'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks';
import { PizzaForm } from './pizza-form';
import toast from 'react-hot-toast';
import { ProductRelations } from '@/@types/prisma';
import { ProductForm } from './product-form';

interface Props {
    className?: string;
    product: ProductRelations;
    onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({ className, product, onSubmit: _onSubmit }) => {
    const firstProduct = product.variants[0]
    const isPizza = Boolean(firstProduct.pizzaType)

    const { addCartItem, loading } = useCart()

    const onSubmit = async (variantId?: number, ingredientsIds?: number[]) => {
        try {
            const itemId = variantId ?? firstProduct.id
            await addCartItem({
                variantId: itemId,
                ingredientsIds,
            })
            toast.success('Товар добавлен в корзину');
            _onSubmit?.()
        } catch (error) {
            toast.error('Произошла ошибка при добавлении в корзину');
            console.error(error);
        }

    }
    if (isPizza) {
        return (
            <PizzaForm
                name={product.name}
                imageUrl={product.imageUrl}
                variants={product.variants}
                ingredients={product.ingredients}
                loading={loading}
                onClickAdd={onSubmit}
            />
        )
    } else {
        return (
            <ProductForm
                name={product.name}
                imageUrl={product.imageUrl}
                price={firstProduct.price}
                loading={loading}
                onSubmit={onSubmit}
            />
        );
    }

};