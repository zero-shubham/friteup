import React, { useContext, useState, useEffect } from "react"
import { useMutation } from "@apollo/react-hooks"
import Badge from "@material-ui/core/Badge"
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import { Context } from "../../pages/app"
import { SearchContext } from "../SearchBar"
import { VOTE_POST } from "../../services/mutations"
import { USER_WITH_POST, FEED } from "../../services/queries"
import styles from "./vote.module.scss"
const Vote = ({
  postId,
  thisUserId,
  refetch,
  upVotes = [],
  downVotes = [],
  btnsActive = false,
}) => {
  const context = useContext(Context)

  const searchContext = useContext(SearchContext)
  const searchRefetch = searchContext ? searchContext.refetch : null

  const userId = context.userId
  const [voteType, setVoteType] = useState()
  const [votePostMutation, votePostMutationObj] = useMutation(VOTE_POST)
  const submitUpvote = () => {
    setVoteType("UP_VOTE")
  }

  const submitDownvote = () => {
    setVoteType("DOWN_VOTE")
  }

  const initVotePostMutation = async () => {
    await votePostMutation({
      variables: {
        post_id: postId,
        vote_type: voteType,
      },
      fetchPolicy: "no-cache",
      refetchQueries: [
        {
          query: FEED,
        },
        {
          query: USER_WITH_POST,
          variables: {
            user_id: thisUserId,
          },
        },
      ],
    })
    if (searchRefetch) {
      searchRefetch()
    }
    setVoteType("")
  }

  useEffect(() => {
    if (voteType && postId) {
      initVotePostMutation()
    }
  }, [voteType])
  return (
    <div className={styles.votes}>
      <Badge badgeContent={upVotes.length} showZero>
        {upVotes.includes(userId) ? (
          <ThumbUpOutlinedIcon
            fontSize="inherit"
            color={"primary"}
            className={btnsActive ? styles.thumbUpInactive : ""}
            onClick={submitUpvote}
          />
        ) : (
          <ThumbUpIcon
            fontSize="inherit"
            className={btnsActive ? styles.thumbUpInactive : ""}
            onClick={submitUpvote}
          />
        )}

        <div className={styles.label}>Upvotes</div>
      </Badge>
      <Badge badgeContent={downVotes.length} showZero>
        {downVotes.includes(userId) ? (
          <ThumbDownOutlinedIcon
            fontSize="inherit"
            color={"primary"}
            className={btnsActive ? styles.thumbDownInactive : ""}
            onClick={submitDownvote}
          />
        ) : (
          <ThumbDownIcon
            fontSize="inherit"
            className={btnsActive ? styles.thumbDownInactive : ""}
            onClick={submitDownvote}
          />
        )}

        <div className={styles.label}>Downvotes</div>
      </Badge>
    </div>
  )
}

export default Vote
