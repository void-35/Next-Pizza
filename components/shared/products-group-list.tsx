"use client"

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCard } from './productCard';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/app/store/category';

interface Props {
    className?: string;
    title: string;
    items: any[]
    categoryId: number
    listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({ className, title, items, categoryId, listClassName }) => {
    const ref = useRef<HTMLDivElement>(null)
    const intersection = useIntersection(ref, {
        threshold: 0.4
    });
    const { setCategoryId } = useCategoryStore()
    
    useEffect(()=>{
        if(intersection?.isIntersecting){
            setCategoryId(categoryId)
        }
    },[intersection?.isIntersecting, categoryId, title])
    return (
        <div className={className} id={title}>
            <Title text={title} size='lg' className='font-extrabold' />
            <div ref={ref} className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.filter((item)=>item.categoryId==categoryId).map((item, id) => (
                    <ProductCard
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.variants[0].price}
                        id={item.id}
                        key={item.id}
                    />
                ))}
            </div>
        </div>
    );
};