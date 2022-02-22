import { Button, Rating } from "@mui/material"
import { SearchBar } from "./SearchBar"
import DescriptionIcon from "@mui/icons-material/Description"
import ArticleSample from "./ArticleSample"
import { ReviewSample } from "./ReviewSample"
import { Image } from "blitz"
import articleScreenshot from "public/steps-screenshots/article.png"
import popupReviewScreenshot from "public/steps-screenshots/popup-review.gif"
import reviewAnswerScreenshot from "public/steps-screenshots/review-answer.png"

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
    div: <ReviewSample {...sampleReviewProps} />,
  },
  {
    step: 4,
    name: "All users' ratings are combined",
    div: <ArticleSample />,
  },
]

export const HowItWorks = () => {
  return (
    <div className="flex flex-col items-start min-h-screen justify-evenly mt-24">
      <div className="self-center text-4xl">How it Works</div>
      <div className="mt-12 mb-6 text-2xl">1. Pick a paper</div>
      <div className="self-center">
        <Image src={articleScreenshot} alt="A card showing an article with ratings across users" />
      </div>
      <div className="mt-12 mb-6 text-2xl">2. Rate the paper</div>
      <div className="self-center">
        <Image
          src={popupReviewScreenshot}
          alt="A screen recording where the user is choosing ratings for the article"
        />
      </div>
      <div className="mt-12 mb-6 text-2xl">3. Your rating is recorded</div>
      <div className="self-center">
        <Image
          src={reviewAnswerScreenshot}
          alt="A card showing ratings for the article by one user"
        />
      </div>
      <div className="mt-12 mb-6 text-2xl">4. We combine everyone&apos;s ratings</div>
      <div className="self-center">
        <Image src={articleScreenshot} alt="A card showing an article with ratings across users" />
      </div>
    </div>
  )
}
