import React from "react"

export const Button = (props) => {
  const { additionalClass } = props
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${additionalClass}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
