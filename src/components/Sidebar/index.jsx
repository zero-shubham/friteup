import React, { useState, useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { navigate } from "@reach/router"
import { LOGOUT } from "../../services/mutations"
import Logo from "../Logo"
import ButtonWithTooltip from "../ButtonWithTooltip"
import WritePost from "../Modal/WritePost/index"
import AccountSettings from "../Modal/AccountSettings/index"
import UserAvatar from "../UserAvatar"
import UserNameAvatar from "../UserNameAvatar"
import ProfileView from "../ProfileView"
import { Context } from "../../pages/app"
import styles from "./Sidebar.module.scss"
import writeSvg from "../../images/edit.svg"
import cogSvg from "../../images/cog.svg"
import subscribedSvg from "../../images/subscribed.svg"
import logoutSvg from "../../images/logout.svg"

const Sidebar = ({ name }) => {
  const context = useContext(Context)
  const userId = context ? context.userId : ""
  const setView = context.setView
  const [logout, logoutMutationObj] = useMutation(LOGOUT)
  const [modalState, setModalState] = useState({
    WritePost: false,
    AccountSettings: false,
  })

  const handleLogout = async () => {
    try {
      const response = await logout()
      if (response.data.logout.logged_out) {
        navigate("/")
      } else {
        // error as user couldn't logout
      }
    } catch (error) {}
  }
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
          <ButtonWithTooltip
            alt={"Account settings."}
            svg={cogSvg}
            onClick={() => initSetModalState("AccountSettings")}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.marginBottom}>
            <UserNameAvatar
              nameInitials={name && name[0]}
              name={name && name.split(" ")[0]}
              onClick={() => {
                setView(<ProfileView userId={userId} />)
              }}
            />
          </div>
          <ButtonWithTooltip
            alt={"Logout."}
            svg={logoutSvg}
            onClick={handleLogout}
          />
        </div>
        <WritePost
          open={modalState.WritePost}
          handleClose={() => unsetModalState("WritePost")}
        />
        <AccountSettings
          open={modalState.AccountSettings}
          handleClose={() => unsetModalState("AccountSettings")}
        />
      </div>
    </div>
  )
}

export default Sidebar
