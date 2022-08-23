import React from "react"
import PostAddIcon from "@mui/icons-material/PostAdd"

export const MyReviewsEmptyState = () => {
  return (
    <div>
      <div
        className="m-6 p-4 border-gray-medium border-2 border-dashed
    flex flex-col  max-w-5xl h-32 justify-center"
      >
        <div className="flex flex-col items-center">
          <div id="rate-paper-container" className="text-gray-darkest dark:text-white underline">
            Search a paper to review
          </div>
        </div>
      </div>
    </div>
  )
}
