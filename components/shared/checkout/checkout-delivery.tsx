'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '@/components/ui';
import { FromTextarea } from '../form-components/from-textarea';
import { AddressInput } from '../address-input';

interface Props {
    className?: string;
}

export const CheckoutDelivery: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock className={cn(className)} title='3. Адресс доставки'>
            <div className='flex flex-col gap-3'>
                {/* <Input name='firstname' className='text-base' placeholder='Адрес' /> */}

                <AddressInput name={'address'} label='Адресс'/>

                <FromTextarea
                    name='comment'
                    className='text-base'
                    label='Коментарий к заказу'
                    placeholder='Укажите тут дополнительную информацию для курьера'
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};