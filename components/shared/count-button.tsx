import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { Minus, Plus } from 'lucide-react';
import { CountIconButton } from './CountIconButtons';
import { Icons } from './spin-icon';

interface Props {
    className?: string;
    count: number;
    loading?: boolean;
    changeCount?: (count: 'inc' | 'dec') => void
    size?: 'sm' | "md"
}

export const CountButton: React.FC<Props> = ({ className, changeCount, loading, count, size = 'sm' }) => {
    return (
        <div className={cn(className, 'w-[90px] inline-flex items-center justify-around gap-2')}>
            <CountIconButton disabled={count===1 || loading} type='minus' size='sm' onClick={() => changeCount?.('dec')} />
            {
                loading ? <Icons.spinner className="h-[14px] w-[14px] animate-spin" /> : <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{count}</b>
            }
            <CountIconButton disabled={loading} type='plus' size='sm' onClick={() => changeCount?.('inc')} />
        </div>
    );
};