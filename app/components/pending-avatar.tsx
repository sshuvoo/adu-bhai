import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2'

const aiThinkingMessages: string[] = [
  'Thinking deeply... hold on!',
  'Analyzing the universe...',
  'Crafting brilliance for you...',
  'Decoding your thoughts...',
  'Gathering digital insights...',
  'Crunching data... almost there!',
  'Shaping your genius response...',
  'Unraveling the mysteries...',
  'Cooking up your reply...',
  'Brainstorming for brilliance...',
  'Consulting the AI realms...',
  'Curiosity sparks great ideas!',
  'Mining insights... stay tuned!',
  'Innovating your perfect answer...',
  'Pulling threads of knowledge...',
  'Exploring digital possibilities...',
  'Tuning into wisdom waves...',
  'Unlocking the answer vault...',
  'Firing up creativity engines...',
  'Brewing a fine response...',
  'Diving into the data...',
  'Letting circuits work magic...',
  'Deciphering your great query...',
  'Scanning AI archives now...',
  'Answer incoming... hold tight!',
  'Shaping brilliance for you...',
]

export function PendingAvatar() {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-3 pb-4">
      <Link
        target="_blank"
        href="https://github.com/sshuvoo"
        className="relative size-9"
      >
        <Image
          src="/adu_bhai.svg"
          alt="adhu vai avatar"
          width={36}
          height={36}
          className="rounded-full bg-white"
        />
        <HiOutlineChatBubbleLeftEllipsis className="absolute -right-4 -top-5 text-2xl" />
      </Link>
      <div>
        {
          aiThinkingMessages[
            Math.floor(Math.random() * aiThinkingMessages.length)
          ]
        }
      </div>
    </div>
  )
}
