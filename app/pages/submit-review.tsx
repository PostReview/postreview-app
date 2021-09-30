import { BlitzPage } from "@blitzjs/core"
import { useRouter } from "next/router"
import React from "react"

const SubmitReviewComponent = () => {
  const { query } = useRouter()
  const { articleId } = query
  console.log(articleId)
  return <div></div>
}

const SubmitReviewPage: BlitzPage = () => {
  return (
    <>
      <h1> Submit Review </h1>
      <span>
        Article: <strong>Title here</strong>
        <SubmitReviewComponent />
      </span>
    </>
  )
}

export default SubmitReviewPage
