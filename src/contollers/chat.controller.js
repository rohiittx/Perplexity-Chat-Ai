import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"


/** ye hamne ek api create ki h jab user pehla msg bhejta h to uske basis pr title generate krke dega 
 * or fir uske basis pr ai ka response bhejega or dono ko database me save kr dega
 */
export async function sendMessage(req,res) {
    
    const { message, chat: chatId } = req.body  // jo bhi msg aara hoga vo req.body se aayega or ye msg ham bhej rhe h ai ko
    
    let title = null , chat = null // title or chat ko null se initialize kr rhe h kyu ki agar user ka chat id hoga to title or chat ko null hi rehne denge or agar user ka chat id nhi hoga to title generate krke chat me save kr denge
    
    let currentChatId;
    
    // check lga rhe h ki agar user ka chat id hoga to title or chat ko null hi rehne denge or agar user ka chat id nhi hoga to title generate krke chat me save kr denge
    if(!chatId) {
        title = await generateTitle(message) // title generate krne k liye ai ko msg bhej rhe h
        
        chat = await chatModel.create({ // chat model me user ka id or title save kr rhe h
            user: req.user.id,
            title: title
        }) 
        
        currentChatId = chat._id;
    }else {
        currentChatId = chatId;
    }

    // fir naya user msg save kiya
    const userMessage = await messageModel.create({ // message model me chat ka id, role or content save kr rhe h
        chat: currentChatId,
        role: "user",
        content: message
    })
    
    // purani history fetch kari chat ki
    const messages = await messageModel.find({ chat: chatId || currentChatId }).sort({ createdAt: 1 }) // message model me chat ka id, role or content save kr rhe h
    
    const result = await generateResponse(messages)  // result me ai hame message send krega 

    // ab AI ko poora array bhej diya: purani history + naya message
    const aiMessage = await messageModel.create({ // message model me chat ka id, role or content save kr rhe h
        chat: currentChatId,
        role: "ai",
        content: result
    })

    res.status(201).json({
        title: title,
        chat,
        aiMessage
    })

}

export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req,res) {
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({ chat: chatId })

     res.status(200).json({
        message: "Chats retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat successfully deleted"
    })
}
