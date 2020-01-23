import React from "react"
import SEO from "../components/seo"
import LandingPage from "../components/LandingPage"
import "../styles/main.scss"

const IndexPage = () => {
  return (
    <div>
      <SEO title="Welcome!" />
      <LandingPage />
    </div>
  )
}

export default IndexPage
