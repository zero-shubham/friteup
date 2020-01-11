/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./Layout.module.scss"
import Sidebar from "../Sidebar"
import Canvas from "../Canvas"

const Layout = ({ children }) => {
  return (
    <div className={styles.body}>
      <Sidebar />
      <Canvas />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
