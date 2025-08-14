import React from 'react';
import { cn } from '@/lib/utils';
import { WhiteBlock } from '../white-block';
import { Input } from '@/components/ui';
import { FormInput } from '../form-components';

interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock className={cn(className)} title='2. Персональные данные'>
            <div className='grid grid-cols-2 gap-5'>
                <FormInput name='firstName' className='text-base' label='Имя' />
                <FormInput name='lastName' className='text-base' label='Фамилия' />
                <FormInput name='email' className='text-base' label='E-mail' />
                <FormInput name='phone' className='text-base' label='Номер телефона' />
            </div>
        </WhiteBlock>
    );
};