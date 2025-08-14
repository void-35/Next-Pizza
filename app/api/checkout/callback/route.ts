import { PaymentCallbackData } from "@/@types/payment"
import { PayCancelTemplate, PaySuccessTemplate } from "@/components/shared"
import { sendEmail } from "@/lib/send-email"
import { prisma } from "@/prisma/prisma-client"
import { CartItemDTO } from "@/services/dto/cart"
import { OrderStatus } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.orderId)
            }
        })
        if (!order) {
            return NextResponse.json({ error: 'Order not found' })
        }

        const isSucceeded = body.object.status === "succeeded"

        await prisma.order.update({
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCEL
            },
            where: {
                id: order.id
            }
        })
        const items = JSON.parse(order.items as string) as CartItemDTO[]

        if(isSucceeded){
            sendEmail(
                order.email,
                'Next Pizza / Ваш заказ успешно оформлен🎉',
                PaySuccessTemplate({orderId: order.id, items:items})
            )
        }else{
            sendEmail(
                order.email,
                'Next Pizza / Ошибка при оформлении заказа',
                PayCancelTemplate({orderId: order.id})
            )
        }
    } catch (error) {
        console.log('Checkout callback error', error)
        return NextResponse.json({ error: 'Server error' })
    }
} 