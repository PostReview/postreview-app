import { ReactNode } from "react"
import { Head } from "blitz"
import LayoutLoader from "../components/LayoutLoader"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "PostReview"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutLoader>{children}</LayoutLoader>
    </>
  )
}

export default Layout
