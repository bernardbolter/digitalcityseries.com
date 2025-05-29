import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digital City Series',
  description: 'Exploring urban environments through digital art',
  // Add other English metadata here
};

export default function Home() {
  return <AppRouter />;
}
