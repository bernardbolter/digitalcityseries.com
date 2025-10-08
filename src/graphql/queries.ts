import { gql } from '@apollo/client'

export const GET_ARTWORK = gql`
  query GetArtwork {
    allArtwork(where: {categoryName: "Digital City Series"}, first: 100) {
      nodes {
        title(format: RENDERED)
        artworkFields {
          area
          artworkImage {
            node {
              mediaDetails {
                width
                height
              }
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              slug
              altText
            }
          }
          artworklink {
            target
            title
            url
          }
          city
          coordinates
          country
          dcsFlags {
            node {
              mediaDetails {
                height
                width
              }
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              altText
            }
          }
          dcsPhoto {
            node {
              altText
              mediaDetails {
                width
                height
              }
              srcSet(size: LARGE)
              sourceUrl(size: LARGE)
            }
          }
          dcsPhotoTitle
          dcsRaw {
            node {
              altText
              mediaDetails {
                height
                width
              }
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
            }
          }
          dcsSatellite {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
            }
          }
          density
          elevation
          extraimages
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
        date
        dateGmt
        databaseId
      }
    }
  }
`