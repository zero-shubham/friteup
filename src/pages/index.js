import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../containers/Layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Signup from "../containers/Signup"
import Logo from "../components/Logo"

const IndexPage = () => {
  const [tmpAuth, setTmpAuth] = useState(false)
  const page = tmpAuth ? (
    <Layout>
      <SEO title="Home" />
    </Layout>
  ) : (
    <Signup />
  )
  return page
}

export default IndexPage
