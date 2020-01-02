import React from "react"
import styles from "./userAvatar.module.scss"

const UserAvatar = ({ image, alt }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={alt} className={styles.image} />
    </div>
  )
}

export default UserAvatar
