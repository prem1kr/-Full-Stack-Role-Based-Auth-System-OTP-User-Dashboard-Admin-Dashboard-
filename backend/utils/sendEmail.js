import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
    try {
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html: `
                <h2>${subject}</h2>
                <p>${text}</p> `
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};