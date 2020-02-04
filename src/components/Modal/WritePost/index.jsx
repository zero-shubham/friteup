import React, { useState, useContext } from "react"
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { useMutation } from "@apollo/react-hooks"
import { USER_WITH_POST, FEED } from "../../../services/queries"
import { CREATE_POST } from "../../../services/mutations"
import Loading from "../../Loading"
import { Context } from "../../../pages/app"
import modalStyles from "../modal.module.scss"
import styles from "./writePost.module.scss"

const WritePost = ({ open, handleClose }) => {
  const context = useContext(Context)
  const userId = context.userId
  const darkMode = context.darkMode
  const setSnackbar = context.setRootSnakbar
  const [createPost, createPostMutationObj] = useMutation(CREATE_POST)
  const [postText, setPostText] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postPublished, setPostPublished] = useState(false)

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
          refetchQueries: [
            {
              query: USER_WITH_POST,
              variables: { user_id: userId },
            },
            {
              query: FEED,
            },
          ],
        })
        if (response.data.create_post && response.data.create_post.id) {
          setSnackbar({
            message: "Post was successful!",
            type: "success",
            show: true,
          })
          resetAllStates()
          handleClose()
        } else {
          setSnackbar({
            message: "Something went wrong!",
            type: "error",
            show: true,
          })
        }
      }
    } catch (error) {
      setSnackbar({
        message: error.message,
        type: "error",
        show: true,
      })
    }
  }

  const modalBodyClasses = `${modalStyles.body} ${styles.modalBody}`
  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div
        className={
          darkMode ? `${modalBodyClasses} ${styles.dark}` : modalBodyClasses
        }
      >
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
      </div>
    </Modal>
  )
}

export default WritePost
