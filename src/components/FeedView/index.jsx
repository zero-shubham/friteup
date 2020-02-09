import React, { useEffect, useContext, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import Paper from "@material-ui/core/Paper"
import { FEED } from "../../services/queries"
import { Context } from "../../pages/app"
import Loading from "../Loading"
import PostDisplay from "../PostDisplay"
import styles from "./FeedView.module.scss"

const FeedView = () => {
  const context = useContext(Context)
  const setRootSnakbar = context && context.setRootSnakbar
  const darkMode = context && scontext.darkMode
  const { data, loading, error } = useQuery(FEED, {
    pollInterval: 3600,
  })
  const [renderPosts, setRenderPosts] = useState()
  useEffect(() => {
    if (error) {
      setRootSnakbar({
        message: error.message,
        type: "error",
        show: true,
      })
    }
  }, [error])

  useEffect(() => {
    // get feed and set the postDisplays
    if (data) {
      const tmp = data.feed.map((post, idx) => (
        <PostDisplay
          key={idx}
          name={post.user.name}
          title={post.title}
          text={post.text}
          upVotes={post.up_vote}
          downVotes={post.down_vote}
          thisUserId={post.user.id}
          postId={post.id}
        />
      ))
      setRenderPosts(tmp)
    }
  }, [data])

  return (
    <Paper
      className={
        darkMode ? `${styles.container} ${styles.dark}` : styles.container
      }
    >
      <Loading loading={loading}>
        <div>{renderPosts}</div>
      </Loading>
    </Paper>
  )
}

export default FeedView
