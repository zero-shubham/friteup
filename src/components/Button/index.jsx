import React from "react"
import { Link } from "@reach/router"
import styles from "./Button.module.scss"

const Button = ({
  children,
  href,
  onClick,
  target = "_blank",
  type = "PRIMARY",
  className,
}) => {
  const classes =
    type === "PRIMARY"
      ? `${styles.button} ${styles.primary} ${className}`
      : `${styles.button} ${styles.secondary} ${className}`
  const comp = href ? (
    <Link to={href} className={classes}>
      {children}
    </Link>
  ) : (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
  return comp
}

export default Button
