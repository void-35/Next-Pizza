import { prisma } from "@/prisma/prisma-client"
import { Cart } from "@prisma/client"

export async function getOrCreateCart(token: string | undefined): Promise<Cart> {
    let userCart = await prisma.cart.findFirst({
        where: {
            token
        },
    })
    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token
            }
        })
    }
    return userCart
}