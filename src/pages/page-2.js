import React from "react"
import { Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostDisplay from "../components/PostDisplay"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <PostDisplay />
  </Layout>
)

export default SecondPage
