import { gql } from '@apollo/client';

export const GET_ARTWORK = gql`
query GetDCSartwork {
  allArtwork(
    where: {categoryName: "Digital City Series", title: "BERLIN germany"}
    first: 100
  ) {
    nodes {
      id
      title(format: RENDERED)
      artworkFields {
        area
        artworkImage {
          sourceUrl(size: _1536X1536)
          srcSet(size: LARGE)
        }
        artworklink {
          url
          title
          target
        }
        city
        coordinates
        country
        dcsFlags {
          sourceUrl(size: MEDIUM)
        }
        dcsPhoto {
          sourceUrl(size: LARGE)
        }
        dcsRaw {
          sourceUrl(size: LARGE)
        }
        dcsSatellite {
          sourceUrl(size: LARGE)
        }
        density
        elevation
        extraimages
        fieldGroupName
        forsale
        height
        lat
        lng
        medium
        metadescription
        metakeywords
        orientation
        performance
        population
        proportion
        series
        size
        slug
        style
        width
        year
      }
      slug
      content(format: RENDERED)
      databaseId
    }
  }
}
`;
