import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { USER_WITH_POST } from "../../services/queries"
import ProfileCard from "../ProfileCard"
import PostDisplay from "../PostDisplay"
import styles from "./ProfileView.module.scss"

const ProfileView = ({ userId }) => {
  const [postsRender, setPostsRender] = useState()
  const { data, loading, error } = useQuery(USER_WITH_POST, {
    variables: {
      user_id: userId,
    },
  })
  useEffect(() => {
    console.log("data...", data)
    if (data) {
      const postsDisplay = data.user.posts.map((post, idx) => (
        <PostDisplay
          name={data.user.name}
          title={post.title}
          text={post.text}
          upVotes={post.up_vote}
          downVotes={post.down_vote}
          key={idx}
        />
      ))
      setPostsRender(postsDisplay)
    }
  }, [data])
  return (
    <div className={styles.body}>
      <ProfileCard
        name={data && data.user.name}
        bio={data && data.user.bio}
        subsCount={data && data.user.subscribers.length}
        subBtn={false}
      />
      {postsRender}
    </div>
  )
}
export default ProfileView
