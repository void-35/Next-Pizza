import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TLoginSchema, loginSchema } from './scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../title';
import { FormInput } from '../../form-components';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
    onClose: () => void
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const onSubmit = async (data: TLoginSchema) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            })
            if (!resp?.ok) {
                throw new Error
            }
            toast.success('Вы успешно вошли в аккаунт', {
                icon: '✅'
            })
            onClose()
        } catch (error) {
            console.log('Error [LOGIN]', error)
            toast.error('Не удалось войти в аккаунт', {
                icon: '❌'
            })
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                <div className='flex justify-center items-center'>
                    <div className='mr-2'>
                        <Title text='Вход в аккаунт' size='md' className='font-bold' />
                        <p>Введите свою почтуб чтобы войти в аккаунт</p>
                    </div>
                    <img src="/assets/phone-icon.png" alt="phone-icon" width={60} height={60} />
                </div>

                <FormInput name='email' label='E-mail' required />
                <FormInput name='password' label='Пароль' type='password' required />

                <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};