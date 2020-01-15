import React from "react"
import Logo from "../Logo"
import Button from "../Button"
import LaptopIcon from "@material-ui/icons/Laptop"
import styles from "./landingPage.module.scss"
import Typewriter from "typewriter-effect"

const LandingPage = () => {
  return (
    <div className={styles.body}>
      <div className={styles.topSection}>
        <Logo />
        <Button className={styles.btn} href="/sign-in" target="_self">
          Sign-in / Sign-up
        </Button>
      </div>
      <div className={styles.midSection}>
        <div className={styles.banner}>
          Write your thoughts here and free them up.
        </div>
        <div className={styles.subHeading}>
          <Typewriter
            options={{
              strings: [
                "Use this app as your journal or your blog.",
                "Your posts can be kept private or can be published on your wish.",
                "Subscribe to other users to read their public posts.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className={styles.bottomSection}>
        Made with <LaptopIcon fontSize="large" /> by Shubham Biswas
      </div>
    </div>
  )
}
export default LandingPage
