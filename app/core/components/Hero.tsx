import { useRouter } from "blitz"
import React from "react"
import { Button } from "./Button"
import EnterDOI from "./EnterDOI"

export const Hero = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center pt-24 pb-12 px-4 w-full bg-slate-50">
      <div className="text-5xl lg:text-6xl font-bold">Post your review, post-publication</div>
      <div className="text-xl text-slate-700 mt-6">
        Share your thoughts with those who care—Opinions in science have never been this accessible
      </div>
      <div id="action-container" className="my-6 flex flex-row w-full lg:w-1/2">
        <EnterDOI />
        <Button additionalClass="my-4" onClick={() => router.push("browse")}>
          Start Browsing
        </Button>
      </div>
    </div>
  )
}
