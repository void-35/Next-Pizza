import { PaymentData } from "@/@types/payment";
import axios from "axios";

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: Props) {
    try {
        const { data } = await axios.post<PaymentData>('https://api.yookassa.ru/v3/payments', {
            amount: {
                value: ( details.amount/6.25 ).toString(),
                currency: 'RUB'
            },
            capture: true,
            description: details.description,
            metadata: {
                orderId: details.orderId
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_CALLBACK_URL
            }
        }, {
            auth: {
                username: process.env.YOOKASSA_SHOP_ID as string,
                password: process.env.YOOKASSA_API_KEY as string

            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7)
            }
        })
        return data;

    } catch (error) {
        console.log(error)
    }


}