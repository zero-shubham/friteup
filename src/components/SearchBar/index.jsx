import React, { useState, useContext, useEffect, createContext } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { SEARCH } from "../../services/queries"
import { Context } from "../../pages/app"
import SearchView from "../SearchView"
import styles from "./SearchBar.module.scss"
import searchSvg from "../../images/search.svg"

export const SearchContext = createContext()
const SearchBar = ({darkMode}) => {
  const context = useContext(Context)
  const setView = context && context.setView
  const setRootLoading = context && context.setRootLoading
  const setRootSnakbar = context && context.setRootSnakbar
  const [value, setValue] = useState("")
  const [lastKeyword, setLastKeyword] = useState("")
  const [search, searchQueryObj] = useLazyQuery(SEARCH, {
    fetchPolicy: "no-cache",
  })
  const { refetch } = searchQueryObj

  const initSearch = async () => {
    if (value) {
      await search({
        variables: {
          keyword: value,
        },
      })
    } else if (lastKeyword) {
      search({
        variables: {
          keyword: lastKeyword,
        },
      })
    }
  }

  useEffect(() => {
    setRootLoading(searchQueryObj.loading)
  }, [searchQueryObj.loading])

  useEffect(() => {
    if (searchQueryObj && searchQueryObj.data && searchQueryObj.data.search) {
      setLastKeyword(value)
      setView(
        <SearchContext.Provider value={{ refetch, keyword: lastKeyword }}>
          <SearchView
            users={searchQueryObj.data.search.users}
            posts={searchQueryObj.data.search.posts}
            refetch={searchQueryObj.refetch}
          />
        </SearchContext.Provider>
      )
      setValue("")
    }
  }, [searchQueryObj.data])

  useEffect(() => {
    if (searchQueryObj && searchQueryObj.error) {
      setRootSnakbar({
        message: searchQueryObj.error.message,
        type: "error",
        show: true,
      })
    }
  }, [searchQueryObj.error])
  return (
    <div className={styles.body}>
      <input
        className={ darkMode ? `${styles.searchBar} ${styles.dark}` :styles.searchBar}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <img
        src={searchSvg}
        alt="search"
        className={styles.searchSvg}
        onClick={initSearch}
      />
    </div>
  )
}
export default SearchBar
