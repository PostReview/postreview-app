import { Rating } from "@mui/material"
import React from "react"

export const ReviewCategoryAnswer = (props) => {
  const { questionCategory, ratingScaleMax, response, norating } = props

  return norating ? (
    <div className="m-2 text-center">
      {questionCategory}
      <div id="rating" className="text-gray-500 font-semibold text-sm mb-1">
        N/A
      </div>
    </div>
  ) : (
    <div className="m-2 text-center">
      {questionCategory}
      <div id="rating">
        <Rating size="small" readOnly max={ratingScaleMax} value={response} />
      </div>
    </div>
  )
}
