// src/2FAuth/sendEmail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {

        const info = await transporter.sendMail({
            from: `"Fando Shop" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("EMAIL SENT:", info.messageId);

    } catch (error) {

        console.error("EMAIL ERROR:", error);

    }
};