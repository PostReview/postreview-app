import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Router,
} from "blitz"
// Load algolia theme first then customize it in the css file
import "@algolia/autocomplete-theme-classic"
import "app/core/styles/index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  // Specify typeface fonts for the MUI components
  const theme = createTheme({
    typography: {
      fontFamily: ["Fira Sans", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ThemeProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    Router.push("/login")
    resetErrorBoundary()
    return null
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
