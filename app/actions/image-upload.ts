'use server'

import { GoogleAIFileManager } from '@google/generative-ai/server'

export async function imageUpload(formData: FormData) {
  const apiKey = process.env.AI_API_KEY
  if (!apiKey) throw new Error('API KEY is missing')
  const files = formData.getAll('files') as File[]
  if (!files) throw new Error('No file is selected')
  const fileManager = new GoogleAIFileManager(apiKey)

  const uploadResults = await Promise.all(
    files.map((file) => {
      return fileManager.uploadFile(file.webkitRelativePath, {
        mimeType: file.type,
        displayName: file.name,
      })
    }),
  )
  return uploadResults
}
