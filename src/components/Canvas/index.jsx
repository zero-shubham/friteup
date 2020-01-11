import React from "react"
import SearchBar from "../SearchBar"
import styles from "./Canvas.module.scss"

const Canvas = ({ children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.topbar}>
        {/* <input className={styles.searchBar} /> */}
        <SearchBar />
      </div>
      {children}
    </div>
  )
}
export default Canvas
