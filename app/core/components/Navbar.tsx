import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { Link, useRouter, useSession } from "blitz"

export default function Navbar() {
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"

  return (
    <>
      <nav className="bg-gray-100 flex flex-row items-center h-16">
        <div className="mx-6 text-2xl">
          <Link href="/">PostReview</Link>
        </div>
        <div id="search-bar-container" className="flex flex-grow justify-center">
          {session?.userId ? (
            <EnterDOI session={session} />
          ) : (
            !isAtRoot && <EnterDOI session={session} />
          )}
        </div>
        <div id="buttons-container" className="mr-4 flex flex-row">
          <HeaderUserButton />
        </div>
      </nav>
    </>
  )
}
