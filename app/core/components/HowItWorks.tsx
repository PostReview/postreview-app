import { Image } from "blitz"
import articleScreenshot from "public/steps-screenshots/article.png"
import popupReviewScreenshot from "public/steps-screenshots/popup-review.gif"
import reviewAnswersScreenshot from "public/steps-screenshots/review-answers.png"
import enterTitleScreenshot from "public/steps-screenshots/enter-title.png"

export const HowItWorks = () => {
  return (
    <div
      id="how-it-works-container"
      className="flex flex-col items-center min-h-screen justify-evenly my-12 max-w-4xl m-12 mb-24 space-y-32"
    >
      <div className="text-4xl font-bold">How it works</div>
      <div>
        <div className="text-center mb-6 text-2xl font-bold ">Enter the title of the paper</div>
        <div className="max-w-xl">
          <Image
            src={enterTitleScreenshot}
            alt="A card showing an article with ratings across users"
          />
        </div>
      </div>
      <div>
        <div className="text-center mb-6 text-2xl font-bold">Rate the paper</div>
        <div className="max-w-xl">
          <Image
            src={popupReviewScreenshot}
            alt="A screen recording where the user is choosing ratings for the article"
          />
        </div>
      </div>
      <div>
        <div className="text-center mb-6 text-2xl font-bold">
          You can browse others&apos; ratings
        </div>
        <div className="max-w-full">
          <Image
            src={reviewAnswersScreenshot}
            alt="A card showing ratings for the article by one user"
          />
        </div>
      </div>
      <div>
        <div className="text-center mt-14 mb-6 text-2xl font-bold">
          Everyone&apos;s ratings, combined
        </div>
        <div className="self-center">
          <Image
            src={articleScreenshot}
            alt="A card showing an article with ratings across users"
          />
        </div>
      </div>
    </div>
  )
}
