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

    const handleClose = ()=>{
        onClose()
    }

    return (
        <Dialog open={open} >
            <DialogContent className={cn(className, 'w-[450px] bg-white p-10')}>

                {type=='login' ? <LoginForm onClose={handleClose}/> : <RegisterForm onClose={handleClose} />}

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
                <Button variant='outline' onClick={onChangeType} type='button' className='h-12'>
                    {type == 'login' ? 'зарегистрироваться' : "Войти в аккаунт"}
                </Button>
            <DialogTitle className='hidden'></DialogTitle>
            </DialogContent>
        </Dialog>
    );
};