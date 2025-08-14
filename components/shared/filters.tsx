

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroup } from './checkbox-filter-group';

interface Props {
    className?: string;
}

const ingredients = [
    { text: "Цыпленок", value: "1" },
    { text: "Моцарелла", value: "2" },
    { text: "Сыр Чеддер", value: "3" },
    { text: "Сыр Пармезан", value: "4" },
    { text: "Сырный соус", value: "5" },
    { text: "Томаты", value: "6" },
    { text: "Соус Альфредо", value: "7" },
    { text: "Чеснок", value: "8" },
  ];

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
        <Title text='Филтры' size='md' className='mb-5 font-bold'/>
        <div className='flex flex-col  gap-4'>
            <FilterCheckbox text ='Можно собирать' value='1'/>
            <FilterCheckbox text ='Новинки' value='2'/>
        </div>
        <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
            <p className='font-bold mb-3'>Цена от и до:</p>
            <div className='flex gap-3 mb-5'>
                <Input type='number' placeholder='0' min={0} max={5000} defaultValue={0}/>
                <Input type='number' placeholder='1000' min={0} max={5000}/>
            </div>
            <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
        </div>
        <CheckboxFilterGroup 
            title='Ингредиенты'
            className='mt-5'
            limit={5}
            items={ingredients}
            defaultItems={ingredients.slice(0, 5)}
        />
    </div>
  );
};