import { Router } from "express"
import { deleteChat, getChats, getMessages, sendMessage } from "../contollers/chat.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message", authMiddleware, sendMessage)

chatRouter.get("/", authMiddleware, getChats)

chatRouter.get("/:chatId/message",authMiddleware , getMessages)

chatRouter.delete("/delete/:chatId", authMiddleware , deleteChat)

export default chatRouter