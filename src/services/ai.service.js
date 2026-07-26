import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage , SystemMessage, tool , createAgent} from "langchain"
import { ChatMistralAI, MistralAI } from "@langchain/mistralai"
import * as z from "zod"
import { searchInternet } from "./internet.service.js";

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0
});

const geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Search the internet for information using Tavily API. Input is a query string, output is a list of search results.",
        Schema: z.object({
            query: z.string().describe("The search query tolook up the internet.")
        }),
    }
)

const agent = createAgent({
    model: geminimodel,
    tools: [searchInternetTool],
})

export async function generateResponse(messages) { // user ka msg ai ko bhej rhe h or ai ka response hame milega
    try {
        const response = await agent.invoke({
            messages: [
                new SystemMessage(`You are a helpful assistant. You will be provided with a series of messages from a user. Your task is to generate
                    a relevant and informative response based on the conversation history. If the user asks for information that requires searching the internet,
                    you can use the searchInternet tool to fetch relevant data. Please ensure your responses are clear, concise, and accurate.`),
                ...(messages.map(msg=>{
                if(msg.role == "user"){
                    return new HumanMessage(msg.content)
                }else if(msg.role == "ai"){
                    return new AIMessage(msg.content)
                }   
        })) ]})

        return response.messages[ response.messages.length-1].text
        // console.log(response.text)

    } catch (error) {
        console.error("AI call failed:", error.message)
        throw error
    }
}

export async function generateTitle(message) { // title generate krne k liye ai ko msg bhej rhe h
    
    /** AI ko bta rhe h usko kese kam krna h  */
    const response = await geminimodel.invoke([
        new SystemMessage(`You are a title generator. Generate a title for the following text: ${message}
            
            user will provide you with a text and you will generate a title for it in 2-3 words. 
            Do not add any extra text or explanation. Only provide the title.

            `),
        // user ka msg bhej rhe h
        new HumanMessage(`Generate a title for the following first text: ${message}`)
    ])

    return response.text
}