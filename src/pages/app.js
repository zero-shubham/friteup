import React, { useState } from "react"
import { Router } from "@reach/router"
import { useQuery } from "@apollo/react-hooks"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Snackbar from "../components/Snackbar"
import FeedView from "../components/FeedView"
import Loading from "../components/Loading"
import { USER } from "../services/queries"
import "../styles/main.scss"

export const Context = React.createContext()

const RenderApp = ({ userId }) => {
  const [rootSnakbar, setRootSnakbar] = useState({
    message: "",
    type: "",
    show: false,
  })

  const { data, loading, error } = useQuery(USER, {
    variables: { user_id: userId }
  })
  const [view, setView] = useState(<FeedView />)
  const [rootLoading, setRootLoading] = useState(false)

  const resetRootSnackbar = () => {
    setRootSnakbar({
      message: "",
      type: "",
      show: false,
    })
  }

  return (
    <Context.Provider
      value={{
        userId,
        setRootSnakbar,
        setView,
        setRootLoading,
        darkMode: data && data.user.night_mode,
      }}
    >
      <Layout>
        <SEO title="Welcome back to FriteUp" />

        <Loading
          loading={rootLoading}
          parentClassName={rootLoading ? "rootLoader" : "adjustView"}
        >
          {view}
        </Loading>
        {rootSnakbar.show && (
          <Snackbar
            show={rootSnakbar.show}
            message={rootSnakbar.message}
            type={rootSnakbar.type}
            handleClose={resetRootSnackbar}
          />
        )}
      </Layout>
    </Context.Provider>
  )
}

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/:userId" component={RenderApp} />
    </Router>
  )
}
export default App
