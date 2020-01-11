import React, { useState } from "react"
import { Link } from "gatsby"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Signup from "../components/Signup"
import "../styles/main.scss"

const IndexPage = () => {
  const theme = createMuiTheme({
    typography: {
      // Tell Material-UI what the font-size on the html element is.
      fontFamily: "Caveat, cursive",
    },
  })
  const [tmpAuth, setTmpAuth] = useState(false)
  const page = tmpAuth ? (
    <Layout>
      <SEO title="Home" />
    </Layout>
  ) : (
    <Signup />
  )
  return <ThemeProvider theme={theme}>{page}</ThemeProvider>
}

export default IndexPage
