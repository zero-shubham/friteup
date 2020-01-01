import React, { useState } from "react"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Button from "../Button"
import Logo from "../Logo"
import styles from "./signup.module.scss"
import typewriter from "../../images/typewriter.svg"

const Signup = () => {
  const [secBtnTxt, setSecBtnTxt] = useState("Sign-In")
  const [priBtnTxt, setPriBtnTxt] = useState("Sign-Up")

  const secBtnOnClick = () => {
    if (secBtnTxt === "Sign-In") {
      setSecBtnTxt("Sign-Up")
      setPriBtnTxt("Sign-In")
    } else {
      setSecBtnTxt("Sign-In")
      setPriBtnTxt("Sign-Up")
    }
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
              error={true}
              helperText={"Ooops!"}
            />
            <TextField label="Password" type="password" />
            <TextField
              label="Name"
              className={
                priBtnTxt === "Sign-In"
                  ? styles.hide
                  : `${styles.inputComp} ${styles.show}`
              }
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
