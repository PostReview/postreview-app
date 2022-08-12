import React from "react"
import { FaSpinner } from "react-icons/fa"

export const Button = (props) => {
  const { addstyles, type, loading } = props
  if (type == "cancel")
    return (
      <button
        className={`bg-gray-medium hover:bg-gray-dark text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
        {...props}
      >
        {props.children}
      </button>
    )
  if (type == "error")
    return (
      <button
        className={`bg-red hover:bg-gray-dark text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
        {...props}
      >
        {props.children}
      </button>
    )
  if (loading)
    return (
      <button
        className={`bg-dray-dark text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap flex items-center justify-center ${addstyles}`}
        {...props}
      >
        <div className="opacity-0">{props.children}</div>
        <FaSpinner className="absolute animate-spin" />
      </button>
    )
  return (
    <button
      className={`font-semibold bg-green hover:bg-green-dark text-gray-darkest mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
