'use client'

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filterCheckbox';
import { Input, Skeleton } from '../ui';


interface Props {
    className?: string;
    selectedIds: Set<String>
    title: string
    items: FilterChecboxProps[]
    defaultItems?: FilterChecboxProps[]
    defalultValue?: string[]
    loading?: boolean
    limit?: number
    searchInputPlaceholder?: string
    onChange?: (val: string) => void;
    onClickCheckbox?: (id: string) => void;
    name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
    className,
    title,
    items,
    defalultValue,
    selectedIds,
    limit = 5,
    loading,
    searchInputPlaceholder = 'Поиск...',
    onClickCheckbox,
    defaultItems,
    name,
}) => {
    const [showAll, setShowAll] = useState(false)
    const [searchText, setSearchText] = useState('')
    const filtredItems = items.filter((item) => item.text.toLowerCase().includes(searchText.toLowerCase()))

    if (loading) {
        return (
            <div className={className}>
                <p className='font-bold mb-3'>{title}</p>
                {...Array(limit).fill(0).map((_, id) => (
                    <Skeleton className='h-6 mb-4 rounded-[8px]'></Skeleton>
                ))}
                <Skeleton className='h-6 w-28 mb-4 rounded-[8px]'></Skeleton>
            </div>
        )
    }
    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>
            {showAll ?
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={(e) => { setSearchText(e.target.value) }}
                    />
                </div> : ''
            }
            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {
                    (showAll ? filtredItems : (defaultItems || filtredItems)).map((item, id) => (
                        <FilterCheckbox
                            key={String(id)}
                            checked={selectedIds.has(item.value)}
                            text={item.text}
                            value={String(id)}
                            name={String(name)}
                            onCheckedChange={() => onClickCheckbox?.(item.value)}
                            endAdornment={item.endAdornment}
                        />
                    ))
                }
            </div>
            {items.length > limit ? <div className='mt-4 border-t-nueutral-100'>
                <button onClick={() => { setShowAll(!showAll) }} className='text-primary mt-3'>
                    {showAll ? "Скрыть" : "+ Показать полностью"}
                </button>
            </div> : ''}

        </div>
    );
};