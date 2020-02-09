import React, { useContext, useEffect } from "react"
import { navigate } from "@reach/router"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import DeleteIcon from "@material-ui/icons/Delete"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { USER, USER_WITH_POST } from "../../../services/queries"
import {
  CHANGE_PASSWORD,
  UPDATE_USER,
  DELETE_USER,
} from "../../../services/mutations"
import Loading from "../../Loading"
import EditDetail from "./EditDetail"
import EditPassword from "./EditPassword"
import { Context } from "../../../pages/app"
import { client } from "../../../apollo/client"
import modalStyles from "../modal.module.scss"
import styles from "./accountSettings.module.scss"

// todo: error message handling
const AccountSettings = ({ open, handleClose }) => {
  const context = useContext(Context)
  const userId = context && context.userId
  const setSnackbar = context && context.setRootSnakbar
  const darkMode = context && context.darkMode

  const { data, loading, error, refetch } = useQuery(USER, {
    variables: { user_id: userId },
    fetchPolicy: "no-cache",
  })
  const [updateUser, updateUserMutationObj] = useMutation(UPDATE_USER)
  const [changePassword, changePasswordMutationObj] = useMutation(
    CHANGE_PASSWORD
  )
  const [deleteUser, deleteUserMutationObj] = useMutation(DELETE_USER)

  const handleUpdateUserSubmit = async (_type, value) => {
    const resp = await updateUser({
      variables: { [_type]: value },
      refetchQueries: [
        {
          query: USER,
          variables: { user_id: userId },
        },
      ],
    })
    if (resp.data.update_user.name) {
      setSnackbar({
        message: "Successfully updated!",
        type: "success",
        show: true,
      })
    }
    refetch()
  }

  const handleChangePasswordSubmit = async variables => {
    const resp = await changePassword({
      variables,
    })
    if (resp.data.change_password) {
      setSnackbar({
        message: "Password was changed successfully!",
        type: "success",
        show: true,
      })
    } else {
      setSnackbar({
        message:
          "Password was not changed, make sure you enter your old password correctly.",
        type: "error",
        show: true,
      })
    }
  }

  const handleDeleteUser = async () => {
    const done = await deleteUser()
    if (done && done.data && done.data.delete_user) {
      client.cache.reset()
      navigate("/")
    } else {
      setSnackbar({
        message: "Couldn't delete the user",
        show: true,
        type: "error",
      })
    }
  }

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: error.message,
        show: true,
        type: "error",
      })
    }
    if (updateUserMutationObj.error) {
      setSnackbar({
        message: updateUserMutationObj.error.message,
        show: true,
        type: "error",
      })
    }
    if (changePasswordMutationObj.error) {
      setSnackbar({
        message: changePasswordMutationObj.error.message,
        show: true,
        type: "error",
      })
    }
  }, [
    error,
    updateUserMutationObj.error,
    changePasswordMutationObj.error,
    deleteUserMutationObj.error,
  ])

  const modalBodyClasses = `${modalStyles.body} ${styles.modalBody}`

  return (
    <Modal open={open} onClose={handleClose} className={modalStyles.modal}>
      <div
        className={
          darkMode ? `${modalBodyClasses} ${styles.dark}` : modalBodyClasses
        }
      >
        <Loading
          loading={
            updateUserMutationObj.loading ||
            changePasswordMutationObj.loading ||
            loading
          }
          parentClassName={
            darkMode ? `${styles.body} ${styles.dark}` : styles.body
          }
        >
          <div className={styles.content}>
            <EditDetail
              value={data && data.user.name}
              label={"Name"}
              handleDone={value => handleUpdateUserSubmit("name", value)}
            />
            <EditDetail
              value={data && data.user.bio}
              label={"Bio"}
              handleDone={value => handleUpdateUserSubmit("bio", value)}
            />
            <EditDetail
              value={data && data.user.email}
              label={"E-mail"}
              handleDone={value => handleUpdateUserSubmit("email", value)}
            />
            <EditPassword handleDone={handleChangePasswordSubmit} />
            <FormControlLabel
              control={
                <Switch
                  checked={data && data.user.night_mode}
                  color="primary"
                  onChange={() =>
                    handleUpdateUserSubmit("night_mode", !data.user.night_mode)
                  }
                />
              }
              label="Night Mode"
              labelPlacement="start"
            />
            <Button
              variant="contained"
              color="secondary"
              className={styles.deleteBtn}
              onClick={handleDeleteUser}
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
