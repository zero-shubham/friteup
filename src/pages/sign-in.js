import React from "react"
import Signup from "../components/Signup"
import SEO from "../components/seo"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import "../styles/main.scss"

const client = new ApolloClient({
  uri: "http://127.0.0.1:8081/graphql",
})

const SignInPage = () => {
  const theme = createMuiTheme({
    typography: {
      // Tell Material-UI what the font-size on the html element is.
      fontFamily: "Caveat, cursive",
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <SEO title="Create an account or Sign-in to existing" />
        <Signup />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default SignInPage
