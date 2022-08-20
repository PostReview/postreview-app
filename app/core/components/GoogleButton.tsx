import React from "react"
import { Image } from "blitz"
import googleLogoSignIn from "public/google-custom-sign-in.png"
import googleLogoSignUp from "public/google-custom-sign-up.png"


export default function GoogleButton(props = { type: "sign-in" }) {

  const { type } = props

  const googleLogo = type === "sign-in" ? googleLogoSignIn : type === "sign-up" ? googleLogoSignUp : googleLogoSignIn

  return (
    <>
      <a href="/api/auth/google">
        <Image src={googleLogo} alt="Sign-in with Google" height={106 / 2} width={374 / 2} />
      </a>
    </>
  )
}
