import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Link, useRouter, Image } from "blitz"
import postReviewIcon from "public/logo-darkmode.png"

export default function Navbar() {
  const currentUser = useCurrentUser()
  const router = useRouter()
  return (
    <>
      <nav className="bg-gradient-to-r from-gray-darkest to-gray-dark flex flex-row items-center h-16">
        <div className="object-none h-20 w-20 p-2">
          <Link href="/"><Image src={postReviewIcon}></Image></Link>
        </div>
        <div id="search-bar-container" className="flex flex-grow justify-center">
          {currentUser ? <EnterDOI /> : router.pathname != "/" ? <EnterDOI /> : ""}
        </div>
        <div id="buttons-container" className="mr-4 flex flex-row">
          <HeaderUserButton />
        </div>
      </nav>
    </>
  )
}
