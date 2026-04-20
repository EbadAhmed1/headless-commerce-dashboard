import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Get the GraphQL endpoint from environment or use default
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

// Create HTTP link with proper configuration
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include', // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
          variants: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
          inventory: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
          orders: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
