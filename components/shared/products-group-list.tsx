"use client"

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCard } from './productCard';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';
import { ProductRelations } from '@/@types/prisma';

interface Props {
    className?: string;
    title: string;
    items: ProductRelations[];
    categoryId: number
    listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({ className, title, items, categoryId, listClassName }) => {
    const ref = useRef<HTMLDivElement>(null)
    const intersection = useIntersection(ref, {
        threshold: 0.4
    });
    const { setCategoryId } = useCategoryStore()

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setCategoryId(categoryId)
        }
    }, [intersection?.isIntersecting, categoryId, title])
    return (
        <div className={className} id={title}>
            {items.filter((item) => item.categoryId == categoryId).length == 0 ? "" :
                <Title text={title} size='lg' className='font-extrabold mb-3' />
            }
            <div ref={ref} className={cn('grid grid-cols-3 gap-[50px] max-sm:grid-cols-1 max-sm:p-3', listClassName)}>
                {items.filter((item) => item.categoryId == categoryId).map((item, id) => (
                    <ProductCard
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.variants[0].price}
                        ingredients={item.ingredients.map(obj => `${obj.name}`).join(', ')}
                        id={item.id}
                        key={item.id}
                    />
                ))}
            </div>
        </div>
    );
};