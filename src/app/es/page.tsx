import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Serie de la Ciudad Digital',
  description: 'Explorando entornos urbanos a través del arte digital',
  // Add other Spanish metadata here
};

export default function SpanishPage() {
  return <AppRouter />;
}
