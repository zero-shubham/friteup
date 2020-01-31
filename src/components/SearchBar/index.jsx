import React, { useState, useContext, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { SEARCH } from "../../services/queries"
import { Context } from "../../pages/app"
import SearchView from "../SearchView"
import styles from "./SearchBar.module.scss"
import searchSvg from "../../images/search.svg"

const SearchBar = () => {
  const context = useContext(Context)
  const setView = context.setView
  const setRootLoading = context.setRootLoading
  const setRootSnakbar = context.setRootSnakbar
  const [value, setValue] = useState("")
  const [search, searchQueryObj] = useLazyQuery(SEARCH, {
    variables: {
      keyword: value,
    },
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    setRootLoading(searchQueryObj.loading)
  }, [searchQueryObj.loading])

  useEffect(() => {
    if (searchQueryObj && searchQueryObj.data) {
      setView(
        <SearchView
          users={searchQueryObj.data.search.users}
          posts={searchQueryObj.data.search.posts}
        />
      )
    }
  }, [searchQueryObj.data])

  useEffect(() => {
    if(searchQueryObj && searchQueryObj.error){
      setRootSnakbar({
        message: searchQueryObj.error.message,
        type: "error",
        show: true
      })
    }
  }, [searchQueryObj.error])
  return (
    <div className={styles.body}>
      <input
        className={styles.searchBar}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <img
        src={searchSvg}
        alt="search"
        className={styles.searchSvg}
        onClick={search}
      />
    </div>
  )
}
export default SearchBar
