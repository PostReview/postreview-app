import { Image } from "blitz"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"
import reviewIconDarkMode from "public/review-icon-darkmode.png"
import reviewIconLightMode from "public/review-icon-lightmode.png"
import submitIconDarkMode from "public/submit-icon-darkmode.png"
import submitIconLightMode from "public/submit-icon-lightmode.png"

export const HowItWorks = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const useDarkMode = mediaQuery.matches;

  return (
    <div
      id="how-it-works-container"
      className="flex flex-col min-h-screen justify-evenly my-12 max-w-4xl m-12 mb-24"
    >
      <div className="text-center text-4xl font-bold text-gray-darkest dark:text-white">How PostReview works</div>
      <div>
        <div className="mt-20 mb-10 text-3xl font-bold text-green">Share what you think in 3 simple steps</div>
        <div className="mt-40 objectnone h-52 w-52">
          <Image
            src={useDarkMode ? postReviewLogoDarkMode : postReviewLogoLightMode}
            alt="An image of a magnifying glass wearing a fedora hat"
          />
        </div>
      </div>
      <div>
        <div className="mb-1 text-3xl font-bold text-gray-darkest dark:text-white">1. Search</div>
        <div className="mb-3 text-xl text-gray-darkest dark:text-white">Search an article you want to review</div>
        <div className="mt-40 objectnone h-52 w-52">
          <Image
            src={useDarkMode ? reviewIconDarkMode : reviewIconLightMode}
            alt="A picture of a hand pointing at the middle of five stars"
          />
        </div>
      </div>
      <div>
        <div className="mb-1 text-3xl font-bold text-gray-darkest dark:text-white">2. Review</div>
        <div className="mb-3 text-xl text-gray-darkest dark:text-white">Tell us what you think by inputting your review</div>
        <div className="mt-40 objectnone h-52 w-52">
          <Image
            src={useDarkMode ? submitIconDarkMode : submitIconLightMode}
            alt="A picture of a rectangle button. Inside the rectangle button is an arrow pointer in between a line on the left and two dots on the right"
          />
        </div>
      </div>
      <div>
        <div className="mb-1 text-3xl font-bold text-gray-darkest dark:text-white">3. Submit</div>
        <div className="mb-3 text-xl text-gray-darkest dark:text-white">Click submit and we will add your review instantly</div>
      </div>
    </div>
  )
}
