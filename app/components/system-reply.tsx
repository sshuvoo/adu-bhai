import Image from 'next/image'
import { ChatHistory } from './chat-form'
import { MarkdownItem } from './markdown-item'
import { RefObject } from 'react'

export function SystemReply({
  chatItem,
  viewRef,
  onSetIdle,
}: {
  chatItem: ChatHistory
  viewRef: RefObject<HTMLDivElement>
  onSetIdle: () => void
}) {
  return (
    <div key={chatItem.id} className="grid grid-cols-[auto,1fr] gap-3 pb-4">
      <div className="size-9">
        <Image
          src="/adu_bhai.svg"
          alt="adhu vai avatar"
          width={36}
          height={36}
          className="rounded-full bg-white"
        />
      </div>
      <div className="prose prose-invert max-w-full overflow-x-auto prose-code:rounded-md prose-code:px-1 prose-code:py-1 prose-code:text-orange-500">
        {chatItem.parts.map((item, i) => (
          <MarkdownItem
            onSetIdle={onSetIdle}
            viewRef={viewRef}
            key={i}
            text={item.text}
          />
        ))}
      </div>
    </div>
  )
}
