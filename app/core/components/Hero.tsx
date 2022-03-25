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
        <HeaderUserButton />
      </div>
    </div>
  )
}
