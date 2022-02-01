import React from "react"
import PostAddIcon from "@mui/icons-material/PostAdd"

export const MyReviewsEmptyState = () => {
  return (
    <div>
      <div
        className="bg-gray-50 m-6 p-4 border-gray-500 border-2 border-dashed
    flex flex-col  max-w-5xl h-32 justify-center"
      >
        <div className="flex flex-col items-center">
          <div id="rate-paper-container" className="text-gray-500">
            No ratings have been submitted yet
          </div>
        </div>
      </div>
    </div>
  )
}
