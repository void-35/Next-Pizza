import React from 'react';
import { cn } from '@/lib/utils';
import { WhiteBlock } from './white-block';
import { CheckoutTotalPrice } from './checkout-total-price';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

interface Props {
    className?: string;
    totalAmount: number;
    totalPrice: number;
    VAT: number;
    DELIVERY_PRICE: number;
    loading: boolean;
}

export const CheckoutSideBar: React.FC<Props> = ({ className, totalAmount, totalPrice, VAT, DELIVERY_PRICE, loading }) => {
    return (
        <div className={cn(className, 'w-[450px]')}>
            <WhiteBlock className='p-6 sticky top-4'>
                <div className='flex flex-col gap-1'>
                    <span className='text-xl'>Итого: </span>
                    {
                        loading ? (
                            <Skeleton className='h-11 w-48' />

                        ) : (
                            <span className='text-[34px] h-11 font-extrabold'>{totalAmount} ₸</span>
                        )
                    }
                </div>


                <CheckoutTotalPrice title={(
                    <div className='flex items-center'>
                        <Package className='mr-2 text-gray-400' size={18} />
                        Стоимость товаров:
                    </div>
                )} value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${totalPrice} ₸`} />
                <CheckoutTotalPrice title={(
                    <div className='flex items-center'>
                        <Percent className='mr-2 text-gray-400' size={18} />
                        Налоги:
                    </div>
                )} value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${VAT} ₸`} />
                <CheckoutTotalPrice title={(
                    <div className='flex items-center'>
                        <Truck className='mr-2 text-gray-400' size={18} />
                        Доставка:
                    </div>
                )} value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${DELIVERY_PRICE} ₸`} />

                <Button loading={loading} type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
                    перейти к оплате
                    <ArrowRight />
                </Button>
            </WhiteBlock>
        </div>
    );
};