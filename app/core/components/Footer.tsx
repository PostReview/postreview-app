import React from "react"
import TwitterIcon from "@mui/icons-material/Twitter"
import GitHubIcon from "@mui/icons-material/GitHub"

const datetime = new Date()

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="h-16 flex flex-row items-center sm:w-full lg:w-5/6 mx-auto">
        <div className="m-3 mx-6 flex-grow">PostReview {datetime.getFullYear()}</div>
        <ul className="mx-6">
          <li className="inline mx-4">Terms</li>
          <li className="inline mx-4">About us</li>
        </ul>
        <ul className="mx-6">
          <li className="inline mx-4">
            <a href="https://twitter.com/PostReviewOrg" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
          </li>
          <li className="inline mx-4">
            <a href="https://github.com/nsunami/postreview-app" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
