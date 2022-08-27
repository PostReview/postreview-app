import { Image } from "blitz"
import { Suspense, useEffect, useState } from "react"
import postReviewLogoDarkMode from "public/logo-darkmode.png"
import postReviewLogoLightMode from "public/logo-lightmode.png"

const LayoutLoader = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)
  }, [])

  return (
    <Suspense
      fallback={
        <>
          <div className="min-h-screen bg-white dark:bg-gray-darkest">
            <div className="flex flex-col items-center">
              <div className="my-96 animate-[ping_5s_infinite]">
                <Image
                  src={isDark ? postReviewLogoDarkMode : postReviewLogoLightMode}
                  alt="An image of a magnifying glass wearing a fedora hat"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </>
      }
    >
      {children}
    </Suspense>
  )
}

export default LayoutLoader
