import React, { useState, useEffect } from "react"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import ProfileCard from "../ProfileCard"
import PostDisplay from "../PostDisplay"
import styles from "./SearchView.module.scss"

const SearchView = ({ users, posts }) => {
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
        subsCount={0}
        bio={user.bio}
        key={idx}
        subBtn={true}
      />
    ))
    setViews(prevState => ({ ...prevState, users: tmp }))
  }, [users])

  useEffect(() => {
    console.log(posts, "----")
    const tmp = posts.map((post, idx) => (
      <PostDisplay
        name={post.user.name}
        downVotes={post.down_vote}
        upVotes={post.up_vote}
        text={post.text}
        title={post.title}
        key={idx}
      />
    ))
    setViews(prevState => ({ ...prevState, posts: tmp }))
  }, [posts])

  return (
    <div className={styles.body}>
      <Paper className={styles.tabBar} square>
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
      <Paper className={styles.container}>{views[tabState]}</Paper>
    </div>
  )
}

export default SearchView
