import { useRouter } from "blitz"
import React from "react"
import EnterDOI from "./EnterDOI"

export const Hero = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col items-center pt-24 pb-12 px-4 w-full bg-gray-light dark:bg-gray-dark">
        <div className="text-5xl lg:text-6xl font-bold text-gray-darkest dark:text-white">PostReview</div>
        <div className="text-xl text-center text-gray-darkest dark:text-gray-light mt-6">
          Share your thoughts and be part of a collective knowledge
        </div>
        <div id="action-container" className="my-6 flex flex-col w-full lg:w-1/2 bg-gray-darkest dark:bg-black">
          <EnterDOI />
        </div>
        <div id="action-container" className="text-xl text-green rounded-lg bg-gray-medium dark:bg-gray-medium hover:bg-gray-darkest">
          <button className="mx-4 my-4" onClick={() => router.push("signup")}>
            Get started
          </button></div>
      </div>
    </>
  )
}
