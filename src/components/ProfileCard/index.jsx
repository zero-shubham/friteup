import React from "react"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import PeopleIcon from "@material-ui/icons/People"
import Badge from "@material-ui/core/Badge"
import Loading from "../Loading"
import UserAvatar from "../UserAvatar"
import styles from "./ProfileCard.module.scss"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "15rem",
    justifyContent: "center",
  },
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    fontSize: "1rem"
  },
}))(Badge)

const ProfileCard = ({name, bio, subsCount, subBtn}) => {
  const classes = useStyles()
  return (
    <Paper elevation={2} className={styles.body}>
      <Card className={classes.card} variant="outlined">
        <Loading loading={false}>
          <CardContent className={styles.content}>
            <div className={styles.photo}>
              <UserAvatar alt="Your profile" size="large" />
            </div>
            <div className={styles.details}>
              <div className={styles.name}>{name}</div>
              {/* add logic for max length 292 */}
              <div>
                {bio}
              </div>
            </div>
            <div className={styles.subcribeContent}>
              <div className={styles.subscribers}>
                Subscribers{" "}
                <StyledBadge badgeContent={subsCount} color="primary" showZero>
                  <PeopleIcon className={styles.subsIcon} />
                </StyledBadge>
              </div>
              {subBtn && <Button variant="outlined" color="primary">
                Subscribe+
              </Button>}
            </div>
          </CardContent>
        </Loading>
      </Card>
    </Paper>
  )
}

export default ProfileCard
