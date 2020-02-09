import React, { useState, useEffect, useContext } from "react"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import ProfileView from "../ProfileView"
import ProfileCard from "../ProfileCard"
import PostDisplay from "../PostDisplay"
import { Context } from "../../pages/app"
import styles from "./SearchView.module.scss"

const SearchView = ({ users, posts, refetch }) => {
  const context = useContext(Context)
  const userId = context && context.userId
  const setView = context && context.setView
  const darkMode = context && context.darkMode

  const [tabState, setState] = useState("users")
  const [views, setViews] = useState({
    users: [],
    posts: [],
  })

  const handleChange = (e, newVal) => {
    setState(newVal)
  }

  useEffect(() => {
    const tmp = users.map((user, idx) => (
      <ProfileCard
        name={user.name}
        subsCount={user.subscribers.length}
        bio={user.bio}
        key={idx}
        showSubBtn={true}
        subStatus={!user.subscribers.includes(userId)}
        thisUserId={user.id}
        profileLink={true}
        onClick={() => {
          setView(<ProfileView userId={user.id} />)
        }}
      />
    ))
    setViews(prevState => ({ ...prevState, users: tmp }))
  }, [users])

  useEffect(() => {
    const tmp = posts.map((post, idx) => (
      <PostDisplay
        name={post.user.name}
        downVotes={post.down_vote}
        upVotes={post.up_vote}
        text={post.text}
        title={post.title}
        key={idx}
        thisUserId={post.user.id}
        postId={post.id}
        refetch={refetch}
      />
    ))
    setViews(prevState => ({ ...prevState, posts: tmp }))
  }, [posts])

  return (
    <div className={darkMode ? `${styles.body} ${styles.dark}` : styles.body}>
      <Paper
        className={
          darkMode ? `${styles.darkTabBar} ${styles.tabBar}` : styles.tabBar
        }
        square
      >
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          value={tabState}
          onChange={handleChange}
        >
          <Tab label="Users" value={"users"} />
          <Tab label="Posts" value={"posts"} />
        </Tabs>
      </Paper>
      <Paper
        className={
          darkMode ? `${styles.container} ${styles.dark2}` : styles.container
        }
      >
        {views[tabState]}
      </Paper>
    </div>
  )
}

export default SearchView
