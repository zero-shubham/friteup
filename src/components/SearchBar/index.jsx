import React, { useState, useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Context } from "../../pages/app"
import styles from "./SearchBar.module.scss"
import searchSvg from "../../images/search.svg"

const SearchBar = () => {
  const context = useContext(Context)
  const setView = context.setView
  const [value, setValue] = useState("")
  return (
    <div className={styles.body}>
      <input
        className={styles.searchBar}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <img src={searchSvg} alt="search" className={styles.searchSvg} />
    </div>
  )
}
export default SearchBar
