import { Link, Routes } from "blitz"
import React from "react"
import CookieConsent from "react-cookie-consent"

export const CookieConsentModal = (props) => {
  const { setCookieAccepted } = props
  return (
    <>
      <CookieConsent
        location="bottom"
        style={{
          borderTop: "2px solid gray",
          left: "50",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="postreview-cookies"
        buttonStyle={{
          backgroundColor: "#545454",
          color: "#94EC01",
          fontSize: "1rem",
        }}
        declineButtonStyle={{
          backgroundColor: "#545454",
          color: "#fff",
          fontSize: "1rem",
        }}
        expires={150}
        onAccept={() => {
          setCookieAccepted(true)
        }}
        enableDeclineButton
      >
        We use cookies! Some are necessary, but some are optional. Why do we use them? For analyzing
        site usage, enhancing site navigation, and improving our service. If you decline, you may
        still see some cookies, but they will be fully anonymized. See also our{" "}
        <Link href={Routes.PrivacyPolicyPage()}>
          <a className="underline hover:text-white hover:no-underline" target="_blank">
            Privacy policy
          </a>
        </Link>
      </CookieConsent>
    </>
  )
}
