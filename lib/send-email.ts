import nodemailer from 'nodemailer'
import { render } from '@react-email/components';

// export const sendEmail = async (to: string, subject: string, EmailTemplate: React.ReactNode) => {
//     const { data, error } = await resend.emails.send({
//         from: 'Acme <onboarding@resend.dev>',
//         to: to,
//         subject,
//         react: EmailTemplate,
//     });

//     if (error) {
//         throw new Error('Email send failed')
//     }

//     return data
// };

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
});

export const sendEmail = async (to: string, subject: string, EmailTemplate: React.ReactNode) => {

    const email = await render(EmailTemplate)
    const info = await transporter.sendMail({
        from: `"Next Pizza" ${process.env.GMAIL_USER}`,
        to,
        subject,
        text: "Hello!", 
        html: email,
    });

    console.log("Message sent:", info.messageId);
};