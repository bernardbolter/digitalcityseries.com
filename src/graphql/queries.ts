import { gql } from '@apollo/client';

export const GET_ARTWORK = gql`
query GetDCSartwork {
  allArtwork(
    where: {categoryName: "Digital City Series"}
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
          srcSet(size: MEDIUM)
        }
        dcsPhoto {
          sourceUrl(size: LARGE)
          srcSet(size: LARGE)
        }
        dcsPhotoTitle
        dcsRaw {
          sourceUrl(size: LARGE)
          srcSet(size: LARGE)
        }
        dcsSatellite {
          sourceUrl(size: LARGE)
          srcSet(size: LARGE)
        }
        density
        elevation
        fieldGroupName
        forsale
        height
        lat
        lng
        medium
        metadescription
        metakeywords
        orientation
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
      date
    }
  }
}
`;
