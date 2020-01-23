import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { useMutation } from "@apollo/react-hooks"
import { CREATE_POST } from "../../../services/gqlTags"
import Loading from "../../Loading"
import Snackbar from "../../Snackbar"
import modalStyles from "../modal.module.scss"
import styles from "./writePost.module.scss"

const WritePost = ({ open, handleClose }) => {
  const [createPost, createPostMutationObj] = useMutation(CREATE_POST)
  const [postText, setPostText] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postPublished, setPostPublished] = useState(false)
  const [error, setError] = useState({
    message: "",
    type: "",
    show: false,
  })

  const resetError = () => {
    setError({
      message: "",
      type: "",
      show: false,
    })
  }

  const resetAllStates = () => {
    setPostText("")
    setPostTitle("")
    setPostPublished(false)
  }

  const handlePost = async () => {
    try {
      if (postText && postTitle) {
        const response = await createPost({
          variables: {
            text: postText,
            title: postTitle,
            published: postPublished,
          },
        })
        if (response.data.create_post && response.data.create_post.id) {
          resetAllStates()
          handleClose()
        }else {
          setError({
            message: "Something went wrong!",
            type: "error",
            show: true
          })
        }
      }
    } catch (error) {
      setError({
        message: error.message,
        type: "error",
        show: true,
      })
    }
  }
  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div className={`${modalStyles.body} ${styles.modalBody}`}>
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
            <Button
              variant="contained"
              color="primary"
              className={styles.post}
              onClick={handlePost}
            >
              Post
            </Button>
          </div>
        </Loading>
        <Snackbar
          message={error.message}
          type={error.type}
          show={error.show}
          handleClose={resetError}
        />
      </div>
    </Modal>
  )
}

export default WritePost
