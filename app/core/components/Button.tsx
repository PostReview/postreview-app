import React from "react"

export const Button = (props) => {
  const { additionalClass, type } = props
  if (type == "cancel")
    return (
      <button
        className={`bg-slate-400 hover:bg-slate-600 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${additionalClass}`}
        {...props}
      >
        {props.children}
      </button>
    )
  if (type == "error")
    return (
      <button
        className={`bg-red-500 hover:bg-red-600 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${additionalClass}`}
        {...props}
      >
        {props.children}
      </button>
    )
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${additionalClass}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
