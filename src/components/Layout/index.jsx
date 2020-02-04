import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { USER } from "../../services/queries"
import Sidebar from "../Sidebar"
import Canvas from "../Canvas"
import { Context } from "../../pages/app"
import styles from "./Layout.module.scss"

const Layout = ({ children }) => {
  const context = useContext(Context)
  const userId = context ? context.userId : ""
  const { data, loading, error } = useQuery(USER, {
    variables: { user_id: userId },
  })

  return (
    <div
      className={
        data && data.user.night_mode
          ? `${styles.body} ${styles.dark}`
          : styles.body
      }
    >
      <Sidebar name={data && data.user.name} />
      <Canvas darkMode={data && data.user.night_mode}>{children}</Canvas>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
