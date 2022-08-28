import React, { useState } from "react"
import thankYouBadge from "public/thank-you-badge.png"
import { Image } from "blitz"

const ThankYouBadge = (props) => {
  const { isFirst } = props
  const possibleMessages = [
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
      </div>
    </>
  )
}

export default ThankYouBadge
