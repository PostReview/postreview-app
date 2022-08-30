import { Widget } from "@uploadcare/react-widget"
import { Image } from "blitz"
import React, { useRef, useState } from "react"
import { AvatarIcon } from "../AvatarIcon"
import { Button } from "../Button"
import detectiveDarkMode from "public/detective-darkmode.png"
import detectiveLightMode from "public/detective-lightmode.png"

export const UploadYourPhoto = (props) => {
  const { isDark, currentUser, setCurrentUser, router, changeUserInfoMutation } = props

  // Uploadcare
  const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY
  const widgetApi = useRef<any>()

  // Track avatar icon
  const [icon, setIcon] = useState(currentUser.icon)

  // Handle the save button
  const handleSave = () => {
    changeUserInfoMutation({ ...currentUser, icon: icon, isOnboarded: true })
    router.push("/")
  }

  return (
    <div id="upload-photo-container" className="text-white">
      <div id="title-container" className="flex flex-row items-center ">
        <div className="text-gray-darkest dark:text-white">
          <h1 className="text-4xl font-bold mx-6 my-4">Upload your photo</h1>
          <div className="mx-auto w-fit">But, only if you want to!</div>
        </div>
        <div className="ml-4 contrast-100 m-6 w-24">
          <Image
            src={isDark ? detectiveDarkMode : detectiveLightMode}
            alt="An image of a detective looking through a magnifying glass with their left eye"
            width={584}
            height={800}
          />
        </div>
      </div>
      <div id="profile-picture" className="flex flex-row justify-center mx-4 my-8">
        <Button
          id="user-avatar"
          className="focus:outline-none"
          onClick={() => widgetApi?.current?.openDialog()}
        >
          <AvatarIcon
            currentUser={{ ...currentUser, icon: icon }}
            height={"10rem"}
            width={"10rem"}
          />
        </Button>
        <div className="hidden">
          <Widget
            publicKey={UPLOADCARE_PUBLIC_KEY ? UPLOADCARE_PUBLIC_KEY : ""}
            ref={widgetApi}
            crop="1:1"
            imageShrink="480x480"
            imagesOnly
            previewStep
            clearable
            tabs="file url"
            onChange={async (info) => {
              try {
                setCurrentUser({ ...currentUser, icon: icon })
                setIcon(info.cdnUrl)
              } catch (err) {
                alert(err)
              }
            }}
          />
        </div>
      </div>
      <div id="buttons-container" className="flex flex-col items-center text-2xl pb-28 mt-10">
        <button
          className="w-min whitespace-nowrap my-4 px-8 py-2 text-green rounded-lg bg-black/50 hover:bg-gray-darkest dark:bg-gray-medium dark:hover:bg-black/40"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button
          className="w-min my-4 text-gray-medium hover:text-gray-darkest"
          onClick={() => router.push("/")}
        >
          Skip
        </button>
      </div>
    </div>
  )
}
