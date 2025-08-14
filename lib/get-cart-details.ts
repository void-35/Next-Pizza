import { CartDTO } from '@/services/dto/cart';
import { ICartItem } from '@/store/cart';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

type ReturnProps = {
    cartItems: ICartItem[];
    totalPrice: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.variant.product.name,
        imageUrl: item.variant.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.variant.size,
        pizzaType: item.variant.pizzaType,
        loading: false,
        disabled: false,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    }));

    return { cartItems: items, totalPrice: data.totalAmount};
};
