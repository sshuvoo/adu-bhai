'use client'

import { useEffect, useRef, useState } from 'react'
import { CgAttachment } from 'react-icons/cg'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { promptRequest } from '../actions/prompt-request'
import { SystemReply } from './system-reply'
import Image from 'next/image'

export interface ChatHistory {
  id: string
  role: 'model' | 'user'
  parts: { text: string }[]
}

export function ChatForm() {
  const [prompt, setPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const viewRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    const tempPromt = prompt
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

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView()
    }
  }, [chatHistory])

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col py-8 text-white">
      <div className="flex-grow space-y-6 overflow-y-auto pb-8">
        {chatHistory.length>0? chatHistory.map((chatItem) => {
          if (chatItem.role === 'user') {
            return (
              <div key={chatItem.id} className="flex flex-col items-end">
                {chatItem.parts.map((item, i) => (
                  <div
                    key={i}
                    className="max-w-lg whitespace-pre-wrap rounded-2xl bg-[#272727] px-4 py-2"
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            )
          }
          return <SystemReply key={chatItem.id} chatItem={chatItem}/>
        }):
        <div className='h-full flex flex-col justify-center items-center gap-4'>
            <Image
              src="/adu_vai.webp"
              alt="adhu vai avatar"
              width={150}
              height={150}
              className='rounded-full'
            />
            <h1 className='text-3xl font-medium'>Hey! It&apos;s your Adu Vai</h1>
          </div>
        }
        <div ref={viewRef} />
      </div>
      <form
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
          <input
            className="w-full bg-transparent text-white focus:outline-none"
            placeholder="Ask Something To Adu Bhai"
            value={prompt}
            onChange={(e) => void setPrompt(e.target.value)}
          />
          <div className="flex items-center justify-between text-white">
            <button type="button" className="size-5">
              <CgAttachment className="size-full" />
            </button>
            <button type="submit" className="size-6">
              <FaArrowAltCircleUp
                className={`size-full ${prompt.trim() !== '' ? '' : 'text-gray-500'}`}
              />
            </button>
          </div>
        </label>
      </form>
    </div>
  )
}
