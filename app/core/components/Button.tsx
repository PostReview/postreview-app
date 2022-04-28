import React from "react"
import { FaSpinner } from "react-icons/fa"

export const Button = (props) => {
  const { addstyles, type, loading } = props
  if (type == "cancel")
    return (
      <button
        className={`bg-slate-400 hover:bg-slate-600 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
        {...props}
      >
        {props.children}
      </button>
    )
  if (type == "error")
    return (
      <button
        className={`bg-red-500 hover:bg-red-600 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
        {...props}
      >
        {props.children}
      </button>
    )
  if (loading)
    return (
      <button
        className={`bg-slate-400 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap flex items-center justify-center ${addstyles}`}
        {...props}
      >
        <div className="opacity-0">{props.children}</div>
        <FaSpinner className="absolute animate-spin" />
      </button>
    )
  return (
    <button
      className={`bg-indigo-500 hover:bg-indigo-700 text-white mx-2 rounded-md px-3 py-2 whitespace-nowrap ${addstyles}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
