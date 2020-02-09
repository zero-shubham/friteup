import React, { useContext, useEffect, useState } from "react"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import Modal from "@material-ui/core/Modal"
import { Context } from "../../../pages/app"
import { USER, USERS } from "../../../services/queries"
import ProfileCard from "../../ProfileCard"
import ProfileView from "../../ProfileView"
import Loading from "../../Loading"
import modalStyles from "../modal.module.scss"
import styles from "./SubscribedList.module.scss"

const SubscribedList = ({ open, handleClose }) => {
  const context = useContext(Context)
  const userId = context && context.userId
  const setView = context && context.setView
  const darkMode = context && context.darkMode

  const [subscribedUsers, setSubscribedUsers] = useState([])
  const [renderList, setRenderList] = useState([])

  const { data, loading, error } = useQuery(USER, {
    variables: {
      user_id: userId,
    },
  })

  const [getSubscribedUsers, getSubscribedUsersObj] = useLazyQuery(USERS, {
    variables: {
      user_ids: subscribedUsers,
    },
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    if (data && data.user.subscribed.length) {
      setSubscribedUsers(data.user.subscribed)
    } else {
      setRenderList([])
    }
  }, [data])

  useEffect(() => {
    if (subscribedUsers.length) {
      getSubscribedUsers()
    }
  }, [subscribedUsers])

  useEffect(() => {
    if (getSubscribedUsersObj.data) {
      const tmp = getSubscribedUsersObj.data.users.map((user, idx) => (
        <ProfileCard
          name={user.name}
          subsCount={user.subscribers.length}
          thisUserId={user.id}
          size={"small"}
          profileLink={true}
          onClick={() => {
            handleClose()
            setView(<ProfileView userId={user.id} />)
          }}
          key={idx}
        />
      ))
      setRenderList(tmp)
    }
  }, [getSubscribedUsersObj.data])

  const modalBodyClasses = `${modalStyles.body} ${styles.modalBody}`

  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div
        className={
          darkMode ? `${modalBodyClasses} ${styles.dark}` : modalBodyClasses
        }
      >
        <Loading loading={loading}>
          {renderList.length ? renderList : ""}
        </Loading>
      </div>
    </Modal>
  )
}

export default SubscribedList
