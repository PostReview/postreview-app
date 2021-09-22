import React from "react"

export default function Header() {
  return (
    <>
      <header className="bg-gradient-to-r from-green-100 to-blue-500 flex flex-row items-center h-16">
        <div className="mx-6">
          <a href="/">PostReview</a>
        </div>
        <div className="flex-grow"></div>
      </header>
    </>
  )
}
