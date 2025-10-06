import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

// WordPress GraphQL API endpoint
const WORDPRESS_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL;

// Create HTTP link
const httpLink = createHttpLink({
  uri: WORDPRESS_GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

// Middleware to add headers
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return forward(operation);
});

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    if (response.errors) {
      console.error('GraphQL Error:', response.errors);
    }
    return response;
  });
});

// Create the Apollo Client with the HTTP link and cache
export const client = new ApolloClient({
  link: middlewareLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          artworks: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
