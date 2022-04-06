import React from "react"
import { Button } from "./Button"

export const Hero = () => {
  return (
    <div className="flex flex-col items-center pt-24 pb-12 px-4 w-screen bg-slate-50">
      <div className="text-5xl lg:text-6xl font-bold">Post your review, post-publication</div>
      <div className="text-xl text-slate-700 mt-6">
        Share your thoughts with those who care—Opinions in science have never been this accessible
      </div>
      <div id="action-container" className="my-6">
        <Button onClick={undefined}>Start Browsing</Button>
      </div>
    </div>
  )
}
