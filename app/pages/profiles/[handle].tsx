import { BlitzPage, Head, useParam, useQuery } from "blitz"
import Navbar from "app/core/components/Navbar"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import getUserInfo from "app/queries/getUserInfo"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"
import { ProfileBgImage } from "app/core/components/ProfileBgImage"
import { ProfileInfo } from "app/core/components/ProfileInfo"
import Layout from "app/core/layouts/Layout"

const PublicProfileDetails = () => {
  const userHandle = useParam("handle", "string") as String
  const [userInfo] = useQuery(getUserInfo, { handle: userHandle })
  const [defaultArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: userInfo?.id,
  })

  return (
    <>
      <Head>
        <title>{`${
          userInfo?.displayName ? userInfo?.displayName : userInfo?.handle
        } | PostReview`}</title>
      </Head>
      <main className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-darkest relative text-gray-darkest dark:text-white">
        <ProfileBgImage />
        <ProfileInfo userInfo={userInfo} showEditButton={false} />

        <div id="my-reviews-container" className="m-4 mt-8 max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-darkest dark:text-white">Reviews</h1>
          <div className="text-gray-darkest dark:text-white">
            {defaultArticlesWithReview.length === 0 && (
              <div
                className="m-6 p-4 border-gray-medium
    flex flex-col w-96 h-32 justify-center"
              >
                <div className="flex flex-col items-center">
                  <div
                    id="rate-paper-container"
                    className="text-gray-darkest dark:text-white underline"
                  >
                    No reviews
                  </div>
                </div>
              </div>
            )}

            <MyReviewsTable
              articleWithReview={defaultArticlesWithReview}
              currentUser={userInfo}
              publicProfile
            />
          </div>
        </div>
      </main>
    </>
  )
}

const PublicProfilePage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PublicProfileDetails />
    </div>
  )
}

PublicProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicProfilePage
