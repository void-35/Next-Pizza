'use client'

import {useState } from 'react';
import 'react-dadata/dist/react-dadata.css';
import { Input } from '../ui';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from './clear-button';
import { ErrorText } from './error-text';
import { HighlightWordsModal } from './highlight-words-modal';

interface Props {
    onChange?: (value?: string) => (void),
    name: string;
    label: string;
}


export const AddressInput: React.FC<Props> = ({ name, label }) => {
    const [modalStatus, setModalStatus] = useState(false)
    const { register, formState: { errors }, setValue, watch } = useFormContext()
    const query = watch(name)
    const errorText = errors[name]?.message as string


    return (
        <>
            <div className='relative'>
                {label && <p className='text-sm font-medium mb-2'>{label}</p>}
                <div className='relative'>
                    <Input
                        {...register(name)}
                        onFocus={() => { setModalStatus(true) }}
                        onBlur={() => { setModalStatus(false) }}
                        onChange={(e) => { setValue(name, e.target.value) }}
                        className='pr-10'
                    />
                    {query && <ClearButton onClick={() => { setValue(name, '') }} />}
                </div>
                {errorText && <ErrorText className='mt-2' text={errorText} />}


                { modalStatus && query.length !== 0 && (
                    <HighlightWordsModal name={name} query={query} />
                )}

            </div>
        </>
    );
}