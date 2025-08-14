'use client'

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filterCheckbox';
import { Input } from '../ui';


interface Props {
    className?: string;
    title: string
    items: FilterChecboxProps[]
    defaultItems: FilterChecboxProps[]
    defalultValue?: string[]
    limit?: number
    searchInputPlaceholder?: string
    onChange?: (val: string) => void;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
    className,
    title,
    items,
    defalultValue,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    onChange = () => { console.log(232) },
    defaultItems,
}) => {
    const [showAll, setShowAll] = useState(false)
    const [searchText, setSearchText] = useState('')
    const filtredItems = items.filter((item)=>item.text.toLowerCase().includes(searchText.toLowerCase()))
    
    console.log(searchText)
    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>
            {showAll ?
                <div className="mb-5">

                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={(e) => {onChange(e.target.value); setSearchText(e.target.value)}}
                    />
                </div> : ''
            }
            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {
                (showAll ? filtredItems : defaultItems).map((item, id) => (
                    <FilterCheckbox
                        key={String(item.value)}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                    />
                ))}
            </div>
            {items.length > limit ? <div className='mt-4 border-t-nueutral-100'>
                <button onClick={() => { setShowAll(!showAll) }} className='text-primary mt-3'>
                    {showAll ? "Скрыть" : "+ Показать полностью"}
                </button>
            </div> : ''}

        </div>
    );
};