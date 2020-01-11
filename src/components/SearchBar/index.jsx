import React from "react"
import styles from "./SearchBar.module.scss"

import searchSvg from "../../images/search.svg"

const SearchBar = () => {
  return (
    <div>
      <input className={styles.searchBar} />
      <img src={searchSvg} alt="search" className={styles.searchSvg} />
    </div>
  )
}
export default SearchBar
