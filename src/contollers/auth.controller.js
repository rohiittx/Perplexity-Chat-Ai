import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"
import jwt from "jsonwebtoken"

async function userRegister(req, res) {
    try {
        const { username, email, password } = req.body

        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }],
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists email or username",
                err: "user alredy exist"
            })
        }

        const user = await userModel.create({ username, email, password })

        const emailVerificationToken = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET)

        try {await sendEmail({
            to: email,
            subject: "Welcome to Our Perplexity!",
            html: `<h1>Welcome,\n ${username}!</h1>
                    <p>Thank you for registering.</p>,
                    <p> Click the link below to verify your email address </p>
                    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>`,
            text: `Welcome, ${username}, \n\n ! Thank you for registering at Perplexity. we are excited to have you on board`,
            
            })
        } catch(emailError){
            console.error("Email failed but user created:", emailError)
        }
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Registration failed",
        })
    }
}

async function verifyEmail(req,res) {
     
    const {token} = req.query

    try {
        const decoded = jwt.verify( token , process.env.JWT_SECRET)
    
        const user = await userModel.findOne({ email: decoded.email })

        if(!user){
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err:"user not found"
            })
        }

        user.verified = true;

        await user.save()

        const Html = `
            <h1> Email verified successfully </h1>
            <p> Your email has been verified. you can now log in toyour account. </p>
            <a href="http://localhost:3000/login"> Go to Login </a>
        `
        
        return res.status(200).send(Html);

    } catch (error) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err:"user not found"
        })
    }

}

async function userLogin(req, res) {
    const { email, password } = req.body    

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            err:"user not found"
        })
    }

    if (!user.verified) {
        return res.status(403).json({
            success: false,
            message: "Email not verified",
            err:"email not verified"
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
            err:"invalid password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    })

    res.cookie("token", token )

    return res.status(200).json({
        success: true,
        message: "Login successful",

        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })  
}

async function getMe(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
            err:"user not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
    })
}


export default {
    userRegister,
    verifyEmail,
    userLogin ,
    getMe
}