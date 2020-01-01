import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import styles from "./signup.module.scss"

const Signup = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <div className={styles.body}>
        <div>FriteUp</div>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Name" />
        <Button href={"https://www.google.com"}>Link Button</Button>
        <Button onClick={() => console.log("clicked")}>Button</Button>
      </div>
    </>
  )
}

Signup.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Signup
