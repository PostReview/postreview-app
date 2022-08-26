import Navbar from "app/core/components/Navbar"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image, Link } from "blitz"
import { Suspense } from "react"
import transparencyPhoto from "public/transparency-photo.png"
import diversityPhoto from "public/diversity-photo.png"
import accountabilityPhoto from "public/accountability-photo.png"

const MissionVisionPage: BlitzPage = () => {
  return (
  )
}
MissionVisionPage.getLayout = (page) => (
  <Layout title="Mission and Vision | PostReview">{page}</Layout>
)
export default MissionVisionPage
