"use client"

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './searchInput';
import { CartDrawer } from './cart-drawer';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal';

interface Props {
    className?: string;
    hasCart?: boolean;
    hasSearch?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasCart = true, hasSearch = true }) => {
    const searchParam = useSearchParams()
    const router = useRouter()
    const [authModal, setAuthModal] = useState(false)

    useEffect(() => {
        if (searchParam.has('paid')) {
            toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
            router.replace('/', undefined);
        }
        if (searchParam.has('verified')) {
            toast.success('Почта успешно подтверждена!')
            router.replace('/', undefined);
        }
    }, [])
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8 px-3'>
                <Link href={'/'}>
                    <div className='flex items-center gap-4'>
                        <Image src="/logo.png" alt='logo' width={35} height={35} />
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Next pizza</h1>
                            <p className='text-sm text-gray-400 leading 3'> Вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>
                {
                    hasSearch &&
                    <div className='mx-10 flex-1 max-sm:hidden'>
                        <SearchInput />
                    </div>
                }


                <div className={cn(className, 'flex items-center gap-3')}>
                    <AuthModal open={authModal} onClose={() => { setAuthModal(false) }} />
                    <ProfileButton onClickSignIn={() => setAuthModal(true)} />
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};