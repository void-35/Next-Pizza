'use client';

import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroup } from './checkbox-filter-group';
import { useFilterParams, useFilters, useIngredients } from '@/hooks';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

interface Prices {
    priceFrom?: number;
    priceTo?: number;
}

interface Filters extends Prices {
    sizes: string
    pizzaTypes: string
    ingredients: string
}
// const ingredients = [
//     { text: "Цыпленок", value: "1" },
//     { text: "Моцарелла", value: "2" },
//     { text: "Сыр Чеддер", value: "3" },
//     { text: "Сыр Пармезан", value: "4" },
//     { text: "Сырный соус", value: "5" },
//     { text: "Томаты", value: "6" },
//     { text: "Соус Альфредо", value: "7" },
//     { text: "Чеснок", value: "8" },
// ];


export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients()
    const filters = useFilters()
    const allIngredients = ingredients?.map((o) => ({ text: o.name, value: o.id.toString() }))

    useFilterParams(filters)

    const changePrices = (prices: number[])=>{
        filters.setPrices('priceFrom', prices[0])
        filters.setPrices('priceTo', prices[1])
    }

    return (
        <div className={cn(className, 'pl-3')}>
            <Title text='Филтры' size='md' className='mb-5 font-bold' />
            <CheckboxFilterGroup
                name="pizzaTypes"
                className="mb-5"
                title="Тип теста"
                onClickCheckbox={filters.setPizzaTypes}
                selectedIds={filters.pizzaTypes}
                items={[
                    { text: 'Традиционное', value: '1' },
                    { text: 'Тонкое', value: '2' },
                ]}
            />
            <CheckboxFilterGroup
                title='Размеры'
                className='mt-5'
                limit={5}
                name='sizes'
                // loading={loading}
                onClickCheckbox={(id) => { filters.setSizes(id) }}
                selectedIds={filters.sizes}
                items={[
                    { text: "20 см", value: '20' },
                    { text: "30 см", value: '30' },
                    { text: "40 см", value: '40' },
                ]}
            />

            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7 pr-6'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input
                        type='number' placeholder='0' min={0} max={5000} value={String(filters.prices.priceFrom || '0')}
                        onChange={(e) => { filters.setPrices('priceFrom', Number(e.target.value)) }}
                    />
                    <Input
                        type='number' placeholder='5000' min={0} max={5000} value={String(filters.prices.priceTo || "5000")}
                        onChange={(e) => { filters.setPrices('priceTo', Number(e.target.value)) }}
                    />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 5000]}
                    onValueChange={changePrices}
                />
            </div>
            {ingredients && <CheckboxFilterGroup
                title='Ингредиенты'
                className='mt-5'
                limit={5}
                name='ingredients'
                loading={loading}
                onClickCheckbox={(id) => { filters.setIngredients(id) }}
                selectedIds={filters.selectedIngredients}
                items={allIngredients}
                defaultItems={allIngredients.slice(0, 5)}
            />}
        </div>
    );
};