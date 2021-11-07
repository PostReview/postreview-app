import React from "react"
import { SearchBar } from "./SearchBar"
import { HeaderUserButton } from "./HeaderUserButton"
import { Button } from "@mui/material"

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
        <div
          id="buttons-container"
          className="mx-4 flex flex-row"
        >
          <Button
            id="add-paper-button"
            variant="contained"
            className="mx-6"
          >
            Rate a paper
          </Button>
          <HeaderUserButton />
        </div>
      </header>
    </>
  )
}
