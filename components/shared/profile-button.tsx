import React from 'react';
import { cn } from '@/lib/utils';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
    className?: string;
    onClickSignIn: ()=>void
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session } = useSession()

    return (
        <div className={cn(className)}>
            {!session ? (
                <Button
                    onClick={() => onClickSignIn()}
                    variant={'outline'}
                    className='flex items-center gap-1'
                >
                    <User size={16} />
                    Войти
                </Button>
            ) : (
                <Link href='/profile'>
                    <Button variant={'secondary'} className='flex items-center gap-2'>
                        <CircleUser size={18} />
                        Профиль
                    </Button>
                </Link>
            )}
        </div>
    );
};