import { gql } from '@apollo/client';

export const GET_ARTWORK = gql`
  query GetDCSartwork {
    allArtwork(where: {categoryName: "Digital City Series"}, first: 100) {
      nodes {
      id
        title(format: RENDERED)
      }
    }
  }
`;
