import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import EditIcon from "@material-ui/icons/Edit"
import DoneIcon from "@material-ui/icons/Done"
import styles from "./editDetail.module.scss"

const EditDetail = ({ value, label, handleDone }) => {
  const [readOnly, setReadOnly] = useState(true)
  const [detailValue, setDetailValue] = useState(value)

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
        <DoneIcon className={styles.edit} onClick={() => handleDone(detailValue)} />
      )}
    </div>
  )
}

export default EditDetail
