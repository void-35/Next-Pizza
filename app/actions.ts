'use server';

import { PayOrderTemplate, VerificationUserTemplate } from "@/components/shared";
import { CheckoutFormTypes } from "@/components/shared/checkout/checkout-form-schema";
import { createPayment } from "@/lib/create-payment";
import { getUserSession } from "@/lib/get-user-session";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormTypes) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('cartToken')?.value

        if (!token) {
            throw new Error('Cart token not found')
        }

        const cart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        variant: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: token,
            }
        })

        if (!cart) {
            throw new Error('Cart not found')
        }
        if (cart.items.length === 0) {
            throw new Error('Cart is empty')
        }

        const order = await prisma.order.create({
            data: {
                status: OrderStatus.PENDING,
                token,
                totalAmount: cart.totalAmount,
                items: JSON.stringify(cart.items),
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                address: data.address,
                comment: data.comment,
                phone: data.phone
            }
        })

        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                totalAmount: 0,
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        const paymentData = await createPayment({
            orderId: order.id,
            amount: order.totalAmount,
            description: "Оплата заказа #" + order.id
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        const paymentUrl = paymentData.confirmation.confirmation_url

        await prisma.order.update({
            data: {
                paymentId: paymentData.id
            },
            where: {
                id: order.id
            }
        })

        await sendEmail(data.email, 'Next pizza / Номер заказа #' + order.id, PayOrderTemplate({
            orderId: order.id, totalAmount: order.totalAmount, paymentLink: paymentUrl
        }))

        return paymentUrl;
    } catch (error) {
        console.log('[CreateOrder] Server error ' + error)
        throw error
    }

}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('User not found')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullname: body.fullname,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password
            }
        })
    } catch (error) {
        console.log('Error [UPDATE USER]', error)
        throw error
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (findUser) {
            if (!findUser.verfied) {
                throw new Error('Почта не подтверждена')
            }
            throw new Error('Пользователь уже сушествует')
        }
        const createdUser = await prisma.user.create({
            data:{
                email: body.email,
                password: hashSync(body.password as string, 10),
                fullname: body.fullname,
            }
        })
        const verifyCode = Math.floor(100000 + Math.random() * 800000).toString()

        await prisma.verifyCode.create({
            data:{
                userId: createdUser.id,
                code: verifyCode,
            }

        })

        await sendEmail(createdUser.email, 'Next pizza / Подтвердите почту', VerificationUserTemplate({verifyCode}))
    } catch (error) {
        console.log('Error [REGISTER USER]', error)
        throw error
    }
}