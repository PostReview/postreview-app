import React from "react"
import { Image } from "blitz"
import googleLogo from "public/google.png"

export default function GoogleButton() {
  return (
    <>
      <a href="/api/auth/google">
        <Image
          src={googleLogo}
          alt="Sign-in with Google"
          height={48}
          width={200}
        />
      </a>
    </>
  )
}
