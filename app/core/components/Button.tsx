import React from "react"

export const Button = (props) => {
  const { className } = props
  console.log(
    "bg-indigo-500 hover:bg-indigo-700 text-white font-semibold mx-2 rounded-md text-sm w-32 py-3" +
      className
  )
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 text-white mx-2 rounded-md px-3 py-2 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
