import { Image } from "blitz"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"
import reviewIconDarkMode from "public/review-icon-darkmode.png"
import reviewIconLightMode from "public/review-icon-lightmode.png"
import submitIconDarkMode from "public/submit-icon-darkmode.png"
import submitIconLightMode from "public/submit-icon-lightmode.png"
import { useEffect, useState } from "react"

export const HowItWorks = () => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  return (
    <div id="how-it-works-container" className="flex flex-col min-h-screen p-8 max-w-4xl">
      <div className="my-6 text-center text-4xl font-bold text-gray-darkest dark:text-white">
        How PostReview works
      </div>
      <div className="text-3xl font-semibold text-green">
        Share what you think in 3 simple steps
      </div>
      <div id="steps-container" className="flex flex-col items-center">
        <div>
          <div className="mt-14 w-52 ml-10">
            <Image
              src={isDark ? postReviewLogoDarkMode : postReviewLogoLightMode}
              alt="An image of a magnifying glass wearing a fedora hat"
            />
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-darkest dark:text-white">1. Search</div>
          <div className="mb-3 text-xl text-gray-darkest dark:text-white">
            Search an article you want to review
          </div>
        </div>
        <div className="mt-24 mb-2 w-52">
          <Image
            src={isDark ? reviewIconDarkMode : reviewIconLightMode}
            alt="A picture of a hand pointing at the middle of five stars"
          />
        </div>
        <div>
          <div className="mb-1 ml-4 md:ml-24 text-3xl font-bold text-gray-darkest dark:text-white">
            2. Review
          </div>
          <div className="mb-3 mx-4 md:ml-24 text-xl text-gray-darkest dark:text-white">
            Tell us what you think by inputting your review
          </div>
        </div>
        <div className="mt-24 mb-2 w-52">
          <Image
            src={isDark ? submitIconDarkMode : submitIconLightMode}
            alt="A picture of a rectangle button. Inside the rectangle button is an arrow pointer in between a line on the left and two dots on the right"
          />
        </div>
        <div>
          <div className="ml-4 mb-1 md:ml-32 text-3xl font-bold text-gray-darkest dark:text-white">
            3. Submit
          </div>
          <div className="mx-4  md:ml-32 text-xl text-gray-darkest dark:text-white">
            Click submit and we will add your review instantly
          </div>
        </div>
      </div>
    </div>
  )
}
