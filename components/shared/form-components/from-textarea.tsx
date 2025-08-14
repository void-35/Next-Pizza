'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
    className?: string;
    required?: boolean;
    name: string;
}

export const FromTextarea: React.FC<Props> = ({label, required, name, className, ...props }) => {
    const {watch, register, formState: { errors }, resetField} = useFormContext()
    
    const text = watch(name)
    const errorText = errors[name]?.message as string

    return (
        <div className={cn(className)}>
            <p className='font-medium mb-2'>
                {label} {required && <RequiredSymbol />}
            </p>
            <div className='relative'>
                <Textarea className='h-12 text-md overflow-auto' {...props} {...register(name)} />
                {text && <ClearButton className='!top-[30%]' onClick={()=>resetField(name)} />}
            </div>
            {errorText && <ErrorText text={errorText} />}
        </div>
    );
};