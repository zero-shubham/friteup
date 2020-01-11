import React from "react"
import Logo from "../Logo"
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
        <Logo />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <img src={writeSvg} alt="Write a post" className={styles.svg} />
          <img
            src={subscribedSvg}
            alt="Subscribed user list"
            className={styles.svg}
          />
          <img src={userSvg} alt="Your profile" className={styles.svg} />
        </div>
        <div className={styles.container}>
          <div className={styles.marginBottom}>
            <UserAvatar image={testUser} alt="Your profile" />
          </div>
          <img src={logoutSvg} alt="logout" className={styles.svg} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
