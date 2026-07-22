import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"


/** ye hamne ek api create ki h jab user pehla msg bhejta h to uske basis pr title generate krke dega 
 * or fir uske basis pr ai ka response bhejega or dono ko database me save kr dega
 */
export async function sendMessage(req,res) {
    const { message, chat: chatId } = req.body  // jo bhi msg aara hoga vo req.body se aayega or ye msg ham bhej rhe h ai ko
    
    const result = await generateResponse(message)  // result me ai hame message send krega 

    let title = null , chat = null // title or chat ko null se initialize kr rhe h kyu ki agar user ka chat id hoga to title or chat ko null hi rehne denge or agar user ka chat id nhi hoga to title generate krke chat me save kr denge

    if(!chatId) {
        title = await generateTitle(message) // title generate krne k liye ai ko msg bhej rhe h
        
        chat = await chatModel.create({ // chat model me user ka id or title save kr rhe h
            user: req.user.id,
            title: title
        }) 
    }

    const messages = await messageModel.find({ chat: chatId || chat._id }).sort({ createdAt: 1 }) // message model me chat ka id, role or content save kr rhe h

    const userMessage = await messageModel.create({ // message model me chat ka id, role or content save kr rhe h
        chat: chat._id,
        role: "user",
        content: message
    })

    const aiMessage = await messageModel.create({ // message model me chat ka id, role or content save kr rhe h
        chat: chat._id,
        role: "ai",
        content: result
    })

    res.status(201).json({
        title: title,
        chat,
        aiMessage
    })

}