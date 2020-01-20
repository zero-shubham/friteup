import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { useMutation } from "@apollo/react-hooks"
import { CREATE_POST } from "../../../services/gqlTags"
import Loading from "../../Loading"
import modalStyles from "../modal.module.scss"
import styles from "./writePost.module.scss"

const WritePost = ({ open, handleClose }) => {
  const [createPost, createPostMutationObj] = useMutation(CREATE_POST)
  const [postText, setPostText] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postPublished, setPostPublished] = useState(false)
  console.log(createPostMutationObj)
  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div className={`${modalStyles.body}`}>
        <Loading
          loading={createPostMutationObj.loading}
          parentClassName={`${styles.body}`}
        >
          <TextField
            className={styles.title}
            label="Title for the post."
            variant="outlined"
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
          />
          <TextField
            className={styles.input}
            label="What's on your mind?"
            variant="outlined"
            rows="14"
            multiline
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
          <div className={styles.btnContainer}>
            <FormControlLabel
              control={
                <Switch
                  checked={postPublished}
                  color="primary"
                  onChange={() => setPostPublished(prevState => !prevState)}
                />
              }
              label="Publish this post"
            />
            <Button variant="contained" color="primary" className={styles.post}>
              Post
            </Button>
          </div>
        </Loading>
      </div>
    </Modal>
  )
}

export default WritePost
