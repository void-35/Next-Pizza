import { ProductRelations } from "@/@types/prisma"
import { PizzaSizes, PizzaTypes, basePizzaTypes } from "@/constants/pizza"

export const getNewPizzaTypes = (
    variants: ProductRelations['variants'],
    selectedSize:  PizzaSizes,
)=>{
    const newPizzaTypes = basePizzaTypes.map((type, id) => {
        if (variants.filter((variant) =>
            variant.pizzaType == Number(type.value) && variant.size == Number(selectedSize)
        ).length) {
            return { name: type.name, value: type.value, disabled: false }
        }
        return { name: type.name, value: type.value, disabled: true }
    })

    return newPizzaTypes
}