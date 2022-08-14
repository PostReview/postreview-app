import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { useRouter, Image, useSession } from "blitz"
import postReviewIcon from "public/logo-darkmode.png"

export default function Navbar() {
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-darkest to-gray-dark flex flex-row items-center h-16">
        <button className="object-none h-20 w-20 p-2" onClick={() => router.push("/")}>
          <Image src={postReviewIcon} alt="A magnifier with a hat" />
        </button>
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
