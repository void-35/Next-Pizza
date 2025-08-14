import { updateCartTotalAmount } from "@/lib";
import { getOrCreateCart } from "@/lib/get-or-create-cart";
import { prisma } from "@/prisma/prisma-client";
import { AddToCartValues} from "@/services/dto/cart";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, itmes: [] })
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token
                    },

                ]
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        variant: {
                            include: {
                                product: true,
                            }
                        },
                        ingredients: true,
                    },
                },
            }
        })
        console.log(userCart)

        return NextResponse.json(userCart)
    } catch (error) {
        console.log('[CART_GET] Server error', error)
        return NextResponse.json({ message: 'Не удалось получить продукт корзины' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as AddToCartValues;

        let token = req.cookies.get('cartToken')?.value
        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await getOrCreateCart(token)

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                variantId: data.variantId,
            },
            include: {
                ingredients: {
                    select: { id: true },
                },
            },
        });

        const sameIngredients = (a: number[], b: number[]) => {
            if (a.length !== b.length) return false;
            const setA = new Set(a);
            const setB = new Set(b);
            for (const item of setA) {
                if (!setB.has(item)) return false;
            }
            return true;
        };

        const existingCartItem = cartItems.find(item =>
            sameIngredients(
                item.ingredients.map(i => i.id),
                data.ingredientsIds || []
            )
        );

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: {
                        increment: 1
                    }
                }
            })
            const updatedCart = await updateCartTotalAmount(token)
            const resp = NextResponse.json(updatedCart)
            resp.cookies.set('cartToken', token, {
                maxAge: 60 * 60 * 24 * 10000,
            })
            return resp;
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    variantId: data.variantId,
                    ingredients: { connect: data.ingredientsIds?.map((ingredientId) => ({ id: ingredientId })) },
                    quantity: 1
                }
            })

            const updatedCart = await updateCartTotalAmount(token)

            const resp = NextResponse.json(updatedCart)
            resp.cookies.set('cartToken', token, { maxAge: 60 * 60 * 24 * 30 })
            return resp;
        }
    } catch (error) {
        console.log('[CART_POST] Server error', error)
        return NextResponse.json({ message: 'Не удалось добавить продукт в корзину' }, { status: 500 });
    }
}