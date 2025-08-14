import { axiosInstance } from "./axios";
import { AddToCartValues, CartDTO } from "./dto/cart";

export async function fetchCart(): Promise<CartDTO> {
    const { data } = await axiosInstance.get<CartDTO>('/cart')

    return data
}

export async function addCartItem(values: AddToCartValues): Promise<CartDTO> {
    const { data } = await axiosInstance.post<CartDTO>('/cart', values)

    return data
}

export async function updateItemQuantity(id: number, quantity: number): Promise<CartDTO> {
    const { data } = await axiosInstance.patch<CartDTO>(`/cart/${id}`, { quantity })

    return data
}

export async function deleteCartItem(id: number): Promise<CartDTO> {
    const { data } = await axiosInstance.delete<CartDTO>(`/cart/${id}`)

    return data
}
