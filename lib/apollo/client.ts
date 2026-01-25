"use client";
// ^ this file needs the "use client" pragma

import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";

// have a function to create a client for you
export default function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://staging-api.baiitna.com/graphql",

    fetchOptions: {},
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
