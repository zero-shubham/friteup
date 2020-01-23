import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: 'http://127.0.0.1:8081/graphql',
  fetch,
});