import React from "react"
import PostAddIcon from "@mui/icons-material/PostAdd"

export const MyReviewsEmptyState = () => {
  return (
    <div>
      <div className="text-gray-500">No ratings submitted yet.</div>

      <div
        className="bg-gray-50 m-6 p-4 border-gray-600 border-2 border-dashed
    flex flex-col  max-w-5xl"
      >
        <a href="#" className="self-center">
          <div className="flex flex-col items-center">
            <PostAddIcon fontSize="large" color="action" />
            <div id="rate-paper-container">Rate a paper</div>
          </div>
        </a>
      </div>
    </div>
  )
}
