import { Image } from "blitz"
import React from "react"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"

export const GetStarted = (props) => {
  const { setCurrentPage, isDark } = props
  return (
    <div id="main-container">
      <h1 className="w-64 text-4xl font-bold my-4 text-gray-darkest dark:text-white">
        Thank you for signing up!
      </h1>
      <div id="get-started-container" className="flex flex-row">
        <div className="flex flex-row items-center">
          <button
            className="whitespace-nowrap px-4 py-4 text-xl text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
            onClick={() => setCurrentPage("enter-name")}
          >
            Get started
          </button>
        </div>
        <div className="ml-4 contrast-100 mt-6 w-44">
          <Image
            src={isDark ? detectiveDarkMode : detectiveLightMode}
            alt="An image of a detective looking through a magnifying glass with their left eye"
            width={584}
            height={800}
          />
        </div>
      </div>
    </div>
  )
}
