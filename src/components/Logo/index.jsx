import React from "react"
import styles from "./logo.module.scss"

const Logo = ({ size = "large" }) => {
  return (
    <div className={styles.container}>
      <div
        className={
          size === "large"
            ? `${styles.text} ${styles.large}`
            : `${styles.text} ${styles.small}`
        }
      >
        FriteUp
      </div>
    </div>
  )
}

export default Logo
