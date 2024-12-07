import { RefObject, useEffect } from 'react'
import { ChatHistory } from './chat-form'

export function UserPrompt({
  chatItem,
  viewRef,
}: {
  chatItem: ChatHistory
  viewRef: RefObject<HTMLDivElement>
}) {
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView()
    }
  }, [viewRef])

  return (
    <div className="flex justify-end">
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
