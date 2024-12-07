import { memo, useRef } from 'react'
import { BlankScreen } from './blank-screen'
import { ChatHistory } from './chat-form'
import { PendingAvatar } from './pending-avatar'
import { SystemReply } from './system-reply'

function ChatDisplay({
  chatHistory,
  forceSubmit,
  onSetIdle,
  status,
}: {
  chatHistory: ChatHistory[]
  forceSubmit: (prePrompt: string) => void
  onSetIdle: () => void
  status: 'pending' | 'typing' | 'idle'
}) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {chatHistory.length > 0 ? (
        <div className="space-y-6 pb-20 pt-10">
          {chatHistory.map((chatItem) => {
            if (chatItem.role === 'user') {
              return (
                <div key={chatItem.id} className="flex justify-end">
                  {chatItem.parts.map((item, i) => (
                    <div
                      key={i}
                      className="max-w-lg whitespace-pre-wrap break-words rounded-2xl bg-[#272727] px-4 py-2"
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
                onSetIdle={onSetIdle}
              />
            )
          })}
          {status === 'pending' && <PendingAvatar />}
        </div>
      ) : (
        <BlankScreen forceSubmit={forceSubmit} />
      )}
      <div ref={viewRef} />
    </>
  )
}

export const MemorizedChatDisplay = memo(ChatDisplay)
