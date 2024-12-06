import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { RefObject, useEffect, useRef, useState } from 'react'

export function MarkdownItem({
  text,
  viewRef,
}: {
  text: string
  viewRef: RefObject<HTMLDivElement>
}) {
  const [markDown, setMarkDown] = useState('')
  const index = useRef(0)
  const intervalID = useRef<NodeJS.Timeout>()
  const CHUNK_SIZE = 5

  useEffect(() => {
    intervalID.current = setInterval(() => {
      const chunk = text.slice(index.current, index.current + CHUNK_SIZE)
      setMarkDown((prev) => prev + chunk)
      index.current += CHUNK_SIZE
      if (index.current > text.length) {
        clearInterval(intervalID.current)
      }
    }, 50)

    return () => {
      clearInterval(intervalID.current)
    }
  }, [text])

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView()
    }
  }, [markDown, viewRef])

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
    >
      {markDown}
    </Markdown>
  )
}
