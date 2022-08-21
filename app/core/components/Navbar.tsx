import React from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { useRouter, Image, useSession } from "blitz"
import { DrawerMenu } from "./DrawerMenu"

export default function Navbar() {
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-darkest to-gray-dark flex flex-row items-center h-16 fixed z-50 w-full">
        <div className="w-16" />
        <div id="search-bar-container" className="flex flex-grow justify-center">
          {session?.userId ? (
            <EnterDOI session={session} />
          ) : (
            !isAtRoot && <EnterDOI session={session} />
          )}
        </div>
        <div id="buttons-container" className="mx-4 flex flex-row">
          <HeaderUserButton />
        </div>
        <DrawerMenu />
      </nav>
      <div className="h-16 w-full" />
    </>
  )
}
