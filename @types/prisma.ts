import { Category, Ingredient, Product, Variant } from "@prisma/client";

export type ProductRelations = Product & {variants: Variant[], ingredients: Ingredient[]}

