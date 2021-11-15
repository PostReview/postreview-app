import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';

const features = [
  {
    name: 'Share your opinions, instantly',
    description:
      'Your opinions matter, and we make it easy to share',
    icon: <RateReviewIcon />,
  },
  {
    name: 'Save time',
    description:
      'We aggregate ratings, so that you can focus on highly-rated papers',
    icon: <AccessTimeIcon />,
  },
  {
    name: 'Join the movement',
    description:
      'Together, we can bring reviewing power back to researchers from publishers',
    icon: <GroupsIcon />,
  },
]

export const NotConvincedYet = () => {
  return (
    <div className="flex flex-col justify-evenly">
      <h1 className="text-4xl self-center m-6">
        Let us help your research
      </h1>
      <div id="features-container" className="flex flex-row mx-20 max-w-6xl">
        {features.map((feature) => (
          <div key={feature.name} className="flex-1 mx-6">
            <h2 className="text-xl text-center">
              {feature.name}
            </h2>
            <div className="text-gray-600">
              {feature.description}
            </div>
            <div className="text-center">
              {feature.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
