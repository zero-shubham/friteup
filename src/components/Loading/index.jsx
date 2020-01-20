import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { withStyles } from "@material-ui/core/styles"
import styles from "./loading.module.scss"

const ColorCircularProgress = withStyles({
  root: {
    color: "#00695c",
  },
})(CircularProgress)

const Loading = ({ children, loading = false, parentClassName }) => {
  const component = loading ? (
    <div className={styles.centerLoader}>
      <ColorCircularProgress />
    </div>
  ) : (
    <div className={parentClassName}>{children}</div>
  )
  return component
}

export default Loading
