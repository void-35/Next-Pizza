import { ProductRelations } from "@/@types/prisma"
import { PizzaSizes, PizzaTypes } from "@/constants/pizza"

export const pizzaCalc = (
    ingredients: ProductRelations['ingredients'],
    variants: ProductRelations['variants'],
    selectedIngredients: Set<number>,
    selectedSize:  PizzaSizes,
    selectedPizzaType: PizzaTypes,
)=>{
    const allIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((total, ingredient) => total + ingredient.price, 0)
    const pizzaVariantPrice = variants.find((variant) => variant.size === selectedSize && variant.pizzaType === selectedPizzaType)?.price || 0

    return allIngredientsPrice + pizzaVariantPrice
}