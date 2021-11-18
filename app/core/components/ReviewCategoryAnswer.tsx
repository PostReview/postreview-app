import { Rating } from '@mui/material'
import React from 'react'

export const ReviewCategoryAnswer = (props) => {
  const {
    questionCategory,
    ratingScaleMax,
    key,
    response
  } = props

  return (
    <div key={key} className="m-2 text-center">
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
