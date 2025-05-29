import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Série de la Ville Numérique',
  description: 'Exploration des environnements urbains à travers l\'art numérique',
  // Add other French metadata here
};

export default function FrenchPage() {
  return <AppRouter />;
}
