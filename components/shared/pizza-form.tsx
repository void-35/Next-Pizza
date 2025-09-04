import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { ProductRelations } from '@/@types/prisma';
import { GroupVariants } from './group-variants';
import { PizzaSizes, PizzaTypes, basePizzaSizes, mapPizzaType } from '@/constants/pizza';
import { IngredientCard } from './ingredient-card';
import { pizzaCalc } from '@/lib';
import { usePizzaOptions } from '@/hooks';

interface Props {
    className?: string;
    loading: boolean;
    name: string;
    imageUrl: string;
    variants: ProductRelations['variants'];
    ingredients: ProductRelations['ingredients'];
    onClickAdd: (variantId: number, ingredients: number[]) => void;
}

export const PizzaForm: React.FC<Props> = ({ className, name, imageUrl, ingredients, variants, loading, onClickAdd }) => {
    const { selectedSize, selectedPizzaType, selectedIngredients, setSelectedPizzaType, setSelectedSizes, toggleIngredient, newPizzaTypes, currentVariant } = usePizzaOptions(variants)

    const totalPrice = pizzaCalc(ingredients, variants, selectedIngredients, selectedSize, selectedPizzaType)

    const pizzaDescription = `${selectedSize} см, ${mapPizzaType[selectedPizzaType]} пицца`

    const handleClickAdd = async () => {
        if (currentVariant) {
            onClickAdd(currentVariant, Array.from(selectedIngredients));
        }

    };


    return (
        <div className={cn(className, 'flex flex-1')}>

            <PizzaImage src={imageUrl} size={selectedSize} className='max-lg:hidden' />

            <div className=" bg-[#f5f3f3] p-5 lg:max-w-[450px] max-lg:mx-auto max-lg:w-full max-lg:bg-white">

                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{pizzaDescription}</p>
                <PizzaImage src={imageUrl} size={selectedSize} className='lg:hidden' />

                <GroupVariants items={basePizzaSizes} selectedVariant={String(selectedSize)} onClick={(value) => { setSelectedSizes(Number(value) as PizzaSizes) }} />
                <GroupVariants items={newPizzaTypes} selectedVariant={String(selectedPizzaType)} onClick={(value) => { setSelectedPizzaType(Number(value) as PizzaTypes) }} />
                <h2 className='text-2xl font-bold pt-3 pb-2'>Добавить по вкусу</h2>

                <div className='p-2 rounded-md h-[280px] overflow-auto scrollbar'>
                    <div className='grid grid-cols-3 gap-3 max-sm:grid-cols-2'>
                        {ingredients.map((ingredient, id) => (
                            <IngredientCard
                                key={id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => toggleIngredient(ingredient.id)}
                                id={id}
                            />
                        ))}

                    </div>
                </div>
                <Button loading={loading} onClick={handleClickAdd} className='h-[55px] mt-3 text-base px-10 rounded-[18px] w-full'>
                    Добавить в корзину за {totalPrice} ₸
                </Button>
            </div>
        </div >
    );
};