import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const CONTACT_MESSAGE_FIELDS: { [key: string]: string } = {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
};

const generateEmailContent = (data: { [key: string]: string }) => {
    const stringData = Object.entries(data).reduce((str, [key, val]) => {
        str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`;

        return str;
    }, '');

    const htmlData = Object.entries(data).reduce((str, [key, val]) => {
        str += `<h1 align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1><p>${val}</p>`;

        return str;
    }, '');

    return {
        text: stringData,
        html: htmlData,
    };
};

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: 'haunhpr024@gmail.com',
            ...generateEmailContent({ name, email, subject, message }),
        };

        await transporter.sendMail(mailOptions);

        return new NextResponse(
            JSON.stringify({ message: 'Email sent successfully!' })
        );
    } catch (error) {
        console.log('Error sending email', error);
        return new NextResponse(
            JSON.stringify({ message: 'Error sending email' }),
            { status: 500 }
        );
    }
};
