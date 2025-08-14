import { getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-clients";
import { AddToCartValues } from "@/services/dto/cart";
import { create } from "zustand"

export interface ICartItem {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
    quantity: number;
    pizzaSize: number | null;
    pizzaType: number | null;
    loading?: boolean;
    disable?: boolean;
    ingredients: Array<{ name: string; price: number }>;
}

export interface ICartState {
    cartItems: ICartItem[];
    error?: boolean;
    loading: boolean;
    totalPrice: number;
    getCart: () => Promise<void>;
    addCartItem: (item: AddToCartValues) => Promise<void>
    updateItemQuantity: (id: number, quantity: number) => Promise<void>
    deleteCartItem: (id: number) => Promise<void>
    onCountChange?: (id: number, quantity: number, type: 'inc' | 'dec') => Promise<void>
}

export const useCartStore = create<ICartState>((set) => ({
    cartItems: [],
    error: false,
    loading: false,
    totalPrice: 0,
    getCart: async () => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.fetchCart()
            set(getCartDetails(data))
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    addCartItem: async (values: AddToCartValues) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.addCartItem(values)
            set(getCartDetails(data))
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.id === id ? { ...item, loading: true } : item
                ),
                error: false
            }))
            const data = await Api.cart.updateItemQuantity(id, quantity)
            set(getCartDetails(data))
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    deleteCartItem: async (id: number) => {
        try {
            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.id === id ? { ...item, disable: true } : item
                ), loading: true, error: false,
            }))
            const data = await Api.cart.deleteCartItem(id)
            set(getCartDetails(data))
        } catch (error) {
            console.log(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    }
}))