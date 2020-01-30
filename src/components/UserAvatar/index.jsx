import React from "react"
import Zoom from "@material-ui/core/Zoom"
import { ChangedTooltip } from "../ButtonWithTooltip"
import user from "../../images/user_.svg"
import styles from "./userAvatar.module.scss"


const UserAvatar = ({ image, alt, name, size = "small", onClick }) => {
  const render = name ? (
    <ChangedTooltip
      title={name ? `Hi ${name}!` : ""}
      placement="top"
      arrow={true}
      TransitionComponent={Zoom}
    >
      <div
        className={
          size === "small"
            ? styles.container
            : `${styles.container} ${styles.large}`
        }
        onClick={onClick}
      >
        <img src={image || user} alt={alt} className={styles.image} />
      </div>
    </ChangedTooltip>
  ) : (
    <div
      className={
        size === "small"
          ? styles.container
          : `${styles.container} ${styles.large}`
      }
      onClick={onClick}
    >
      <img src={image || user} alt={alt} className={styles.image} />
    </div>
  )
  return render
}

export default UserAvatar
