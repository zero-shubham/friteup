import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import EditIcon from "@material-ui/icons/Edit"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
import styles from "./editDetail.module.scss"

const EditDetail = ({ value, label, handleDone }) => {
  const [readOnly, setReadOnly] = useState(true)
  const [detailValue, setDetailValue] = useState(value)

  const handleCancel = () => {
    setReadOnly(true)
    setDetailValue(value)
  }

  return (
    <div className={styles.body}>
      <TextField
        value={detailValue}
        onChange={e => setDetailValue(e.target.value)}
        label={label}
        InputProps={{
          readOnly: readOnly,
        }}
        variant="outlined"
        className={styles.textField}
      />
      {readOnly ? (
        <EditIcon className={styles.edit} onClick={() => setReadOnly(false)} />
      ) : (
        <div className={styles.btnContainer}>
          <DoneIcon
            className={styles.done}
            onClick={() => handleDone(detailValue)}
          />
          <CloseIcon className={styles.close} onClick={handleCancel} />
        </div>
      )}
    </div>
  )
}

export default EditDetail
