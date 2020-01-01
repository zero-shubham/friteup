import React, { useState } from "react"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Button from "../Button"
import Logo from "../Logo"
import styles from "./signup.module.scss"
import typewriter from "../../images/typewriter.svg"
import { validateInput } from "../../common/functions"
import { regex } from "../../common/constants"

const Signup = () => {
  const [secBtnTxt, setSecBtnTxt] = useState("Sign-In")
  const [priBtnTxt, setPriBtnTxt] = useState("Sign-Up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")

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
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              label="Name"
              className={
                priBtnTxt === "Sign-In"
                  ? styles.hide
                  : `${styles.inputComp} ${styles.show}`
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
                onClick={() => console.log("clicked")}
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
    </>
  )
}

export default Signup
