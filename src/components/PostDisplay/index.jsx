import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import ReadMore from "../Modal/ReadMore/index"
import UserAvatar from "../UserAvatar"
import Loading from "../Loading"
import Vote from "../Vote"
import styles from "./PostDisplay.module.scss"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "15rem",
  },
}))

const PostDisplay = ({
  name,
  title,
  text,
  upVotes,
  downVotes,
  thisUserId,
  postId,
}) => {
  

  const [modalOpen, setModalOpen] = useState(false)
  const resetModalOpen = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }
  // const [userIdState, setUserId] = useState(userId)
  const classes = useStyles()
  return (
    <div className={styles.wrapper}>
      <Paper elevation={2} className={styles.paper}>
        <Card className={classes.card} variant="outlined" onClick={openModal}>
          <Loading loading={false}>
            <CardContent>
              <div className={styles.topSection}>
                <UserAvatar alt="Your profile" />
                <div className={styles.details}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.title}>{title}</div>
                </div>
              </div>
              <div className={styles.bottomSection}>
                <div className={styles.text}>
                  {text.length > 346 ? `${text.slice(0, 346)}...` : text}
                  {text.length > 346 && (
                    <Button
                      variant="contained"
                      className={styles.button}
                      onClick={openModal}
                    >
                      Read More
                    </Button>
                  )}
                </div>
              </div>
              <Vote upVotes={upVotes} downVotes={downVotes} />
            </CardContent>
          </Loading>
        </Card>
      </Paper>
      <ReadMore
        open={modalOpen}
        handleClose={resetModalOpen}
        text={text}
        name={name}
        title={title}
        upVotes={upVotes}
        downVotes={downVotes}
        thisUserId={thisUserId}
        postId={postId}
      />
    </div>
  )
}
export default PostDisplay
