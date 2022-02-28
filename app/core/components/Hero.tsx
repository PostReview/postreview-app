import React from "react"

export const Hero = () => {
  return (
    <div className="flex flex-col justify-evenly items-center bg-purple-300 py-20 px-4  w-screen">
      <div className="text-3xl md:text-5xl lg:text-7xl font-bold">
        Post your review, post-publication.
      </div>
      <div className="text-xl text-pr-blue mt-4">
        Share your thoughts with those who care—Opinions in science have never been this accessible
      </div>
      <div id="action-container" className="mb-6 mt-12">
        <input
          type="text"
          className="rounded-full placeholder-gray-500 px-12 bg-gray-100 h-8"
          placeholder="Article title / DOI"
        />
        <button className="bg-blue-400 mx-2 rounded-full h-8 w-auto px-4 text-white">
          Start Browsing
        </button>
      </div>
    </div>
  )
}
