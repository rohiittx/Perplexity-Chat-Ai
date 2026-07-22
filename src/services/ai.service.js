import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage , SystemMessage } from "langchain"
import { ChatMistralAI, MistralAI } from "@langchain/mistralai"

const model = new ChatMistralAI({
model: "mistral-large-latest",
temperature: 0
});

const geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

export async function generateResponse(message) { // user ka msg ai ko bhej rhe h or ai ka response hame milega
    try {
        const response = await geminimodel.invoke([
            new HumanMessage(message) // user ka message aayega idhr
        ])

        return response.text
        // console.log(response.text)

    } catch (error) {
        console.error("AI call failed:", error.message)
    }
}

export async function generateTitle(message) { // title generate krne k liye ai ko msg bhej rhe h
    
    /** AI ko bta rhe h usko kese kam krna h  */
    const response = await mistralModel.invoke([
        new SystemMessage(`You are a title generator. Generate a title for the following text: ${message}
            
            user will provide you with a text and you will generate a title for it in 2-3 words. 
            Do not add any extra text or explanation. Only provide the title.

            `),
        new HumanMessage(`Generate a title for the following first text: ${message}`)
    ])

    return response.text
}