import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostDisplay from "../components/PostDisplay"
import "../styles/main.scss"

export const Context = React.createContext()

const RenderedApp = ({ userId }) => {
  
  return (
    <Context.Provider value={{ userId }}>
      <Layout>
        <SEO title="Welcome back to FriteUp" />
        <PostDisplay />
      </Layout>
    </Context.Provider>
  )
}

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/:userId" component={RenderedApp} />
    </Router>
  )
}
export default App
