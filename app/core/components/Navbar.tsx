import React, { useState } from "react"
import { HeaderUserButton } from "./HeaderUserButton"
import EnterDOI from "./EnterDOI"
import { useRouter, useSession, useRouterQuery } from "blitz"
import { DrawerMenu } from "./DrawerMenu"
import { FaBars } from "react-icons/fa"

export default function Navbar(props) {
  const { hideSearch } = props
  const session = useSession()
  const router = useRouter()
  const isAtRoot = router.pathname === "/"
  const query = useRouterQuery()

  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-darkest to-gray-dark flex flex-row items-center h-16 fixed z-50 w-full">
        <button
          onClick={() => toggleDrawer()}
          className={"mx-4 text-4xl top-4 left-4 text-gray-medium outline-white"}
        >
          <FaBars />
        </button>
        <div id="search-bar-container" className="flex flex-grow justify-center">
          {hideSearch ? undefined : session?.userId ? (
            <EnterDOI session={session} />
          ) : (
            (!isAtRoot || query.search) && <EnterDOI session={session} />
          )}
        </div>
        <div id="buttons-container" className="mx-1 flex flex-row">
          <HeaderUserButton />
        </div>
        <DrawerMenu open={open} setOpen={setOpen} />
      </nav>
      <div className="h-16 w-full" />
    </>
  )
}
