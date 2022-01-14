import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"

export default function Header() {
  return (
    <>
      <header className="bg-gray-100 flex flex-row items-center h-16">
        <div className="mx-6 text-2xl">
          <a href="/">PostReview</a>
        </div>
        <div id="search-bar-container" className="flex flex-grow justify-end">
          <EnterDOI />
        </div>
        <div id="buttons-container" className="mr-4 flex flex-row">
          <HeaderUserButton />
        </div>
      </header>
    </>
  )
}
