import { Router } from "express"
import { sendMessage } from "../contollers/chat.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message", authMiddleware, sendMessage)


export default chatRouter