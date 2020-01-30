import React, { useState } from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Snackbar from "../components/Snackbar"
import ProfileView from "../components/ProfileView"
import PostDisplay from "../components/PostDisplay"
import "../styles/main.scss"

export const Context = React.createContext()

const RenderApp = ({ userId }) => {
  const [rootSnakbar, setRootSnakbar] = useState({
    message: "",
    type: "",
    show: false,
  })
  const resetRootSnackbar = () => {
    setRootSnakbar({
      message: "",
      type: "",
      show: false,
    })
  }
  const [view, setView] = useState();
  return (
    <Context.Provider value={{ userId, setRootSnakbar, setView }}>
      <Layout>
        <SEO title="Welcome back to FriteUp" />
        {/* <div>
          <PostDisplay />
          <PostDisplay />
          <PostDisplay />
          <PostDisplay />
        </div> */}
        {view}
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
