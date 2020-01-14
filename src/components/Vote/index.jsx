import React from "react"

import Badge from "@material-ui/core/Badge"
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import styles from "./vote.module.scss"
const Vote = ({ postId, upVoteCount, downVoteCount, active }) => {
  return (
    <div className={styles.votes}>
      <Badge badgeContent={upVoteCount}>
        {active ? (
          <ThumbUpOutlinedIcon fontSize="inherit" color={"primary"} />
        ) : (
          <ThumbUpIcon fontSize="inherit" />
        )}

        <div className={styles.label}>Upvotes</div>
      </Badge>
      <Badge badgeContent={downVoteCount}>
        {active ? (
          <ThumbDownOutlinedIcon fontSize="inherit" color={"primary"} />
        ) : (
          <ThumbDownIcon fontSize="inherit" />
        )}

        <div className={styles.label}>Downvotes</div>
      </Badge>
    </div>
  )
}

export default Vote
