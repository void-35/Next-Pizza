import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    src: string;
    size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ className, src, size }) => {
    return (
        <div className={cn('flex items-center justify-center my-auto flex-1 w-full h-[500px] relative max-sm:h-[325px] max-lg:my-5', className)}>
            <img src={src} className={cn('relative top-2 left-2 z-10 transition-all duration-300', {
                'w-[300px] h-[300px]': size == 20,
                'w-[400px] h-[400px]': size == 30,
                'w-[500px] h-[500px]': size == 40,
            },
                {
                    'max-lg:w-[250px] max-lg:h-[250px]': size == 20,
                    'max-lg:w-[320px] max-lg:h-[320px]': size == 30,
                    'max-lg:w-[400px] max-lg:h-[400px]': size == 40,
                },
                {
                    'max-md:w-[200px] max-md:h-[200px]': size == 20,
                    'max-md:w-[268px] max-md:h-[268px]': size == 30,
                    'max-md:w-[325px] max-md:h-[325px]': size == 40,
                }
            )} />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px] max-lg:w-[370px] max-lg:h-[370px] max-md:w-[300px] max-md:h-[300px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px] max-lg:border-gray-300 max-lg:w-[280px] max-lg:h-[280px] max-md:w-[250px] max-md:h-[250px]" />
        </div>
    );
};