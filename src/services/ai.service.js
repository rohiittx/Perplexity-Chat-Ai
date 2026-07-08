import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAi() {
    model.invoke("tell me whether forecast of tommorow in agra today date is 8 july 2026 ").then((response) => {
        console.log(response.text)
    })
}