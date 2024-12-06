'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { CgAttachment } from 'react-icons/cg'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { promptRequest } from '../actions/prompt-request'
import { MemorizedChatDisplay } from './chat-display'
import { imageUpload } from '../actions/image-upload'

export interface ChatHistory {
  id: string
  role: 'model' | 'user'
  parts: { text: string }[]
}

const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/heic',
  'image/heif',
]

export function ChatForm() {
  const [prompt, setPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const promptBox = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  // const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)

  const handleSubmit = async (prePrompt?: string) => {
    if (!prompt.trim() && !prePrompt) return
    const tempPromt = prePrompt || prompt
    setPrompt('')
    try {
      const result = await promptRequest(
        tempPromt,
        chatHistory.map(({ role, parts }) => ({ role, parts })),
      )
      if (result) {
        setChatHistory((pre) => [
          ...pre,
          {
            id: crypto.randomUUID(),
            role: 'model',
            parts: [{ text: result }],
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const forceSubmit = (prePrompt: string) => {
    setChatHistory((pre) => [
      ...pre,
      {
        id: crypto.randomUUID(),
        role: 'user',
        parts: [{ text: prePrompt }],
      },
    ])
    handleSubmit(prePrompt)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey && formRef.current) {
        event.preventDefault()
        formRef.current.requestSubmit()
      }
    }
  }

  useEffect(() => {
    if (promptBox.current) {
      promptBox.current.style.height = 'auto'
      const newHeight = Math.min(promptBox.current.scrollHeight, 250)
      promptBox.current.style.height = `${newHeight}px`
    }
  }, [prompt])

  const handleClickFile = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const filesArr = Array.from(files)
      const formData = new FormData()
      filesArr.forEach((file) => {
        formData.append('files', file)
      })
      try {
        const response = await imageUpload(formData)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col py-8 text-white">
      <MemorizedChatDisplay
        chatHistory={chatHistory}
        forceSubmit={forceSubmit}
      />
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          setChatHistory((pre) => [
            ...pre,
            {
              id: crypto.randomUUID(),
              role: 'user',
              parts: [{ text: prompt }],
            },
          ])
          handleSubmit()
        }}
        className="w-full"
      >
        <label className="block w-full cursor-text space-y-4 rounded-3xl bg-[#303030] px-4 py-4">
          <textarea
            ref={promptBox}
            className="h-auto max-h-[300px] w-full resize-none bg-transparent text-white focus:outline-none"
            placeholder="Ask Something To Adu Bhai"
            value={prompt}
            rows={1}
            onKeyDown={handleKeyDown}
            onChange={(e) => void setPrompt(e.target.value)}
          />
          <input
            disabled
            onChange={handleFileChange}
            accept={allowedMimeTypes.join(', ')}
            ref={fileRef}
            type="file"
            hidden
            multiple
          />
          <div className="flex items-center justify-between text-white">
            <button onClick={handleClickFile} type="button" className="size-5">
              <CgAttachment className="size-full" />
            </button>
            <button
              type="submit"
              disabled={prompt.trim() === ''}
              className="size-6 disabled:text-gray-500"
            >
              <FaArrowAltCircleUp className="size-full" />
            </button>
          </div>
        </label>
      </form>
    </div>
  )
}
