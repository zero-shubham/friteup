import React, { useContext } from "react"
import Modal from "@material-ui/core/Modal"
import CardContent from "@material-ui/core/CardContent"
import Vote from "../../Vote"
import { Context } from "../../../pages/app"
import UserAvatar from "../../UserAvatar"
import ProfileView from "../../ProfileView"
import styles from "./ReadMore.module.scss"
import modalStyles from "../modal.module.scss"

const ReadMore = ({
  name,
  title,
  text,
  open,
  handleClose,
  upVotes,
  downVotes,
  thisUserId,
  postId,
}) => {
  const context = useContext(Context)
  const setView = context.setView
  const userId = context.userId

  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div className={`${modalStyles.body} ${styles.modalBody}`}>
        <CardContent>
          <div className={styles.topSection}>
            <UserAvatar alt="Your profile" />
            <div className={styles.details}>
              <div
                className={styles.name}
                onClick={() => {
                  handleClose()
                  setView(<ProfileView userId={thisUserId} />)
                }}
              >
                {name}
              </div>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.text}>{text}</div>
          </div>
          <div className={styles.voteContainer}>
            <Vote
              upVotes={upVotes}
              downVotes={downVotes}
              btnsActive={true}
              thisUserId={thisUserId}
              postId={postId}
            />
          </div>
        </CardContent>
      </div>
    </Modal>
  )
}

export default ReadMore
