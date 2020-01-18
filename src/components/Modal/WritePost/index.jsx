import React from "react"
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import modalStyles from "../modal.module.scss"
import styles from "./writePost.module.scss"

const WritePost = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div className={`${modalStyles.body} ${styles.body}`}>
        <TextField
          className={styles.input}
          label="What's on your mind?"
          variant="outlined"
          rows="14"
          multiline
        />
        <FormControlLabel
          control={<Switch value="publish" color="primary" />}
          label="Publish this post"
        />
        <Button variant="contained" color="primary">
          Post
        </Button>
      </div>
    </Modal>
  )
}

export default WritePost
