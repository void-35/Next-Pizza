import { Cart, CartItem, Ingredient, Product, Variant } from "@prisma/client";

export interface AddToCartValues {
    variantId: number;
    ingredientsIds?: number[];
}

export type CartItemDTO = CartItem & {
    variant: Variant & {
        product: Product;
    }
    ingredients: Ingredient[];
}

export interface CartDTO extends Cart {
    items: CartItemDTO[]
} 