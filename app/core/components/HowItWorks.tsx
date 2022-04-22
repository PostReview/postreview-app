import { Image } from "blitz"
import articleScreenshot from "public/steps-screenshots/article.png"
import enterDoiScreenshot from "public/steps-screenshots/enter-doi.png"
import popupReviewScreenshot from "public/steps-screenshots/popup-review.gif"
import reviewAnswerScreenshot from "public/steps-screenshots/review-answer.png"

export const HowItWorks = () => {
  return (
    <div
      id="how-it-works-container"
      className="flex flex-col items-start min-h-screen justify-evenly my-12 max-w-2xl m-12"
    >
        <div className="text-center mb-6 text-2xl font-bold ">Enter the title of the paper</div>
        <div className="max-w-xl">
      </div>
      <div className="mt-12 mb-6 text-2xl font-bold">2. Rate the paper</div>
      <div className="self-center max-w-md">
        <Image
          src={popupReviewScreenshot}
          alt="A screen recording where the user is choosing ratings for the article"
        />
      </div>
      <div className="mt-12 mb-6 text-2xl font-bold">3. Your rating is recorded</div>
      <div className="self-center">
        <Image
          src={reviewAnswerScreenshot}
          alt="A card showing ratings for the article by one user"
        />
      </div>
      <div className="mt-12 mb-6 text-2xl font-bold">4. We combine everyone&apos;s ratings</div>
      <div className="self-center">
        <Image src={articleScreenshot} alt="A card showing an article with ratings across users" />
      </div>
    </div>
  )
}
