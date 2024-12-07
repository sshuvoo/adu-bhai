import { memo, useRef } from 'react'
import { BlankScreen } from './blank-screen'
import { ChatHistory } from './chat-form'
import { PendingAvatar } from './pending-avatar'
import { SystemReply } from './system-reply'
import { UserPrompt } from './user-reply'

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
              return <UserPrompt viewRef={viewRef} key={chatItem.id} chatItem={chatItem} />
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
