import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TRegisterSchema, registerSchema } from './scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../title';
import { FormInput } from '../../form-components';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/app/actions';

interface Props {
    onClose: () => void
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
        }
    })
    const onSubmit = async (data: TRegisterSchema) => {
        try {
            await registerUser({
                email: data.email,
                fullname: data.fullName,
                password: data.password,
            })
            toast.success('Вы успешно зарегистрировались! Подтвердите почту', {
                icon: '✅'
            })
            onClose()
        } catch (error) {
            console.log('Error [LOGIN]', error)
            toast.error('Не удалось зарегистрироваться', {
                icon: '❌'
            })
        }
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>

                <Title text='Регистрация' size='md' className='font-bold' />

                <FormInput name='email' label='E-mail' required />
                <FormInput name='fullName' label='Полное имя' required />
                <FormInput name='password' label='Пароль' type='password' required />
                <FormInput name='confirmPassword' label='Подтвердите пароль' type='password' required />

                <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};