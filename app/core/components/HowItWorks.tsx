import { Button, Rating } from "@mui/material"
import { SearchBar } from "./SearchBar"
import DescriptionIcon from "@mui/icons-material/Description"
import ArticleSample from "./ArticleSample"
import { ReviewSample } from "./ReviewSample"
import { Image } from "blitz"
import articleScreenshot from "public/steps-screenshots/article.png"
import popupReviewScreenshot from "public/steps-screenshots/popup-review.gif"
import reviewAnswerScreenshot from "public/steps-screenshots/review-answer.png"

export const HowItWorks = () => {
  return (
    <div
      id="how-it-works-container"
      className="flex flex-col items-start min-h-screen justify-evenly mt-32 max-w-2xl"
    >
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
