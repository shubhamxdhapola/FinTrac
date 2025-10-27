import { generateToken } from "../libs/generateToken.js";
import { sendCookie } from "../libs/sendCookie.js";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, profileImage } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All field are required!" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ message: "User already exists" })
        }

        const user = await User.create({ fullName, email, password, profileImage })
        if (user) {
            const token = generateToken(user._id);
            sendCookie(token, res)
            res.status(201).json({
                user: {
                    userId: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profileImage: user.profileImage
                }
            })
        } else {
            return res.status(500).json({ message: "Unable to register user" })
        }
    } catch (error) {
        console.log("Error in registerUser controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All field are required!" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const passwordCorrect = await user.comparePassword(password);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        if (user) {
            const token = generateToken(user._id);
            sendCookie(token, res)
            res.status(200).json({
                user: {
                    userId: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profileImage: user.profileImage
                }
            })
        }
    } catch (error) {
        console.log("Error in loginUser controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getUserInfo = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in getUserInfo controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logoutUser = async (_, res) => {
    try {
        res.cookie('authToken', "", { maxAge: 0, secure: true, sameSite: "None" })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}