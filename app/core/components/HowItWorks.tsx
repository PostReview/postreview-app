import React from 'react'

export const HowItWorks = () => {
  return (
    <div
      className="flex flex-col items-start text-2xl min-h-screen justify-evenly">
      <div className="self-center text-4xl">
        How it Works
      </div>
      <div>
        <span className="mx-6">
          Step 1: Pick a paper
        </span>
        <span>
          [SEARCH BOX HERE]
        </span>
      </div>
      <div>
        <span className="mx-6">
          Step 2: Rate this paper
        </span>
        <span>
          [Rating Image Here]
        </span>
      </div>
      <div>
        <span className="mx-6">
          Step 3: Your rating is recorded
        </span>
        <span>
          [Rating Image Here]
        </span>
      </div>
      <div>
        <span className="mx-6">
          Step 4: All users&apos; ratings are combined
        </span>
        <span>
          [Paper card here]
        </span>
      </div>
    </div>
  )
}
