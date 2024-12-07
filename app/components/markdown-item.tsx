import 'highlight.js/styles/github-dark.css'
import { RefObject, useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

export function MarkdownItem({
  text,
  viewRef,
  onSetIdle,
}: {
  text: string
  viewRef: RefObject<HTMLDivElement>
  onSetIdle: () => void
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
        onSetIdle()
        clearInterval(intervalID.current)
      }
    }, 50)

    return () => {
      clearInterval(intervalID.current)
    }
  }, [text, onSetIdle])

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
