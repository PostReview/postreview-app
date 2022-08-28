import React, { useState } from "react"
import thankYouBadge from "public/thank-you-badge.png"
import { Image } from "blitz"

const ThankYouBadge = (props) => {
  const { isFirst } = props
  const possibleMessages = [
    "You're Awesome!",
    "You're the Champ!",
    "Great Input!",
    "Much Appreciated!",
    "Excellent!",
    "You are Fantastic!",
    "Wonderful!",
    "Magnificent!",
    "Right on!",
    "Sensational!",
    "Outstanding!",
    "I'm speechless!",
    "Nice Work!",
    "Your Voice Matters!",
    "Phenomenal!",
    "Keep it up!",
  ]
  const selectedMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)]

  const [currentMessage, setCurrentMessage] = useState(selectedMessage)

  return (
    <>
      <div id="badge-container" className="flex flex-col relative min-h-screen items-center mt-56">
        <Image src={thankYouBadge} alt="An image of a badge container" width={400} height={400} />
        <div
          id="thank-you-message"
          className="absolute text-md text-center top-56 pt-1 font-semibold text-gray-dark"
        >
          Thanks for reviewing!
        </div>
        <div
          id="thank-you-message-variation"
          className="absolute text-3xl text-center w-56 top-64 font-['Special_Elite'] font-bold text-black"
        >
          {isFirst ? "You're No. 1!" : currentMessage}
        </div>
      </div>
    </>
  )
}

export default ThankYouBadge
