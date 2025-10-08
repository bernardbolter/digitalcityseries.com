// lib/getArtworkData.ts
import { client } from './apollo-client';
import { GET_ARTWORK } from '../graphql/queries';
import { ArtworkResponse, ArtworkNode } from '@/types/artworkTypes';

/**
 * Server-side function to fetch artwork data
 * This runs on the server and can be called from Server Components
 */
export async function getArtworkData(): Promise<ArtworkNode[]> {
  try {
    const { data } = await client.query<ArtworkResponse>({
      query: GET_ARTWORK,
      fetchPolicy: 'no-cache', // Always fetch fresh data on the server
    });

    return data?.allArtwork?.nodes || [];
  } catch (error) {
    console.error('Error fetching artwork data:', error);
    return [];
  }
}

export const revalidate = 3600; // Revalidate every hour

/**
 * Optional: Add revalidation for ISR (Incremental Static Regeneration)
 * You can call this from your page with:
 * export const revalidate = 3600; // Revalidate every hour
 */