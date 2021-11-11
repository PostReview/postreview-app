import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';

export const NotConvincedYet = () => {
  return (
    <div className="flex flex-col justify-evenly">
      <h1 className="text-4xl self-center m-6">
        Let us help your research
      </h1>
      <div className="flex flex-row mx-20 max-w-6xl">
        <div className="flex-1 mx-6">
          <h2 className="text-xl text-center">
            Save time on literature search
          </h2>
          <div className="text-gray-600">
            We aggregate ratings, so that you can focus on highly-rated papers
          </div>
          <div className="text-center">
            <AccessTimeIcon className="text-9xl" />
          </div>
        </div>
        <div className="flex-1 mx-6">
          <h2 className="text-xl text-center">
            Share your opinions, instantly
          </h2>
          <div className="text-gray-600">
            Your opinions matter, and we make it easy to share
          </div>
          <div className="text-center">
            <RateReviewIcon className="text-9xl" />
          </div>
        </div>
        <div className="flex-1 mx-6">
          <h2 className="text-xl text-center">
            Join the movement
          </h2>
          <div className="text-gray-600">
            Together, we can bring reviwing power back to researchers from publishers
          </div>
          <div className="text-center">
            <GroupsIcon className="text-9xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
