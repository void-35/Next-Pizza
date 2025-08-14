import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Popover } from '../ui';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Filter } from 'lucide-react';
import { Filters } from './filters';

interface Props {
    className?: string;
}

export const FilterButton: React.FC<Props> = ({ className }) => {
    return (
        <Popover>
            <PopoverTrigger className={cn(
                        'inline-flex items-center border border-primary text-primary bg-transparent hover:bg-secondary gap-1 color-primary bg-gray-50 px-5 h-[42px] rounded-2xl cursor-pointer',
                        className,
                    )}>
                
                    <Filter />
                    Фильтер
            </PopoverTrigger>
            <PopoverContent>
                <Filters />
            </PopoverContent>
        </Popover>
    );
};