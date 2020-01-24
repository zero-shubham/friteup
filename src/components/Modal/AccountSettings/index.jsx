import React, { useContext } from "react"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import DeleteIcon from "@material-ui/icons/Delete"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { UPDATE_USER, USER } from "../../../services/gqlTags"
import Loading from "../../Loading"
import EditDetail from "./EditDetail"
import EditPassword from "./EditPassword"
import { Context } from "../../../pages/app"
import modalStyles from "../modal.module.scss"
import styles from "./accountSettings.module.scss"

const AccountSettings = ({ open, handleClose }) => {
  const context = useContext(Context)
  const userId = context.userId
  const { data, loading, error } = useQuery(USER, {
    variables: { user_id: userId },
  })
  const [updateUser, updateUserMutationObj] = useMutation(UPDATE_USER)

  const handleSubmit = async (_type, value) => {
    await updateUser({
      variables: { [_type]: value },
      refetchQueries: [
        {
          query: USER,
          variables: { user_id: userId },
        },
      ],
    })
  }
  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div className={`${styles.body} ${modalStyles.body}`}>
        <Loading
          loading={updateUserMutationObj.loading}
          parentClassName={styles.body}
        >
          <div className={styles.content}>
            <EditDetail
              value={data && data.user.name}
              label={"Name"}
              handleDone={value => handleSubmit("name", value)}
            />
            <EditDetail
              value={data && data.user.email}
              label={"E-mail"}
              handleDone={value => handleSubmit("email", value)}
            />
            <EditPassword />
            <FormControlLabel
              control={
                <Switch
                  checked={data && data.user.night_mode}
                  color="primary"
                  onChange={() => handleSubmit("night_mode", !data.user.night_mode)}
                />
              }
              label="Night Mode"
              labelPlacement="start"
            />
            <Button
              variant="contained"
              color="secondary"
              className={styles.deleteBtn}
            >
              Delete Account
              <DeleteIcon className={styles.deleteSvg} />
            </Button>
          </div>
        </Loading>
      </div>
    </Modal>
  )
}

export default AccountSettings
