import { useCategoryStore } from '@/app/store/category';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

let data = [
    { id: 0, name: 'Пиццы' },
    { id: 1, name: 'Комбо' },
    { id: 2, name: 'Завтраки' },
    { id: 3, name: 'Десерты' },
    { id: 4, name: 'Напитки' }
]

export const Categories: React.FC<Props> = ({ className }) => {
    const { categoryId, setCategoryId } = useCategoryStore()

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {data.map(({name, id}, index) => (
                <a href={`/#${name}`} onClick={()=> setCategoryId(id)} className={cn(id == categoryId ? 'shadow-md shadow-gray-200 bg-white text-primary' : '', 'flex items-center font-bold rounded-2xl h-11 px-5')} key={id}>
                    <button>{name}</button>
                </a>
            ))}

        </div>
    );
};