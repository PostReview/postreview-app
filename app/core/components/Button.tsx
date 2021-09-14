import React from "react"

export default function Button(butonString, onClick) {
  return (
    <button className="border p-6" onClick={onClick}>
      {butonString}
    </button>
  )
}
