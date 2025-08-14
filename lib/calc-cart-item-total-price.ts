import { Ingredient, Variant } from "@prisma/client"

interface Item {
    variant: Variant,
    quantity: number,
    ingredients: Ingredient[],
}

export const calcCartItemTotalPrice = (item: Item): number=>{
    const ingredients = item.ingredients.reduce((sum, item) => sum+item.price, 0)

    return (ingredients + item.variant.price) * item.quantity
}