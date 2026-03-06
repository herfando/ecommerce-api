import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const register = async (req, res) => {
    try {
        const { name, phone, email, password, confirmPassword } = req.body;
        // 1️⃣ Validasi dasar
        if (!name || !phone || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // 2️⃣ Cek email sudah ada atau belum
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // 4️⃣ Simpan user
        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1️⃣ Cek user ada
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // 3️⃣ Generate JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            message: "Login successful",
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
