import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/User.js"
import { sendEmail } from "../2FAuth/sendEmail.js"
import { sendOtp } from "../2FAuth/sendOtp.js"

// ==========================
// REGISTER
// ==========================
export const register = async (req: Request, res: Response) => {
    try {

        const { name, phone, email, password, confirmPassword } = req.body

        if (!name || !phone || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const verificationToken = crypto.randomBytes(32).toString("hex")

        const verificationExpires = new Date(Date.now() + 60 * 60 * 1000)

        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            emailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires
        })

        const verifyLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}`

        console.log("SEND VERIFY EMAIL TO:", newUser.email)

        await sendEmail(
            newUser.email,
            "Verify your email",
            `
            <h2>Fando Shop</h2>
            <p>Hi ${newUser.name}</p>
            <p>Please verify your email:</p>
            <a href="${verifyLink}">${verifyLink}</a>
            `
        )

        res.status(201).json({
            message: "User registered successfully. Please verify your email."
        })

    } catch (error) {

        console.error("REGISTER ERROR:", error)

        res.status(500).json({
            message: "Server error"
        })
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
            return res.status(400).json({
                message: "Token invalid or expired"
            })
        }

        user.emailVerified = true
        user.emailVerificationToken = undefined
        user.emailVerificationExpires = undefined

        await user.save()

        res.json({
            message: "Email verified successfully"
        })

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        })
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
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        if (!user.emailVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.loginOTP = otp
        user.loginOTPExpires = new Date(Date.now() + 5 * 60 * 1000)

        await user.save()

        await sendOtp(user.phone, otp)

        res.json({
            message: "OTP sent to WhatsApp"
        })

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        })
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
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (user.loginOTP !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }

        if (user.loginOTPExpires && user.loginOTPExpires < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            })
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

        res.status(500).json({
            message: "Server error"
        })
    }
}


// ==========================
// LOGOUT
// ==========================
export const logout = async (req: Request, res: Response) => {

    res.clearCookie("token")

    res.json({
        message: "Logout successful"
    })
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