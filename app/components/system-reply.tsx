import Image from "next/image";
import { ChatHistory } from "./chat-form";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import "highlight.js/styles/github-dark.css"; 

export function SystemReply({ chatItem }: { chatItem: ChatHistory }) {
  return (
    <div key={chatItem.id} className="grid grid-cols-[auto,1fr] gap-3  pb-4">
      <div className="size-9">
        <Image
          src="/adu_vai.webp"
          alt="adhu vai avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
      <div className="overflow-x-auto prose prose-invert max-w-full">
        {chatItem.parts.map((item, i) => (
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeHighlightLines]} key={i}>{item.text}</Markdown>
        ))}
      </div>
    </div>
  )
}
