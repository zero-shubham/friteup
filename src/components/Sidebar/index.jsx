import React, { useState, useContext } from "react"
import Logo from "../Logo"
import ButtonWithTooltip from "../ButtonWithTooltip"
import WritePost from "../Modal/WritePost/index"
import UserAvatar from "../UserAvatar"
import { Context } from "../../pages/app"
import styles from "./Sidebar.module.scss"
import writeSvg from "../../images/edit.svg"
import userSvg from "../../images/user.svg"
import subscribedSvg from "../../images/subscribed.svg"
import logoutSvg from "../../images/logout.svg"

const Sidebar = ({ userId, name }) => {
  const context = useContext(Context)
  userId = context.userId

  const [modalState, setModalState] = useState({
    WritePost: false,
  })

  const initSetModalState = type => {
    setModalState(prevState => ({ ...prevState, [type]: true }))
  }

  const unsetModalState = type =>
    setModalState(prevState => ({ ...prevState, [type]: false }))

  return (
    <div className={styles.body}>
      <div className={styles.logoContent}>
        <Logo size={"small"} />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <ButtonWithTooltip
            alt="Write a post."
            svg={writeSvg}
            onClick={() => initSetModalState("WritePost")}
          />
          <ButtonWithTooltip alt="Subscribed user list." svg={subscribedSvg} />
          <ButtonWithTooltip alt={"Your profile."} svg={userSvg} />
        </div>
        <div className={styles.container}>
          <div className={styles.marginBottom}>
            <UserAvatar nameInitials="I" name={"Ishaan"} />
          </div>
          <ButtonWithTooltip alt={"Logout."} svg={logoutSvg} />
        </div>
        <WritePost
          open={modalState.WritePost}
          handleClose={() => unsetModalState("WritePost")}
        />
      </div>
    </div>
  )
}

export default Sidebar
