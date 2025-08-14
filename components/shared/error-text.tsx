import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    text: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
    return (
        <div className={className}>
            <p className={cn(className, 'text-sm text-[#FE0000]')}>{text}</p>
        </div>
    );
};