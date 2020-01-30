import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
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

const PostDisplay = ({ name, title, text, upVotes, downVotes }) => {
  const [modalOpen, setModalOpen] = useState(false)
  // const [userIdState, setUserId] = useState(userId)
  const classes = useStyles()
  return (
    <Paper elevation={2} className={styles.paper}>
      <Card className={classes.card} variant="outlined">
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
                <Button variant="contained" className={styles.button}>
                  Read More
                </Button>
              </div>
            </div>
            <Vote upVoteCount={upVotes} downVoteCount={downVotes} />
            <Modal open={modalOpen} />
          </CardContent>
        </Loading>
      </Card>
    </Paper>
  )
}
export default PostDisplay
