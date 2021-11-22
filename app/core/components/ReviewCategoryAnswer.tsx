import { Rating } from '@mui/material'
import React from 'react'

export const ReviewCategoryAnswer = (props) => {
  const {
    questionCategory,
    ratingScaleMax,
    response
  } = props

  return (
    <div className="m-2 text-center">
      {questionCategory}
      <div id="rating">
        <Rating
          size="small"
          readOnly max={ratingScaleMax}
          value={response} />
      </div>
    </div>

  )
}
