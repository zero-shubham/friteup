import React from "react"
import styles from "./Button.module.scss"

const Button = ({ children, href, onClick, target = "_blank" }) => {
  const comp = href ? (
    <a className={styles.button} href={href} target={target}>
      {children}
    </a>
  ) : (
    <div className={styles.button} onClick={onClick}>
      {children}
    </div>
  )
  return comp
}

export default Button
