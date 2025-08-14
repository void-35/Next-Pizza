"use client"

import { useEffect, useRef, useState } from "react"
import { useSet } from "react-use"
import { useRouter, useSearchParams } from "next/navigation"
import QueryString from "qs"
import { Filters } from "./use-filters"

export const useFilterParams = (filters: Filters) => {
    const router = useRouter()
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients),
            }

            const query = QueryString.stringify(params, {
                arrayFormat: 'comma'
            })
            if (window.location.search !== `?${query}`) {
                router.push(`?${query}`, { scroll: false });
            }
        }
        isMounted.current = true
    }, [filters, router])
}

