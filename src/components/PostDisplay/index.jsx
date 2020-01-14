import React from "react"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import UserAvatar from "../UserAvatar"
import Loading from "../Loading"
import Vote from "../Vote"
import styles from "./PostDisplay.module.scss"
import testUser from "../../images/test.jpg"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "15rem",
  },
}))

const PostDisplay = () => {
  const classes = useStyles()
  return (
    <Paper elevation={2} className={styles.paper}>
      <Card className={classes.card} variant="outlined">
        <Loading loading={true}>
          <CardContent>
            <div className={styles.topSection}>
              <UserAvatar image={testUser} alt="Your profile" />
              <div className={styles.details}>
                <div className={styles.name}>Full Name</div>
                <div className={styles.title}>Heading for the post.</div>
              </div>
            </div>
            <div className={styles.bottomSection}>
              <div className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                illo quisquam sed doloremque earum ducimus blanditiis doloribus
                culpa in dolorem quam animi modi alias, aperiam corrupti
                repellendus laboriosam explicabo corporis? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Officia illo quisquam sed
                doloremque earum ducimus blanditiis...
                <Button variant="contained" className={styles.button}>
                  Read More
                </Button>
              </div>
            </div>
            <Vote upVoteCount={3} downVoteCount={1} />
          </CardContent>
        </Loading>
      </Card>
    </Paper>
  )
}
export default PostDisplay
