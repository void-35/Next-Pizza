import { create } from "zustand"

export interface Item {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    products: {
        price: number;
    };
}

interface Products {
    items: Item[],
    setItems: (newItems: Item[]) => void,
}

export const useProducts = create<Products>((set) => ({
    items: [],
    setItems: (newItems) => {set(() => ({ items: newItems }))}
}))