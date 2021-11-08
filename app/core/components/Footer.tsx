import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <footer
      className="bg-gray-200"
    >
      <div className="h-16 flex flex-row items-center sm:w-full lg:w-5/6 mx-auto">
        <div
          className="m-3 mx-6 flex-grow"
        >
          PostReview 2021
        </div>
        <ul className="mx-6">
          <li className="inline mx-4">
            Terms
          </li>
          <li className="inline mx-4">
            About us
          </li>
        </ul>
        <ul className="mx-6">
          <li className="inline mx-4">
            <TwitterIcon />
          </li>
          <li className="inline mx-4">
            <GitHubIcon />
          </li>
        </ul>
      </div>
    </footer>
  )
}
