import React from "react"
import { Image } from "blitz"
import googleLogo from "public/google-custom.png"

export default function GoogleButton() {
  return (
    <>
      <a href="/api/auth/google">
        <Image src={googleLogo} alt="Sign-in with Google" height={106 / 2} width={374 / 2} />
      </a>
    </>
  )
}
