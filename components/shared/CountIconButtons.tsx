import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { Minus, Plus } from 'lucide-react';

interface Props {
    className?: string;
    onClick: () => void;
    type: 'minus' | 'plus';
    size?: 'sm' | "md";
    disabled?: boolean;
}

export const CountIconButton: React.FC<Props> = ({ className, onClick, type, size = 'sm', disabled }) => {
    return (
        <Button disabled={disabled} className={cn('p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
            size == 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md')}
            onClick={() => onClick()} variant={'outline'}>
            {
                type == "minus" ? (
                    <Minus className={size == 'sm' ? 'h-4' : 'h-5'} />
                ) : (
                    <Plus className={size == 'sm' ? 'h-4' : 'h-5'} />
                )
            }
        </Button>
    );
};