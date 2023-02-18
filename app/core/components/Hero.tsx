import { useRouter } from "blitz"
import React from "react"
import EnterDOI from "./EnterDOI"

export const Hero = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex w-full flex-col items-center bg-gray-light px-4 pt-24 pb-12 dark:bg-gray-dark">
        <div className="text-5xl font-bold text-gray-darkest dark:text-white lg:text-6xl">
          PostReview
        </div>
        <div className="mt-6 text-center text-xl text-gray-darkest dark:text-gray-light">
          Share your thoughts and be part of a collective knowledge
        </div>
        <div
          id="action-container"
          className="my-6 flex w-full flex-col bg-gray-darkest dark:bg-black lg:w-1/2"
        >
          <EnterDOI />
        </div>
        <div
          id="action-container"
          className="rounded-lg bg-gray-medium text-xl text-green hover:bg-gray-darkest dark:bg-gray-medium"
        >
          <button className="mx-4 my-4" onClick={() => router.push("signup")}>
            Get started
          </button>
        </div>
      </div>
    </>
  )
}
