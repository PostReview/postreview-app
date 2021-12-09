import { Button, Rating } from "@mui/material"
import React from "react"
import { SearchBar } from "./SearchBar"
import DescriptionIcon from "@mui/icons-material/Description"
import { Review } from "./Review"
import ArticleSample from "./ArticleSample"

const sampleReviewProps = {
  ratingScaleMax: 5,
  article: {
    title: "An examination on unicorns",
    review: [
      {
        id: 1,
        createdAt: Date(),
        response: 3,
        questionCategory: "Research Question",
      },
      {
        id: 2,
        createdAt: Date(),
        response: 4,
        questionCategory: "Design",
      },
    ],
  },
  user: {
    name: "Aiolos",
  },
}

const howItWorks = [
  {
    step: 1,
    name: "Pick a paper",
    div: (
      <div className="m-6">
        <SearchBar />
        <Button variant="contained">Search</Button>
      </div>
    ),
  },
  {
    step: 2,
    name: "Rate the paper",
    div: (
      <div className="m-6">
        <div className="text-purple-100">
          <DescriptionIcon className="text-gray-600 text-4xl" />
        </div>
        <div>
          Research Question <br />
          <Rating name="read-only" value={4} readOnly />
        </div>
        <div>
          Design
          <br />
          <Rating name="read-only" value={3} readOnly />
        </div>
        <div>
          Findings
          <br />
          <Rating name="read-only" value={5} readOnly />
        </div>
        <div>...</div>
      </div>
    ),
  },
  {
    step: 3,
    name: "Your rating is recorded",
    div: <Review {...sampleReviewProps} disabled={true} />,
  },
  {
    step: 4,
    name: "All users' ratings are combined",
    div: <ArticleSample />,
  },
]

export const HowItWorks = () => {
  return (
    <div className="flex flex-col items-start min-h-screen justify-evenly">
      <div className="self-center text-4xl">How it Works</div>
      {howItWorks.map((step) => (
        <div key={step.name} className="flex flex-col">
          <div className="">
            {step.step}. {step.name}
          </div>
          <div className="m-6">{step.div}</div>
        </div>
      ))}
    </div>
  )
}
