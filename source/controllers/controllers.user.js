import User from "../models/models.user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export class UserController {
    static async signup(req, res) {
        try {
            const { username, password } = req.body

            const exitingUser = await User.findOne({ username })
            if (exitingUser) {
                return res.status(400).json({message: "Username already exists"})
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                password: hashedPassword
            })
            await newUser.save()

            res.status(201).json({ message: "User registered successfully" })
        } catch (error) {
            res.status(500).json({ message: "Registration failed", error })
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" })
            }

            const token = jwt.sign(
                {id: user._id, username: user.username},
                JWT_SECRET, 
                {expiresIn: "1h"}
            )

            res.status(200).json({
                message: "Login successful",
                token
            })
        } catch (error) {
            res.status(500).json({ message: "Login failed", error })
        }
    }
}


const JWT_SECRET = "hello-kttiy" 

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Access token is missing or invalid" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", error })
    }
}