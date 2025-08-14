'use client'

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { HighlightWords } from './highlight-words';
import { ISuggestion, getAddresses } from '@/services/addresses';
import { useFormContext } from 'react-hook-form';
import { useAddressSuggestions } from '@/hooks';

interface Props {
    className?: string;
    name: string;
    query: string;
}

export const HighlightWordsModal: React.FC<Props> = ({ className, name, query }) => {
    const { setValue } = useFormContext()
    const { dataSuggestions, getHighlightWords, getSuggestionKey } = useAddressSuggestions(query)

    return (
        <div className={cn(className, 'absolute z-10 shadow-md w-full translate-y-3 pb-3 bg-white max-h-[300px] overflow-auto')}>
            {dataSuggestions?.map((suggestion) => (
                <HighlightWords
                    key={getSuggestionKey(suggestion)}
                    text={suggestion?.value}
                    words={getHighlightWords()}
                    onClick={() => { setValue(name, suggestion?.value) }}
                />
            ))}
        </div>
    );
};