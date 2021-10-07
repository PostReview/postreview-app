import React from "react"

export const Review = (props) => {
  const { userId, review } = props
  return (
    <>
      <div>ID: {userId}</div>
      <div>{JSON.stringify(review)}</div>
    </>
  )
}
