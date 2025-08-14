'use client';

import { useCategoryStore } from '@/store/category';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
    className?: string;
    categories: Category[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
    const { categoryId, setCategoryId } = useCategoryStore()

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xlz overflow-auto max-sm:w-full', className)}>
            {categories.map(({ name, id }) => categories.length > 0 && (
                <a href={`/#${name}`} onClick={() => setCategoryId(id)} className={cn(id == categoryId ? 'shadow-md shadow-gray-200 bg-white text-primary' : '', 'flex items-center font-bold rounded-2xl h-11 px-5')} key={id}>
                    <button>{name}</button>
                </a>
            ))}

        </div>
    );
};