import { Rating } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { useState } from "react"

export const ReviewedStar = (props) => {
  const { currentReview, ratingScaleMax, smallStarColor, fontSize, category } = props
  const [onHover, setOnHover] = useState(false)
  return (
    <div className="flex flex-col items-center">
      <div className="w-min h-10 text-center text-[0.6rem] text-gray-light relative flex justify-center">
        <div className="absolute bottom-0">
          {category.questionCategory}
        </div>
      </div>
      <div className="hover:cursor-pointer" onMouseOver={() => setOnHover(!onHover)} onMouseLeave={() => setOnHover(!onHover)}>
        {currentReview?.response ? (
          <Rating
            readOnly
            value={currentReview.response / ratingScaleMax}
            precision={0.1}
            max={1}
            sx={{
              fontSize: fontSize,
              color: smallStarColor,
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.4, color: "#737373" }} fontSize="inherit" />}
          />
        ) : (
          <Rating
            readOnly
            value={0}
            precision={0.1}
            max={1}
            sx={{
              fontSize: fontSize,
              color: smallStarColor,
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.3, color: "#737373" }} fontSize="inherit" />}
          />
        )}
      </div>
      <div className="-mt-3 h-7 w-min text-center font-semibold text-xl text-gray-light">
        {currentReview?.response ?
          currentReview.response :
          <span className="opacity-70 text-sm">N/A</span>}
      </div>
    </div>
  )
}
