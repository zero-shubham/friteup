import React from "react"
import { Router } from "@reach/router"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostDisplay from "../components/PostDisplay"
import "../styles/main.scss"

const client = new ApolloClient({
  uri: "http://127.0.0.1:8081/graphql",
})

const RenderedApp = ({ userId }) => {
  return (
    <Layout>
      <SEO title="Welcome back to FriteUp" />
      <PostDisplay userId={userId} />
    </Layout>
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <PrivateRoute path="/app/:userId" component={RenderedApp} />
      </Router>
    </ApolloProvider>
  )
}
export default App
