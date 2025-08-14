'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui';
import { ClearButton } from '../clear-button';
import { RequiredSymbol } from '../required-symbol';
import { ErrorText } from '../error-text';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
    required?: boolean;
    name: string;
}

export const FormInput: React.FC<Props> = ({ className, label, name, required, ...props }) => {
    const { register, formState: { errors }, watch, resetField } = useFormContext()
    const value = watch(name)
    const errorText = errors[name]?.message as string

    return (
        <div className={cn(className)}>
            {label && <p className='text-sm font-medium mb-2'>
                {label}
                {required && <RequiredSymbol />}
            </p>}
            <div className='relative'>
                <Input className='h-12 text-md' {...register(name)} name={name} {...props} />
                {value && <ClearButton onClick={() => resetField(name)} />}
            </div>
            {errorText && <ErrorText className='mt-2' text={errorText} />}
        </div>
    );
};