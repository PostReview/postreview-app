import { BlitzPage, useParam, useQuery } from "blitz"
import Navbar from "app/core/components/Navbar"
import { Suspense } from "react"
import { Footer } from "app/core/components/Footer"
import { Avatar } from "@mui/material"
import { Button } from "app/core/components/Button"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import getUserInfo from "app/queries/getUserInfo"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"

const PublicProfileDetails = () => {
  const userHandle = useParam("handle", "string") as String
  const [userInfo] = useQuery(getUserInfo, { userHandle })
  const [defaultArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: userInfo?.id,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div id="user-info-card" className="bg-gray-200 p-4 flex flex-col items-center">
          <div className="flex flex-row items-center">
            <div id="user-icon-container" className="m-2">
              <Button id="user-avatar" className="focus:outline-none" onClick={undefined}>
                <Avatar
                  alt={userInfo?.displayName ? userInfo.displayName : userInfo?.handle}
                  src={
                    userInfo?.icon
                      ? userInfo?.icon
                      : `https://eu.ui-avatars.com/api/?name=${
                          userInfo?.displayName ? userInfo?.displayName : userInfo?.handle
                        }`
                  }
                />
              </Button>
            </div>
            <div className="flex flex-col">
              <div id="user-name-container" className="text-lg">
                {userInfo?.displayName}
              </div>
              <div id="handle-field-container" className="text-zinc-600">
                {`@${userInfo?.handle}`}
              </div>
            </div>
          </div>
        </div>
        <div id="my-reviews-container" className="flex flex-col items-center m-3">
          <h1 className="text-xl mt-6">Reviews</h1>
          <div className="flex flex-col items-center">
            {defaultArticlesWithReview.length === 0 && <> No Reviews </>}
            {
              <MyReviewsTable
                articleWithReview={defaultArticlesWithReview}
                currentUser={userInfo}
                publicProfile
              />
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

const PublicProfilePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <PublicProfileDetails />
    </Suspense>
  )
}

export default PublicProfilePage
