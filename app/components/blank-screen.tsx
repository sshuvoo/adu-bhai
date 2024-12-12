import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const aduBhaiFacts: string[] = [
  'Here sleeps Adu Mia who was promoted from Class VII to Class VIII.',
  'Forever in Class Seven: Adu Bhai is the eternal seventh-grader who somehow never gets promoted, even though his son is in class eight.',
  "Master of Mischief: He's the ultimate troublemaker, always finding ways to turn ordinary situations into hilarious adventures.",
  'Logic Expert (Sort of): Adu Bhai has his own unique logic for everything, which often leaves everyone laughing—or scratching their heads!',
  "Parents' Eternal Headache: His parents have accepted that Adu Bhai's antics are part of life, though they still hope he'll focus on his studies someday.",
  'Witty Comebacks: No matter the situation, Adu Bhai always has a quick, witty comeback ready to save the day (or make it worse).',
  'King of Daydreams: Adu Bhai is a pro at zoning out and creating wild fantasies, even in the middle of a lecture.',
  'Beloved Yet Baffling: Despite all his quirks, Adu Bhai is loved by his friends and family because he brings laughter and light wherever he goes.',
  "The Underdog Hero: Somehow, he always manages to turn the tables in his favor, proving that brains aren't always in the books.",
  'Inventor of Fun: Adu Bhai can make fun out of anything, from a boring math class to a simple walk in the park.',
  'Timeless Charm: No matter how much time passes, Adu Bhai stays the same—forever young, mischievous, and full of life!',
]

export function BlankScreen({
  forceSubmit,
}: {
  forceSubmit: (prePrompt: string) => void
}) {
  const [text] = useState(
    aduBhaiFacts[Math.floor(Math.random() * aduBhaiFacts.length)],
  )
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
  }, [text])

  return (
    <div className="flex h-full flex-col py-3">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Link target="_blank" href="https://github.com/sshuvoo">
          <Image
            src="/adu_bhai.svg"
            alt="adhu vai avatar"
            width={100}
            height={100}
            className="rounded-full bg-white"
          />
        </Link>
        <h1 className="w-full px-4 text-center text-lg font-medium">{chunk}</h1>
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
