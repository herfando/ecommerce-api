import { Router } from "express"
import {
    register,
    verifyEmail,
    login,
    verifyOTP,
    logout,
    getMe
} from "../controllers/authController.js"

const router = Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: User must verify email before login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully, verification email sent
 */
router.post("/register", register)

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get("/verify-email", verifyEmail)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user (Step 1 - send OTP)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to WhatsApp
 */
router.post("/login", login)

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify login OTP (Step 2)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/verify-otp", verifyOTP)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Return user profile from cookie session
 */
router.get("/me", getMe)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logout)

export default router