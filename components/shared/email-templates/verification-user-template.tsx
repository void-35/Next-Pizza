import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';

interface PayOrderTemplate {
    verifyCode: string;
}

export function VerificationUserTemplate({ verifyCode }: PayOrderTemplate) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                    <Heading style={{ fontSize: '20px', marginBottom: '10px' }}>Код подтверждения</Heading>
                    <Text>Код подтверждения: <h2>{verifyCode}</h2></Text>
                    <Link href={`http://localhost:3000/api/auth/verify?code=${verifyCode}`}>Подтвердить регистрацию</Link>
                </Container>
            </Body>
        </Html>
    );
}
