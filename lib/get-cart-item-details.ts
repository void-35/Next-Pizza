import { PizzaSizes, PizzaTypes } from "@/constants/pizza";
import { ICartItem } from "@/store/cart";
import { Ingredient } from "@prisma/client";

export const getCartItemDetails = (
    pizzaSize: PizzaSizes | null,
    pizzaType: PizzaTypes,
    ingredients?: ICartItem['ingredients'],
):string => { 
    const details = []

    if(pizzaSize && pizzaType){
        const typeName = pizzaType === 1 ? 'Традиционное': 'Тонкое'
        details.push(`${typeName}, ${pizzaSize} см`)
    }

    if(ingredients){
        details.push(...ingredients.map((ingredient)=>ingredient.name))
    }
    return details.join(", ");
}