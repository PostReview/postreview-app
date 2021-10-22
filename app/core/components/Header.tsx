import { Button } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import React from "react"
import { SearchBar } from "./SearchBar"

export default function Header() {
  return (
    <>
      <header className="bg-gradient-to-r from-green-100 to-blue-500 flex flex-row items-center h-16">
        <div className="mx-6 text-2xl">
          <a href="/">PostReview</a>
        </div>
        <div id="search-bar-container" className="flex flex-grow justify-end">
          <SearchBar />
        </div>
        <div id="buttons-container" className="mx-4">
          <a href="/profile">
            <Button
              className="focus:outline-none"
              variant="contained"
              startIcon={<AccountCircleIcon />}
            >
              My Page
            </Button>
          </a>
        </div>
      </header>
    </>
  )
}
