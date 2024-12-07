import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const text =
  "It's your Adu Bhai, the one and only! Despite my best efforts, I'm still stuck in class 6, while my son has been promoted to class 7. Can you believe it? My son lectures me like he's the dad now! 🙂"

export function BlankScreen({
  forceSubmit,
}: {
  forceSubmit: (prePrompt: string) => void
}) {
  const intervalID = useRef<NodeJS.Timeout>()
  const index = useRef(0)
  const [chunk, setChunk] = useState('')

  useEffect(() => {
    intervalID.current = setInterval(() => {
      const chunk = text.slice(index.current, index.current + 1)
      setChunk((prev) => prev + chunk)
      index.current += 1
      if (index.current > text.length) {
        clearInterval(intervalID.current)
      }
    }, 100)

    return () => {
      clearInterval(intervalID.current)
    }
  }, [])

  return (
    <div className="flex h-full flex-col py-3">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Image
          src="/adu_bhai.svg"
          alt="adhu vai avatar"
          width={100}
          height={100}
          className="rounded-full bg-white"
        />
        <h1 className="w-full px-4 text-xl font-medium">{chunk}</h1>
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
          onClick={forceSubmit.bind(null, 'Write me a motivational quote!')}
          className="rounded-3xl border border-orange-500 bg-orange-500/10 px-2 py-1 text-orange-500"
        >
          Write me a quote!
        </button>
        <button
          onClick={forceSubmit.bind(
            null,
            'Provide a table displaying statistics for the top 5 South Asian countries, including their GDP, population, literacy rate, and birth rate.',
          )}
          className="rounded-3xl border border-sky-500 bg-sky-500/10 px-2 py-1 text-sky-500"
        >
          South Asian countries&apos; statistics
        </button>
      </div>
    </div>
  )
}
