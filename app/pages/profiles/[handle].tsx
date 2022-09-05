import { BlitzPage, Head, Image, Link, useParam, useQuery } from "blitz"
import Navbar from "app/core/components/Navbar"
import getReviewAnswersByUserId from "app/queries/getReviewAnswersByUserId"
import getUserInfo from "app/queries/getUserInfo"
import { MyReviewsTable } from "app/core/components/MyReviewsTable"
import { ProfileBgImage } from "app/core/components/ProfileBgImage"
import { ProfileInfo } from "app/core/components/ProfileInfo"
import noReviewPhoto from "public/no-review-photo.png"
import Layout from "app/core/layouts/Layout"
import { SocialMetadata } from "app/core/components/SocialMetadata"
import { Button } from "app/core/components/Button"

const PublicProfileDetails = () => {
  const userHandle = useParam("handle", "string") as String
  const [userInfo] = useQuery(getUserInfo, { userHandle })
  const [defaultArticlesWithReview] = useQuery(getReviewAnswersByUserId, {
    currentUserId: userInfo?.id,
  })

  const pageTitle = `${
    userInfo?.displayName ? userInfo?.displayName : userInfo?.handle
  } | PostReview`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <SocialMetadata title={pageTitle} />
      </Head>
      <main className="flex flex-col items-center min-h-screen bg-white dark:bg-black/60 relative text-gray-darkest dark:text-white">
        <ProfileBgImage />
        <ProfileInfo userInfo={userInfo} showEditButton={false} />

        <div id="my-reviews-container" className="mx-4 mt-8 max-w-5xl">
          <h1 className="mx-2 text-2xl font-semibold text-gray-darkest dark:text-white">Reviews</h1>
          <div className="text-gray-darkest dark:text-white w-96 sm:w-[40rem]">
            {defaultArticlesWithReview.length === 0 && (
              <div
                className="m-6 p-4 border-gray-medium
    flex flex-col w-96 sm:w-[40rem] h-32 justify-center"
              >
                <div className="flex flex-col items-center">
                  <div
                    id="rate-paper-container"
                    className="font-semibold text-gray-darkest dark:text-white"
                  >
                    <Image
                      src={noReviewPhoto}
                      alt="A silhouette of a bear sleeping"
                      width={140}
                      height={120}
                    />
                  </div>
                  <span className="font-semibold">It is very quiet in here.</span>
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
        <div className="absolute left-0 m-2">
          <Button
            id="public-view-container"
            className="m-2 font-semibold underline hover:cursor-pointer hover:text-gray-darkest text-gray-medium"
          >
            <Link href={`/profile`}>&larr; Back to your own view</Link>
          </Button>
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
