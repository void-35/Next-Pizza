"use client"

import { Api } from "@/services/api-clients"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

interface DataProps {
    ingredients: Ingredient[],
    loading: boolean,
}

export const useIngredients = (): DataProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getIngredients()
    }, [])

    return { ingredients, loading }
}
