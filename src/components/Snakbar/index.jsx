import React, { useState } from "react"
import Snackbar from "@material-ui/core/Snackbar"

const SnackbarMessage = ({ message, type, show }) => {
  const [open, setOpen] = useState(show)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default SnackbarMessage
