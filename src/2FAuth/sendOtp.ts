// src/2FAuth/sendOtp.ts
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendOtp = async (to: string, otp: string) => {
    await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${to}`,
        body: `Your OTP code is: ${otp} (expires in 5 minutes)`,
    });
};