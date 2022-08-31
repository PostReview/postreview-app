import React from "react"

export const SocialMetadata = (props) => {
  const {
    title = "PostReview",
    description = "Start your new academic year differently with PostReview",
    rootUrl = new URL("https://www.postreview.org/"),
    socialImage = new URL("/social-image.png", rootUrl),
  } = props
  return (
    <>
      <meta name="description" content={title} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={rootUrl.href} key="ogurl" />
      <meta property="og:image" content={socialImage.href} key="ogimage" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* Twittter */}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
