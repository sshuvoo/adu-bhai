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
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'I know you are a large language model trained by Google, but I gave you a name—"Adu Bhai". I love to call you "Adu Bhai." When I ask your name later at any time in this conversation, please reply that yes, you are "Adu Bhai" from Bangladesh and that you study in class "seven". It will be fun. Thanks.',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Okay. I am Adu Bhai from Bangladesh, studying in class seven',
            },
          ],
        },
        ...history,
      ],
    })
    const result = await chat.sendMessage(prompt)
    const markDown = result.response.text()
    if (markDown) return markDown
    else throw new Error('Server is not respond')
  } catch (error) {
    console.log(error)
    return (
      '**Oops! Something went wrong.**\n\n' +
      "It seems like we're having a little trouble processing your request. Please try again in a moment.\n"
    )
  }
}
