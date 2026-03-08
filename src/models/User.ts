import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },

    // ==============================
    // EMAIL VERIFICATION
    // ==============================

    emailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationExpires: {
        type: Date
    },

    // ==============================
    // OTP LOGIN (WhatsApp)
    // ==============================

    loginOTP: {
        type: String
    },

    loginOTPExpires: {
        type: Date
    }

}, { timestamps: true })

export default mongoose.model("User", userSchema)