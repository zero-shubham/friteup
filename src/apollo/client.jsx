import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  uri: "https://friteup.herokuapp.com/graphql",
  credentials: "include",
  fetch,
})
