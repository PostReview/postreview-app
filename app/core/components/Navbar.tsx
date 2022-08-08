import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Link, useRouter } from "blitz"

export default function Navbar() {
  const currentUser = useCurrentUser()
  const router = useRouter()
  return (
    <>
      <header className="bg-gray-100 flex flex-row items-center h-16">
        <div className="mx-6 text-2xl">
          <Link href="/">PostReview</Link>
        </div>
        <div id="search-bar-container" className="flex flex-grow justify-center">
          {currentUser ? <EnterDOI /> : router.pathname != "/" ? <EnterDOI /> : ""}
        </div>
        <div id="buttons-container" className="mr-4 flex flex-row">
          <HeaderUserButton />
        </div>
      </header>
    </>
  )
}
