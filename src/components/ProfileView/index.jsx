import React, { useEffect, useState, useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import Paper from "@material-ui/core/Paper"
import { USER_WITH_POST } from "../../services/queries"
import ProfileCard from "../ProfileCard"
import { Context } from "../../pages/app"
import PostDisplay from "../PostDisplay"
import styles from "./ProfileView.module.scss"

const ProfileView = ({ userId }) => {
  const context = useContext(Context)
  const currentUserId = context.userId
  const darkMode = context.darkMode

  const [postsRender, setPostsRender] = useState()
  const { data, loading, error } = useQuery(USER_WITH_POST, {
    variables: {
      user_id: userId,
    },
  })

  useEffect(() => {
    if (data) {
      const tmp = data.user.posts.map((post, idx) => (
        <PostDisplay
          name={data.user.name}
          title={post.title}
          text={post.text}
          upVotes={post.up_vote}
          downVotes={post.down_vote}
          thisUserId={data.user.id}
          key={idx}
          postId={post.id}
        />
      ))
      setPostsRender(tmp)
    }
  }, [data])
  return (
    <Paper className={darkMode ? `${styles.body} ${styles.dark}` : styles.body}>
      <ProfileCard
        name={data && data.user.name}
        bio={data && data.user.bio}
        subsCount={data && data.user.subscribers.length}
        subStatus={data && !data.user.subscribers.includes(currentUserId)}
        showSubBtn={data && currentUserId !== userId}
        thisUserId={data && data.user.id}
      />
      {postsRender}
    </Paper>
  )
}
export default ProfileView
