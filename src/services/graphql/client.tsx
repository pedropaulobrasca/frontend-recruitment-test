import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});
