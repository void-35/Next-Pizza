'use client';

import React, { useEffect, useState } from 'react';
import { CheckoutSideBar, Container, Title } from '@/components/shared';
import { useCart } from '@/hooks';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCartBlock, CheckoutDelivery, CheckoutPersonalForm } from '@/components/shared/checkout';
import { CheckoutFormTypes, CheckoutSchema } from '@/components/shared/checkout/checkout-form-schema';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { Api } from '@/services/api-clients';
import { useSession } from 'next-auth/react';


interface Props {
    className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 990;


const Page: React.FC<Props> = () => {
    const [submitting, setSubmitting] = useState(false)
    const { cartItems, totalPrice, loading, deleteCartItem, onCountChange } = useCart(true);
    const { data: session } = useSession()
    const form = useForm<CheckoutFormTypes>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    })

    useEffect(() => {
        async function getUser() {
            const userData = await Api.auth.getMe()
            const [firstName, lastName] = userData.fullname.split(' ')
            form.setValue('firstName', firstName)
            form.setValue('lastName', lastName)
            form.setValue('email', userData.email)
        }
        if (session) {
            getUser()
        }
    }, [session])

    const onSubmit = async (values: CheckoutFormTypes) => {
        try {
            setSubmitting(true)
            const url = await createOrder(values)
            toast.success('Заказ успешно оформлен!  📝 Переход на оплату...', {
                icon: '✅'
            });
            if (url) {
                location.href = url
            }
        } catch (error) {
            console.log(error)
            setSubmitting(false)
            toast.error('Не удалось оформить заказ', {
                icon: '❌'
            });
        }
    }

    const vatPrice = (totalPrice * VAT) / 100;
    const totalAmount = totalPrice + DELIVERY_PRICE + vatPrice;

    return (
        <Container className='mt-10'>
            <Title text='Оформление заказа' className='font-bold mb-8 text-[36px]' />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex gap-10 max-lg:flex-col'>
                        <div className='flex flex-col gap-10 flex-1 mb-20 max-sm:!mb-0'>
                            <CheckoutCartBlock
                                loading={loading}
                                cartItems={cartItems}
                                deleteCartItem={deleteCartItem}
                                onCountChange={onCountChange}
                            />
                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                            <CheckoutDelivery className={loading ? 'opacity-40 pointer-events-none' : ''} />
                        </div>


                        <CheckoutSideBar
                            className='max-sm:w-[100%] max-sm:m-auto'
                            totalAmount={totalAmount}
                            totalPrice={totalPrice}
                            DELIVERY_PRICE={DELIVERY_PRICE}
                            VAT={VAT}
                            loading={loading || submitting}
                        />
                    </div>
                </form>
            </FormProvider>

        </Container>
    );
};

export default Page