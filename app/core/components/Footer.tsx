import React from "react"
import TwitterIcon from "@mui/icons-material/Twitter"
import GitHubIcon from "@mui/icons-material/GitHub"
import { FaDiscord } from "react-icons/fa"
import { Link } from "blitz"

const datetime = new Date()

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="flex flex-row items-center sm:w-full lg:w-5/6 mx-auto my-4">
        <div className="m-3 mx-6 flex-grow">PostReview {datetime.getFullYear()}</div>
        <ul className="sm:mx-6 sm:flex">
          <li className="md:inline mx-4">
            <Link href="/how-it-works">How It Works</Link>
          </li>
          <li className="md:inline mx-4">Terms</li>
          <li className="md:inline mx-4">
            <Link href="/code-of-conduct">
              Code of Conduct
            </Link>
          </li>
          <li className="md:inline mx-4">
            <Link href="/about">About Us</Link>
          </li>
        </ul>
        <ul className="mx-6 md:flex">
          <li className="md:inline mx-4">
            <a href="https://discord.com/invite/gZ4Hn2VryK" target="_blank" rel="noreferrer">
              <FaDiscord className="inline text-2xl" />
            </a>
          </li>
          <li className="md:inline mx-4">
            <a href="https://twitter.com/PostReviewOrg" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
          </li>
          <li className="md:inline mx-4">
            <a href="https://github.com/nsunami/postreview-app" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer >
  )
}
