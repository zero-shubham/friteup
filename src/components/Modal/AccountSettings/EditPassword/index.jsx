import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import EditIcon from "@material-ui/icons/Edit"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
import styles from "./editPassword.module.scss"

const EditPassword = () => {
  const [readOnly, setReadOnly] = useState(true)
  const [label, setLabel] = useState("Password")
  const [oldPass, setOldPass] = useState("password")
  const [newPass, setNewPass] = useState("")

  const handleEdit = () => {
    setReadOnly(false)
    setOldPass("")
    setLabel("Enter Old Password")
  }

  const handleCancel = () => {
    setReadOnly(true)
    setLabel("Password")
    setOldPass("password")
    setNewPass("")
  }
  return (
    <div className={styles.body}>
      <div className={styles.oldPass}>
        <TextField
          value={oldPass}
          label={label}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
          className={styles.textField}
          type="password"
          onChange={e => setOldPass(e.target.value)}
        />
        {readOnly ? (
          <EditIcon className={styles.edit} onClick={handleEdit} />
        ) : (
          <CloseIcon className={styles.edit} onClick={handleCancel} />
        )}
      </div>

      <div
        className={
          readOnly ? styles.newPass : `${styles.newPass} ${styles.show}`
        }
      >
        <TextField
          label="Enter New Password"
          variant="outlined"
          className={styles.textField}
          type="password"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
        />
        <DoneIcon className={styles.edit} />
      </div>
    </div>
  )
}

export default EditPassword
