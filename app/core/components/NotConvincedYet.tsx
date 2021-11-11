import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';
export const NotConvincedYet = () => {
  return (
    <div className="flex flex-col justify-evenly text-2xl">
      <h1
        className="text-4xl self-center m-6"
      >
        We can help
      </h1>
      <div className="flex flex-row mx-20">
        <div
          className="flex-1 mx-6"
        >
          Save time on literature search
          <div
            className="text-center"
          >
            <AccessTimeIcon className="text-9xl" />
          </div>
          <div>
            We aggregate ratings, so that you can focus on highly-rated papers
          </div>
        </div>
        <div
          className="flex-1 mx-6"
        >
          Instantly share your opinions on papers
          <div
            className="text-center"
          >
            <RateReviewIcon className="text-9xl" />
          </div>
          <div>
            Your opinions matter, and we make it easy to share
          </div>
        </div>
        <div
          className="flex-1 mx-6"
        >
          Join a movement to decentralize power
          <div
            className="text-center"
          >
            <GroupsIcon className="text-9xl" />
          </div>
          <div>
            Together, we can bring the power back to researchers from publishers
          </div>
        </div>
      </div>
    </div>
  )
}
