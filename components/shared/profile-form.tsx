'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TRegisterSchema, registerSchema } from './modals/forms/scheme';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form-components';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: data.email,
            fullName: data.fullname,
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (data: TRegisterSchema) => {
        console.log(21312123123)
        try {
            await updateUserInfo({
                email: data.email,
                fullname: data.fullName,
                password: data.password
            })

            toast.success('Данные успешно обнавленны', {
                icon: '✅'
            })
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌'
            })
        }
    }

    const onSignOut = async () => {
        await signOut({
            callbackUrl: '/'
        })
    }

    return (
        <Container className='my-10 ml-10'>
            <Title text='Личные данные' size='md' className='font-bold' />
            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Полное имя" required />

                    <FormInput type="password" name="password" label="Новый пароль" required />
                    <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Сохранить
                    </Button>

                    <Button
                        onClick={onSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button">
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};