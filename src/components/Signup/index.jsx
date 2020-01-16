import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import TextField from "@material-ui/core/TextField"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import Button from "../Button"
import Logo from "../Logo"
import Backdrop from "../Backdrop"
import styles from "./signup.module.scss"
import typewriter from "../../images/typewriter.svg"
import { validateInput } from "../../common/functions"
import { regex } from "../../common/constants"

const SIGNUP = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    create_user(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`
const SIGNIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`
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
  // const [signIn, { signInData }] = useMutation()

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
    if (priBtnTxt === "Sign-Up") {
      try {
        // await response and look for error message
        await signUp({ variables: { name, email, password } })
        setMessage({
          message: "You have successfully created an account!",
          type: "success",
        })
        setSecBtnTxt("Sign-Up")
        setPriBtnTxt("Sign-In")
      } catch (error) {}
    } else if (priBtnTxt === "Sign-In") {
      try {
        // await response and look for error message
        const response = await signIn({ variables: { email, password } })
        navigate(`/app/${response.data.login.user.id}`)
      } catch (error) {}
    }
  }

  // error message useEffect
  useEffect(() => {
    if (signInMutationObj && signInMutationObj.error) {
      setMessage({ message: signInMutationObj.error.message, type: "error" })
    }
  }, [signInMutationObj.error])

  useEffect(() => {
    if (signUpMutationObj && signUpMutationObj.error) {
      setMessage({ message: signUpMutationObj.error.message, type: "error" })
    }
  }, [signUpMutationObj.error])

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
      <Backdrop show={signInMutationObj.loading || signUpMutationObj.loading} />
    </>
  )
}

export default Signup
