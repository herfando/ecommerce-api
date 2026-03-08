import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/User.js"

// ==========================
// REGISTER
// ==========================
export const register = async (req: Request, res: Response) => {
    try {

        const { name, phone, email, password, confirmPassword } = req.body

        if (!name || !phone || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const verificationToken = crypto.randomBytes(32).toString("hex")

        const verificationExpires = new Date(Date.now() + 60 * 60 * 1000)

        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires
        })

        const verifyLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}`

        res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            verifyLink
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}


// ==========================
// VERIFY EMAIL
// ==========================
export const verifyEmail = async (req: Request, res: Response) => {
    try {

        const { token } = req.query

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() }
        })

        if (!user) {
            return res.status(400).json({ message: "Token invalid or expired" })
        }

        user.emailVerified = true
        user.emailVerificationToken = undefined
        user.emailVerificationExpires = undefined

        await user.save()

        res.json({
            message: "Email verified successfully. You can now login."
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}


// ==========================
// LOGIN STEP 1 (SEND OTP)
// ==========================
export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        if (!user.emailVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            })
        }

        // generate 4 digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.loginOTP = otp
        user.loginOTPExpires = new Date(Date.now() + 5 * 60 * 1000)

        await user.save()

        // nanti di sini kirim OTP ke WhatsApp
        // sendWhatsApp(user.phone, otp)

        res.json({
            message: "OTP sent to WhatsApp",
            otp // sementara untuk testing
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}


// ==========================
// LOGIN STEP 2 (VERIFY OTP)
// ==========================
export const verifyOTP = async (req: Request, res: Response) => {
    try {

        const { email, otp } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (user.loginOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        if (user.loginOTPExpires && user.loginOTPExpires < new Date()) {
            return res.status(400).json({ message: "OTP expired" })
        }

        user.loginOTP = undefined
        user.loginOTPExpires = undefined

        await user.save()

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}


// ==========================
// LOGOUT
// ==========================
export const logout = async (req: Request, res: Response) => {
    try {

        res.clearCookie("token")

        res.json({
            message: "Logout successful"
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}
// ==========================
// GET CURRENT USER
// ==========================
export const getMe = async (req: Request, res: Response) => {
    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.json({
            user
        })

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}