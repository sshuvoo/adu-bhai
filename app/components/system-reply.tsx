import Image from 'next/image'
import { ChatHistory } from './chat-form'
import { MarkdownItem } from './markdown-item'
import { RefObject } from 'react'

export function SystemReply({
  chatItem,
  viewRef,
}: {
  chatItem: ChatHistory
  viewRef: RefObject<HTMLDivElement>
}) {
  return (
    <div key={chatItem.id} className="grid grid-cols-[auto,1fr] gap-3 pb-4">
      <div className="size-9">
        <Image
          src="/adu_vai.webp"
          alt="adhu vai avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
      <div className="prose prose-invert max-w-full overflow-x-auto">
        {chatItem.parts.map((item, i) => (
          <MarkdownItem viewRef={viewRef} key={i} text={item.text} />
        ))}
      </div>
    </div>
  )
}
