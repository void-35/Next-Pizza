"use client"

import { useMemo, useState } from "react"
import { useSet } from "react-use"
import { useSearchParams } from "next/navigation"

interface Prices {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends Prices {
    sizes: string
    pizzaTypes: string
    ingredients: string
}

export interface Filters extends Prices {
    sizes: Set<string>
    pizzaTypes: Set<string>
    selectedIngredients: Set<string>
    prices: Prices
}

interface ReturnProps extends Filters {
    setPizzaTypes: (key: string) => void
    setSizes: (key: string) => void
    setPrices: (name: keyof Prices, val: number) => void
    setIngredients: (key: string) => void
}

export const useFilters = (): ReturnProps => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(",") || [])
    )

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(",") : []),
    )

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(",") : []),
    )

    const [prices, setPrices] = useState<Prices>({
        priceTo: Number(searchParams.get("priceTo")) || undefined,
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    })

    const changePrices = (name: keyof Prices, val: number) => {
        setPrices((prev) => ({ ...prev, [name]: val }))
    }

    return useMemo(() => ({
        pizzaTypes,
        sizes,
        prices,
        selectedIngredients,
        setSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setPrices: changePrices,
        setIngredients: toggleIngredients
    }), [pizzaTypes, sizes, prices, selectedIngredients])
}

