import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Dialog } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
    className?: string;
    open: boolean;
    onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ className, open, onClose }) => {
    const [type, setType] = useState<'login' | 'register'>('login')

    const onChangeType = () => {
        setType(type === 'login' ? 'register' : 'login')
    }

    const handleClose = () => {
        onClose()
        setType('login')
    }

    return (
        <Dialog open={open} onOpenChange={() => handleClose()}>
            <DialogContent className={cn(className, 'flex flex-col max-w-[450px] overflow-auto  bg-white max-sm:h-full')}>
                {type == 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}
                <div className='flex gap-3'>
                    <Button
                        onClick={() =>
                            signIn("github", { callbackUrl: '/', redirect: true })
                        }
                        variant={'secondary'}
                        className='gap-2 h-12 p-2 flex-1'
                    >
                        <img className='w-5 h-5' src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' />
                        Github
                    </Button>
                    <Button
                        onClick={() =>
                            signIn("google", { callbackUrl: '/', redirect: true })
                        }
                        variant={'secondary'}
                        className='gap-2 h-12 p-2 flex-1'
                    >
                        <img className='w-5 h-5' src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg' />
                        Google
                    </Button>
                </div>
                <Button variant='outline' onClick={onChangeType} type='button' className='h-12'>
                    {type == 'login' ? 'зарегистрироваться' : "Войти в аккаунт"}
                </Button>
                <DialogTitle className='hidden'></DialogTitle>
            </DialogContent>
        </Dialog>
    );
};