import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendOtp = async (phone: string, otp: string) => {
    try {
        await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `whatsapp:${phone}`,
            body: `Your login OTP is: ${otp}`
        });

        console.log("OTP sent to WhatsApp:", phone);
    } catch (error) {
        console.error("Failed to send OTP:", error);
    }
};