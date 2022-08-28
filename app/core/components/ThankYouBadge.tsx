import React, { useState } from "react"
import thankYouBadge from "public/thank-you-badge.png"
import { Image } from "blitz"

const ThankYouBadge = (props) => {
  return (
    <>
      <div id="badge-container" className="flex flex-col relative min-h-screen items-center mt-56">
        <Image src={thankYouBadge} alt="An image of a badge container" width={400} height={400} />
      </div>
    </>
  )
}

export default ThankYouBadge
