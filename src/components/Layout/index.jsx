import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { USER } from "../../services/gqlTags"
import Sidebar from "../Sidebar"
import Canvas from "../Canvas"
import { Context } from "../../pages/app"
import styles from "./Layout.module.scss"

const Layout = ({ children }) => {
  const context = useContext(Context)
  const userId = context.userId

  const { data, loading, error } = useQuery(USER, {
    variables: { user_id: userId },
  })

  return (
    <div className={styles.body}>
      <Sidebar userId={userId} name={data && data.user.name} />
      <Canvas>{children}</Canvas>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
