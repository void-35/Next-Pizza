import React from 'react';
import { cn } from '@/lib/utils';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { GroupVariants } from './group-variants';
import { Button } from '../ui';

interface Props {
    className?: string;
    loading: boolean;
    name: string;
    imageUrl: string;
    price: number;
    onSubmit: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ className, name, imageUrl, price, onSubmit, loading }) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className={cn('flex items-center justify-center flex-1 w-full relative max-lg:hidden', className)}>
                <img src={imageUrl} className={cn('relative top-2 left-2 z-10 transition-all duration-300 w-[400px] h-[400px]')} />
            </div>
            <div className="w-[490px] bg-[#f5f3f3] p-7 pt-10 max-lg:w-full max-lg:bg-white">
                <Title text={name} size="md" className="font-extrabold mb-1 w-[80%]" />
                <img src={imageUrl} className={cn('relative top-2 left-2 z-10 transition-all duration-300 mx-auto w-[60%] lg:hidden')} />

                <Button loading={loading} onClick={()=>onSubmit?.()} className='h-[55px] text-base px-10 rounded-[18px] w-[100%] mt-10'>
                    Добавить в корзину за {price} ₸
                </Button>
            </div>
        </div>
    );
};