import React from "react"

export default function Button(props) {
  const { text, onClick } = props
  return (
    <button className="border p-6" onClick={onClick}>
      {text.toString()}
    </button>
  )
}
