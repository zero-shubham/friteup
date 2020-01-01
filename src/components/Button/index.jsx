import React from "react"
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
    <a className={classes} href={href} target={target}>
      {children}
    </a>
  ) : (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
  return comp
}

export default Button
