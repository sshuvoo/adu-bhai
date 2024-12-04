'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatHistory {
  role: 'model' | 'user'
  parts: { text: string }[]
}

export async function promptRequest(prompt: string, history: ChatHistory[]) {
  try {
    const apiKey = process.env.AI_API_KEY
    if (!apiKey) throw new Error('API KEY is missing')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const chat = model.startChat({ history })
    const result = await chat.sendMessage(prompt)
    return result.response.text()
  } catch (error) {
    console.log(error)
  }
}
