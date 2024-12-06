import { memo, useRef } from 'react'
import { ChatHistory } from './chat-form'
import { SystemReply } from './system-reply'
import Image from 'next/image'

function ChatDisplay({
  chatHistory,
  forceSubmit,
}: {
  chatHistory: ChatHistory[]
  forceSubmit: (prePrompt: string) => void
}) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex-grow space-y-6 overflow-y-auto pb-8">
      {chatHistory.length > 0 ? (
        chatHistory.map((chatItem) => {
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
          return (
            <SystemReply
              viewRef={viewRef}
              key={chatItem.id}
              chatItem={chatItem}
            />
          )
        })
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="flex flex-grow flex-col items-center justify-center">
            <Image
              src="/adu_vai.webp"
              alt="adhu vai avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h1 className="text-3xl font-medium">
              Hey! It&apos;s your Adu Vai
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <button
              onClick={forceSubmit.bind(
                null,
                'Explain binary search with JavaScript!',
              )}
              className="rounded-3xl border border-green-500 bg-green-500/10 px-2 py-1 text-green-500"
            >
              Explain binary search!
            </button>
            <button
              onClick={forceSubmit.bind(null, 'Write me a joke!')}
              className="rounded-3xl border border-orange-500 bg-orange-500/10 px-2 py-1 text-orange-500"
            >
              Write me a joke!
            </button>
            <button
              onClick={forceSubmit.bind(
                null,
                "Top European countries'(5) statistics in table format",
              )}
              className="rounded-3xl border border-sky-500 bg-sky-500/10 px-2 py-1 text-sky-500"
            >
              Top European countries&apos; statistics
            </button>
          </div>
        </div>
      )}
      <div ref={viewRef} />
    </div>
  )
}

export const MemorizedChatDisplay = memo(ChatDisplay)
