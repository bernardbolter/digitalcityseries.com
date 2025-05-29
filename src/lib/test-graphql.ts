import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://www.digitalcityseries.com/bolter/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
  },
});

const TEST_QUERY = gql`
  query TestQuery {
    __typename
  }
`;

async function testConnection() {
  try {
    const result = await client.query({
      query: TEST_QUERY,
    });
    console.log('GraphQL connection successful:', result);
    return true;
  } catch (error) {
    console.error('GraphQL connection failed:', error);
    return false;
  }
}

export { testConnection };
