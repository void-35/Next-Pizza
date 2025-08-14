'use client';

import { ProductRelations } from "@/@types/prisma"
import { Variant } from "@/components/shared/group-variants"
import { PizzaSizes, PizzaTypes, basePizzaTypes } from "@/constants/pizza"
import { useEffect, useState } from "react"
import { getNewPizzaTypes } from "../lib/get-new-pizza-types"
import { useSet } from "react-use"
import toast from 'react-hot-toast';
import { useCart } from "./use-cart";

interface ReturnProps {
    selectedSize: PizzaSizes,
    selectedPizzaType: PizzaTypes,
    selectedIngredients: Set<number>,
    setSelectedSizes: (size: PizzaSizes) => void,
    setSelectedPizzaType: (size: PizzaTypes) => void,
    toggleIngredient: (key: number) => void,
    newPizzaTypes: Variant[]
    currentVariant: number | undefined
}

export const usePizzaOptions = (
    variants: ProductRelations['variants'],
): ReturnProps => {
    const [selectedSize, setSelectedSizes] = useState<PizzaSizes>(20)
    const [selectedPizzaType, setSelectedPizzaType] = useState<PizzaTypes>(1)
    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]))
    const currentVariant = variants.find((variant) => variant.size == selectedSize && variant.pizzaType == selectedPizzaType)?.id
    const newPizzaTypes = getNewPizzaTypes(variants, selectedSize)


    useEffect(() => {
        const newPizzaType = newPizzaTypes.find((type) => !type.disabled)
        const isAvailable = newPizzaTypes.find((type) => Number(type.value) == selectedPizzaType && !type.disabled)

        if (newPizzaType && !isAvailable) {
            setSelectedPizzaType(Number(newPizzaType.value) as PizzaTypes)
        }
    }, [selectedSize])

    return { selectedSize, selectedPizzaType, selectedIngredients, setSelectedSizes, setSelectedPizzaType, toggleIngredient, newPizzaTypes, currentVariant }
}