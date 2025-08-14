import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';
import { CartItemDTO } from '@/services/dto/cart';

interface PayOrderTemplate {
    firstName?: string;
    orderId: number;
    items: CartItemDTO[];
}

export function PaySuccessTemplate({ orderId, items }: PayOrderTemplate) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                    <Heading style={{ fontSize: '20px', marginBottom: '10px' }}>Спасибо за покупку!</Heading>
                    <Text>Ваш заказ #{orderId} оплачен. Список товаров:</Text>
                    <br/>
                    <ul>
                        {items.map((item)=>(
                            <li>
                                {item.variant.product.name} | {item.variant.price} X {item.quantity} ={' '}
                                {item.quantity * item.variant.price}
                            </li>
                        ))}
                    </ul>
                </Container>
            </Body>
        </Html>
    );
}
