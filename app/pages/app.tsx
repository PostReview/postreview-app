import { BlitzPage, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { Suspense } from "react"

const App = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <h1>This is home</h1>
      <button
        className="border p-6"
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </button>
    </>
  )
}

const AppPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  )
}

export default AppPage
