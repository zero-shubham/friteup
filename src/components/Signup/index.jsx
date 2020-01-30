import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import TextField from "@material-ui/core/TextField"
import { useMutation } from "@apollo/react-hooks"
import Button from "../Button"
import Logo from "../Logo"
import Backdrop from "../Backdrop"
import styles from "./signup.module.scss"
import typewriter from "../../images/typewriter.svg"
import { validateInput } from "../../common/functions"
import { regex } from "../../common/constants"
import SnackbarMessage from "../Snackbar"
import { SIGNUP, SIGNIN } from "../../services/mutations"

const Signup = ({ client }) => {
  const [secBtnTxt, setSecBtnTxt] = useState("Sign-Up")
  const [priBtnTxt, setPriBtnTxt] = useState("Sign-In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")
  const [message, setMessage] = useState({
    message: "",
    type: "",
  })

  const [signUp, signUpMutationObj] = useMutation(SIGNUP)
  const [signIn, signInMutationObj] = useMutation(SIGNIN)

  const resetMessage = () => {
    setMessage({
      message: "",
      type: "",
    })
  }

  const secBtnOnClick = () => {
    if (secBtnTxt === "Sign-In") {
      setSecBtnTxt("Sign-Up")
      setPriBtnTxt("Sign-In")
    } else {
      setSecBtnTxt("Sign-In")
      setPriBtnTxt("Sign-Up")
    }
    setName("")
  }

  const handlePrimaryBtnSubmit = async () => {
    try {
      if (priBtnTxt === "Sign-Up") {
        // await response and look for error message
        await signUp({ variables: { name, email, password } })
        setMessage({
          message: "You have successfully created an account!",
          type: "success",
        })
        setSecBtnTxt("Sign-Up")
        setPriBtnTxt("Sign-In")
      } else if (priBtnTxt === "Sign-In") {
        // await response and look for error message
        const response = await signIn({ variables: { email, password } })
        if (response.data.login.user.id) {
          navigate(`/app/${response.data.login.user.id}`)
        }
      }
    } catch (error) {
      setMessage({
        message: error.message,
        type: "error",
      })
    }
  }

  // error message useEffect
  useEffect(() => {
    if (signInMutationObj && signInMutationObj.error) {
      setMessage({ message: signInMutationObj.error.message, type: "error" })
    }
  }, [signInMutationObj])

  useEffect(() => {
    if (signUpMutationObj && signUpMutationObj.error) {
      setMessage({ message: signUpMutationObj.error.message, type: "error" })
    }
  }, [signUpMutationObj])

  return (
    <>
      <div className={styles.body}>
        <Logo />
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <img src={typewriter} alt="" className={styles.image} />
          </div>
          <div className={styles.rightSection}>
            <TextField
              label="Email"
              type="email"
              error={!!emailError}
              helperText={emailError}
              value={email}
              required={true}
              className={styles.textField}
              onChange={e => {
                if (!validateInput(e.target.value, regex.email)) {
                  setEmailError("Please enter a valid e-mail.")
                } else {
                  setEmailError("")
                }
                setEmail(e.target.value)
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              required={true}
              className={styles.textField}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              label="Name"
              className={
                priBtnTxt === "Sign-In"
                  ? `${styles.hide} ${styles.textField}`
                  : `${styles.inputComp} ${styles.show} ${styles.textField}`
              }
              error={!!nameError}
              helperText={nameError}
              required={true}
              value={name}
              onChange={e => {
                if (!validateInput(e.target.value, regex.name)) {
                  setNameError("Please enter a valid name.")
                } else {
                  setNameError("")
                }
                setName(e.target.value)
              }}
            />
            <div
              className={
                priBtnTxt === "Sign-In"
                  ? `${styles.shiftUp} ${styles.animateContainer2}`
                  : `${styles.animateContainer2} ${styles.shiftDown}`
              }
            >
              <Button
                onClick={e => {
                  e.preventDefault()
                  handlePrimaryBtnSubmit()
                }}
                className={styles.SignUpbtn}
              >
                {priBtnTxt}
              </Button>
              <Button
                type="SECONDARY"
                onClick={secBtnOnClick}
                className={styles.SignInBtn}
              >
                {secBtnTxt}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SnackbarMessage
        show={!!message.message}
        message={message.message}
        type={message.type}
        handleClose={resetMessage}
      />
      <Backdrop show={signInMutationObj.loading || signUpMutationObj.loading} />
    </>
  )
}

export default Signup
