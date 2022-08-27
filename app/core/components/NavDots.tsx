import { Tooltip } from "@mui/material"
import React from "react"

const Dot = (props) => {
  return (
    <Tooltip title={props.category} placement="top">
      <div
        {...props}
        className={`${props.selected ? "w-5 h-5" : "w-3 h-3"}\
   ${props.category === "Overall" ? "bg-green" : "bg-white"} rounded-full \
    hover:cursor-pointer \
    transition-all
    `}
      ></div>
    </Tooltip>
  )
}

export const NavDots = (props) => {
  const { searchCategories, setQuestionCategory, questionCategory } = props

  return (
    <div id="dot-area" className="mx-auto w-72 fixed inset-x-0 bottom-16">
      <div
        id="dot-bar"
        className="px-4 flex flex-row h-12 rounded-3xl bg-gray-dark bg-opacity-80 items-center justify-around"
      >
        {searchCategories.map((category) => (
          <Dot
            key={category}
            onClick={() => setQuestionCategory(category)}
            selected={category === questionCategory}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}
