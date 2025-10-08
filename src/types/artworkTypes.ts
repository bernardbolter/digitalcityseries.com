export interface MediaDetails {
  width: number;
  height: number;
}

export interface MediaNode {
  mediaDetails: MediaDetails;
  sourceUrl: string;
  srcSet: string | null;
  slug?: string;
  altText?: string | null;
}

export interface ImageField {
  node: MediaNode;
}

export interface ArtworkLink {
  url: string;
  title: string;
  target: string;
}

export interface ArtworkFields {
  area?: string | null;
  artworkImage?: ImageField | null;
  artworklink?: ArtworkLink | null;
  city?: string | null;
  coordinates?: string | null;
  country?: string | null;
  dcsFlags?: ImageField | null;
  dcsPhoto?: ImageField | null;
  dcsPhotoTitle?: string | null;
  dcsRaw?: ImageField | null;
  dcsSatellite?: ImageField | null;
  density?: string | null;
  elevation?: string | null;
  extraimages?: string | null;
  forsale?: boolean | null;
  height?: string | null;
  lat?: number | null;
  lng?: number | null;
  medium?: string | null;
  metadescription?: string | null;
  metakeywords?: string | null;
  orientation?: string | null;
  performance?: string | null;
  population?: string | null;
  proportion?: number | null;
  series?: string | null;
  size?: string | null;
  slug?: string | null;
  style?: string | null;
  width?: string | null;
  year?: string | null;
}

export interface ArtworkNode {
  title: string;
  artworkFields: ArtworkFields;
  date: string;
  dateGmt: string;
  databaseId: number;
}

export interface ArtworkResponse {
  allArtwork: {
    nodes: ArtworkNode[];
  };
}