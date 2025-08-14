import { ProductRelations } from "@/@types/prisma";
import { Product } from "@prisma/client";
import { create } from "zustand"

interface Products {
    items: ProductRelations[],
    setItems: (newItems: ProductRelations[]) => void,
}

export const useProducts = create<Products>((set) => ({
    items: [],
    setItems: (newItems) => {set(() => ({ items: newItems }))}
}))