import { ReactNode, useEffect, useState } from "react"
import { Head } from "blitz"
import LayoutLoader from "../components/LayoutLoader"
import { getCookieConsentValue } from "react-cookie-consent"
import { CookieConsentModal } from "../components/CookieConsentModal"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const [cookie, setCookie] = useState(() => <></>)
  const [cookieAccepted, setCookieAccepted] = useState(
    getCookieConsentValue("postreview-cookies") === "true"
  )
  useEffect(() => {
    if (cookieAccepted) {
      setCookie(<script type="text/javascript">{undefined}</script>)
    }
  }, [cookieAccepted])

  return (
    <>
      <Head>
        <title>{title || "PostReview"}</title>
        <link rel="icon" href="/favicon.ico" />
        <script data-respect-dnt data-no-cookie async src="https://cdn.splitbee.io/sb.js"></script>
        {cookie}
      </Head>
      <LayoutLoader>{children}</LayoutLoader>
      <CookieConsentModal setCookieAccepted={setCookieAccepted} />
    </>
  )
}

export default Layout
