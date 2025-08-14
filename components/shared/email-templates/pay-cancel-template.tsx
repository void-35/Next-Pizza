import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';
import { CartItemDTO } from '@/services/dto/cart';

interface PayOrderTemplate {
    firstName?: string;
    orderId: number;
}

export function PayCancelTemplate({ orderId }: PayOrderTemplate) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                    <Heading style={{ fontSize: '20px', marginBottom: '10px' }}>Отмена оформления заказа</Heading>
                    <Text>Не удалось оформить заказ #{orderId}</Text>
                </Container>
            </Body>
        </Html>
    );
}
