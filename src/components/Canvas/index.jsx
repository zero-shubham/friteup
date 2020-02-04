import React from "react"
import SearchBar from "../SearchBar"
import styles from "./Canvas.module.scss"

const Canvas = ({ children, darkMode }) => {
  return (
    <div className={darkMode ? `${styles.body} ${styles.dark}` : styles.body}>
      <div className={darkMode ? `${styles.topbar} ${styles.dark}` : styles.topbar}>
        {/* <input className={styles.searchBar} /> */}
        <SearchBar darkMode={darkMode} />
      </div>
      <div className={styles.topPadding}/>
      {children}
    </div>
  )
}
export default Canvas
