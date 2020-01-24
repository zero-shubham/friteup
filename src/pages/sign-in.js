import React from "react"
import Signup from "../components/Signup"
import SEO from "../components/seo"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { client } from "../apollo/client"
import { ApolloProvider } from "@apollo/react-hooks"
import "../styles/main.scss"

const SignInPage = () => {
  const theme = createMuiTheme({
    typography: {
      // Tell Material-UI what the font-size on the html element is.
      fontFamily: "Caveat, cursive",
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <SEO title="Create an account or Sign-in to existing" />
      <Signup />
    </ThemeProvider>
  )
}

export default SignInPage
