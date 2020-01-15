import React from "react"
import { Router } from "@reach/router"
import "../styles/main.scss"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostDisplay from "../components/PostDisplay"

const RenderedApp = () => (
  <Layout>
    <SEO title="Welcome back to FriteUp" />
    <PostDisplay />
  </Layout>
)

const App = () => (
  <Router>
    <RenderedApp path="/index" />
  </Router>
)
export default App
