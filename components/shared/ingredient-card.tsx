import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface Props {
  name: string;
  id: number;
  imageUrl: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientCard: React.FC<Props> = ({ name, imageUrl, price, active = true, onClick, id, className }) => {
  return (
    <div onClick={onClick} className={cn('flex flex-col h-[140px] bg-white relative items-center text-center rounded-md shadow-[0_4px_20px_rgba(6,5,50,0.12)] cursor-pointer transition-all duration-200 hover:shadow-[0_0_8px_rgba(6,5,50,0.12)]',
      { 'border border-primary': active },
      className
    )}>
      <img width={80} height={80} src={imageUrl} />
      <h2 className='h-[52px] leading-[16px]'>{name}</h2>
      <span className='font-bold text-[18px]'>{price}тг.</span>
      {active && <CheckCircle className='absolute top-2 right-2 text-primary' />}
    </div>
  );
};