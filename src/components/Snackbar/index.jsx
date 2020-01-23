import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import styles from "./snackbar.module.scss"

const SnackbarMessage = ({ message, type, show, handleClose, className }) => {
  return (
    <div className={styles.container}>
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} className={className}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default SnackbarMessage
