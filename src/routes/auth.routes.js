import { Router } from "express"
import authController from "../contollers/auth.controller.js"
import { registerValidater, loginValidator } from "../validators/register.validator.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 * @returns { success, message, user }
 */
authRouter.post("/register", registerValidater, authController.userRegister)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @body { email, password }
 * @returns { success, message, token }
 */
authRouter.post("/login", loginValidator, authController.userLogin)

/**
 * @route GET /api/auth/me
 * @desc Get the authenticated user's information
 * @access Private
 * @returns { success, user }
 */
authRouter.get("/get-me", authMiddleware, authController.getMe)


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 * @returns { success, message }
 */
authRouter.get("/verify-email", authController.verifyEmail)

export default authRouter