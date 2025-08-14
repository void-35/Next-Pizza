'use client'

import React from 'react';
import { cn } from '@/lib/utils';

export interface Variant {
    name: string
    value: string
    disabled?: boolean
}

interface Props {
    items: readonly Variant[]
    onClick?: (value: Variant['value']) => void;
    selectedVariant: Variant['value']
    className?: string;
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, selectedVariant, className }) => {
    return (
        <div className={cn(className, 'flex justify-between bg-[#e5e5eb] rounded-3xl p-1 mt-4')}>
            {items.map((item, id) => (
                <button
                    key={id}
                    onClick={() => onClick?.(item.value)}
                    className={cn('flex items-center justify-center p-5 rounded-3xl h-[30px] cursor-pointer flex-1 transition-all duration-400', {
                        'bg-white shadow': selectedVariant==item.value,
                        'text-gray-500 pointer-events-none opacity-50': item.disabled
                    })}>
                    {item.name}
                </button>
            ))}
        </div>
    );
};