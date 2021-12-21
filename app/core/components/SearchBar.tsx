import { Search } from "@mui/icons-material"
import { Input, InputAdornment } from "@mui/material"
import React from "react"

export const SearchBar = () => {
  return (
    <Input
      id="search-input"
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
    />
  )
}
