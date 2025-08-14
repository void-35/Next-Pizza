import { updateCartTotalAmount } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await context.params).id);
        const data = await req.json() as { quantity: number };
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ error: 'cart token not found' }, { status: 400 });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'cart item not found' }, { status: 404 });
        }

        await prisma.cartItem.update({
            where: { id },
            data: { quantity: data.quantity },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.error('[CART PATCH] Server Error', error);
        return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await context.params).id);
        const token = req.cookies.get('cartToken')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'cart token not found' }, { status: 400 });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            },
        })

        if(!cartItem){
            return NextResponse.json({ error: 'cart item not found' }, { status: 404 });
        }

        await prisma.cartItem.delete({
            where: {
                id
            },
        })

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart)
    } catch (error) {
        console.log('[CART DELETE] Server error', error)
        return NextResponse.json({ message: 'Не удалось удалить продукт корзины' }, { status: 500 });
    }
}