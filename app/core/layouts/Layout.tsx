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
      setCookie(
        <script type="text/javascript">{`window.$crisp=[];window.CRISP_WEBSITE_ID="74d9b823-a426-4e01-9e43-c115f596cb9f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})()`}</script>
      )
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
