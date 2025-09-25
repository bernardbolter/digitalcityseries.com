export interface ImageSrc {
  __typename: string;
  sourceUrl: string | null;
  srcSet: string | null;
  uri: string | null;
}

export interface ArtworkLink {
  url: string;
  title: string;
  target: string;
}

export interface ArtworkFields {
  __typename: string;
  area?: string | null;
  artworkImage?: ImageSrc | null;
  artworklink?: ArtworkLink | null;
  city?: string | null;
  coordinates?: string | null;
  country?: string | null;
  databaseId?: number | null;
  dcsFlags?: ImageSrc | null; // Note: Original plan used dcsSatellite for 2nd complementary. This is dcsFlags.
  dcsPhoto?: ImageSrc | null;
  dcsPhotoTitle?: string | null;
  dcsRaw?: ImageSrc | null;
  dcsSatellite?: ImageSrc | null;
  density?: string | null;
  elevation?: string | null;
  fieldGroupName?: string | null;
  forsale?: boolean | null;
  height?: string | null; // e.g., "48\""
  lat?: number | null;
  lng?: number | null;
  medium?: string | null;
  metadescription?: string | null;
  metakeywords?: string | null;
  orientation?: string | null;
  population?: string | null;
  proportion?: number | null;
  series?: string | null;
  size?: string | null; // e.g., "48 x 48 in"
  slug?: string | null;
  style?: string | null;
  width?: string | null; // e.g., "48\""
  year?: string | null;
}

export interface ArtworkNode {
  id: string;
  title: string | null;
  artworkFields?: ArtworkFields | null;
  slug?: string | null;
  content?: string | null;
  databaseId?: number | null;
  date?: Date | null;
}

export interface ArtworkProps {
  artwork: ArtworkNode;
}