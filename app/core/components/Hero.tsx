import React from 'react'

export const Hero = () => {
  return (
    <>
      <div className="px-6 md:px-12 lg:px-24 my-28 flex flex-col items-center">
        <div className="text-3xl md:text-5xl lg:text-7xl">
          Sharing your opinions made easy
        </div>
        <div className="text-xl text-pr-blue mt-4">
          Share your thoughts with those who care—Opinions in science have never been this accessible
        </div>
        <div
          id="action-container"
          className="my-12"
        >
          <input
            type="text"
            className="rounded-full placeholder-gray-500 px-12 bg-gray-100 h-8"
            placeholder="Article title / DOI"
          />
          <button
            className="bg-blue-400 mx-2 rounded-full h-8 w-auto px-4 text-white"
          >
            Start Browsing
          </button>
        </div>
      </div>

    </>
  )
}
