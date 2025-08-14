import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';

interface Props {
    className?: string;
    title?: string;
    endAdorment?: React.ReactNode;
    contentClasssName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({ className, title, endAdorment, contentClasssName, children }) => {
    return (
        <div className={cn(className, 'bg-white rounded-3xl')} >
            {title && (
                <div className='flex justify-between items-center p-5 px-7 border-b border-gray-100'>
                    <Title text={title} size="sm" className="font-bold" />
                    {endAdorment}
                </div>
            )}
            <div className={cn('px-5 py-4', contentClasssName)}>{children}</div>
        </div>
    );
};