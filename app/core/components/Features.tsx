import React from "react"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import RateReviewIcon from "@mui/icons-material/RateReview"
import GroupsIcon from "@mui/icons-material/Groups"
import communityImage from "public/helena-lopes-PGnqT0rXWLs-unsplash.jpg"
import Image from "next/image"

const features = [
  {
    name: "Share your opinions, instantly",
    description: "Your opinions matter, and we make it easy to share",
    icon: RateReviewIcon,
  },
  {
    name: "Save time",
    description: "We aggregate ratings, so that you can focus on highly-rated papers",
    icon: AccessTimeIcon,
  },
  {
    name: "Join the movement",
    description: "Together, we can bring reviewing power back to researchers from publishers",
    icon: GroupsIcon,
  },
]

export const Features = () => {
  return (
    <div id="feature-cols" className="flex flex-col lg:flex-row items-center m-6 max-w-5xl">
      <div id="feature-image" className="flex-1">
        <h1 className="text-2xl self-center m-6 font-bold">
          Unlocking the power of community in science
        </h1>
        <Image src={communityImage} alt="community image" layout="responsive" />
      </div>
      <div id="features-container" className="flex flex-col flex-1">
        {features.map((feature) => (
          <div key={feature.name} className="m-6 flex flex-row">
            <div id="icon-container">
              <feature.icon className="text-4xl text-blue-500 mx-6" />
            </div>
            <div id="text-container">
              <h2 className="text-xl">{feature.name}</h2>
              <div className="text-gray-600">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
