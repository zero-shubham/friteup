import React from "react"
import Logo from "../Logo"
import ButtonWithTooltip from "../ButtonWithTooltip"
import writeSvg from "../../images/edit.svg"
import userSvg from "../../images/user.svg"
import subscribedSvg from "../../images/subscribed.svg"
import logoutSvg from "../../images/logout.svg"
import testUser from "../../images/test.jpg"
import UserAvatar from "../UserAvatar"
import styles from "./Sidebar.module.scss"

const Sidebar = () => {
  return (
    <div className={styles.body}>
      <div className={styles.logoContent}>
        <Logo size={"small"} />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <ButtonWithTooltip alt="Write a post." svg={writeSvg} />
          <ButtonWithTooltip alt="Subscribed user list." svg={subscribedSvg} />
          <ButtonWithTooltip alt={"Your profile."} svg={userSvg} />
        </div>
        <div className={styles.container}>
          <div className={styles.marginBottom}>
            <UserAvatar nameInitials="I" name={"Ishaan"} />
          </div>
          <ButtonWithTooltip alt={"Logout."} svg={logoutSvg} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
