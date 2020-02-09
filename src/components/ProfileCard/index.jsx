import React, { useEffect, useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import PeopleIcon from "@material-ui/icons/People"
import Badge from "@material-ui/core/Badge"
import { SUBSCRIBE, UNSUBSCRIBE } from "../../services/mutations"
import { USER, USER_WITH_POST, FEED } from "../../services/queries"
import { Context } from "../../pages/app"
import { SearchContext } from "../SearchBar"
import Loading from "../Loading"
import UserAvatar from "../UserAvatar"
import styles from "./ProfileCard.module.scss"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  small: {
    minHeight: "5rem",
  },
  large: {
    minHeight: "15rem",
  },
  dark: {
    backgroundColor: "#cacaca",
  },
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    fontSize: "1rem",
  },
}))(Badge)

const ProfileCard = ({
  name,
  bio,
  subsCount,
  subStatus,
  showSubBtn = false,
  thisUserId,
  size = "large",
  profileLink = false,
  onClick,
}) => {
  const context = useContext(Context)
  const darkMode = context && context.darkMode
  const searchContext = useContext(SearchContext)
  const searchRefetch = searchContext ? searchContext.refetch : null

  const userId = context && context.userId
  const classes = useStyles()
  const [subscribeUser, subscribeUserMutaionObj] = useMutation(SUBSCRIBE, {
    variables: {
      user_id: thisUserId,
    },
    refetchQueries: [
      {
        query: USER,
        variables: {
          user_id: userId,
        },
      },
      {
        query: USER_WITH_POST,
        variables: {
          user_id: thisUserId,
        },
      },
      {
        query: FEED,
      },
    ],
    fetchPolicy: "no-cache",
  })
  const [unSubscribeUser, unSubscribeUserMutationObj] = useMutation(
    UNSUBSCRIBE,
    {
      variables: {
        user_id: thisUserId,
      },
      refetchQueries: [
        {
          query: USER,
          variables: {
            user_id: userId,
          },
        },
        {
          query: USER_WITH_POST,
          variables: {
            user_id: thisUserId,
          },
        },
      ],
      fetchPolicy: "no-cache",
    }
  )

  useEffect(() => {
    if (searchRefetch) {
      searchRefetch()
    }
  }, [unSubscribeUserMutationObj.data, subscribeUserMutaionObj.data])
  const cardClasses = darkMode
    ? `${classes.dark} ${classes.card}`
    : classes.card
  return (
    <Paper elevation={2} className={styles.body}>
      <Card
        className={
          size === "small"
            ? `${cardClasses} ${classes.small}`
            : `${cardClasses} ${classes.large}`
        }
        variant="outlined"
      >
        <Loading
          loading={
            subscribeUserMutaionObj.loading ||
            unSubscribeUserMutationObj.loading
          }
        >
          <CardContent className={styles.content}>
            <div className={styles.photo}>
              {size === "small" ? (
                <UserAvatar alt="Your profile" size="small" />
              ) : (
                <UserAvatar alt="Your profile" size="large" />
              )}
            </div>
            <div className={styles.details}>
              <div
                className={
                  profileLink
                    ? `${styles.name} ${styles.profileLink}`
                    : styles.name
                }
                onClick={() => {
                  if (onClick) {
                    onClick()
                  }
                }}
              >
                {name}
              </div>
              {/* add logic for max length 292 */}
              <div>{bio}</div>
            </div>
            <div className={styles.subcribeContent}>
              <div className={styles.subscribers}>
                Subscribers{" "}
                <StyledBadge badgeContent={subsCount} color="primary" showZero>
                  <PeopleIcon className={styles.subsIcon} />
                </StyledBadge>
              </div>
              {showSubBtn &&
                (subStatus ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={subscribeUser}
                  >
                    Subscribe+
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={unSubscribeUser}
                  >
                    UnSubscribe-
                  </Button>
                ))}
            </div>
          </CardContent>
        </Loading>
      </Card>
    </Paper>
  )
}

export default ProfileCard
