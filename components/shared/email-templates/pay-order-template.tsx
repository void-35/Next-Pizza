import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';

interface PayOrderTemplate {
    firstName?: string;
    orderId: number;
    totalAmount: number;
    paymentLink: string;
}

export function PayOrderTemplate({ orderId, totalAmount, paymentLink }: PayOrderTemplate) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                    <Heading style={{ fontSize: '20px', marginBottom: '10px' }}>Заказ #{orderId}.</Heading>
                    <Text>Оплтатите заказ на сумму {totalAmount}₸. Перейдите по этой сылке: </Text>
                    <Link href={paymentLink}>{paymentLink}</Link>
                </Container>
            </Body>
        </Html>
    );
}
