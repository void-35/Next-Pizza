import React from 'react';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    price: number;
    ingredients: string;
    desc?: string;
    id: number;
}

export const ProductCard: React.FC<Props> = ({ className, imageUrl, name, price, ingredients, desc, id }) => {
    return (
        <Link href={`/product/${id}`} scroll={false}>
            <div className={cn(className, 'max-sm:flex')}>
                <div className='flex justify-center p-6 items-center rounded-lg bg-secondary'>
                    <img className='w-[212px] h-[212px] max-sm:w-[135px] max-sm:h-[135px] max-sm:max-w-[135px]' alt='' src={imageUrl} />
                </div>
                <div className='max-sm:ml-3 w-full'>
                    <div>
                        <Title text={name} className='font-bold mb-1 mt-3' />
                        <p className='text-sm text-gray-400'>{ingredients}</p>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <span className='text-[20px]'><b>от {price}₸</b></span>
                        <Button variant='secondary'><Plus size={20} className='mr-1' />
                            <span className='max-sm:hidden'>Добавить</span>
                        </Button>
                    </div>
                </div>

            </div>
        </Link>
    );
};