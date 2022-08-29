import React, { useState } from "react"
import { Image } from "blitz"
import thankYouContainer from "public/thank-you-container.png"
import thankYouRibbon from "public/thank-you-ribbon.png"

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
      <div id="thank-you-badge" className="flex flex-col items-center min-h-screen">
        <div className="relative mt-56 mx-4">
          <div
            id="thank-you-message"
            className="absolute top-56 left-28 z-50 text-md text-center font-semibold text-gray-dark"
          >
            Thanks for reviewing!
          </div>
          <div
            id="thank-you-message-variation"
            className="absolute top-60 left-20 py-3 z-50 text-3xl text-center w-56 font-['Special_Elite'] font-bold text-black"
          >
            {isFirst ? "You're No. 1!" : currentMessage}
          </div>
          <div className="absolute z-50">
            <Image
              className="animate-[spin_10s_linear_infinite]"
              src={thankYouContainer}
              alt="An image of a circle border"
              width={600}
              height={600}
            />
          </div>
          <div id="thank-you-ribbon" className="">
            <Image src={thankYouRibbon} alt="An image of a green ribbon" width={400} height={400} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYouBadge
