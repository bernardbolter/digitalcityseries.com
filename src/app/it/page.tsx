import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Serie di Città Digitali',
  description: 'Esplorazione di ambienti urbani attraverso l\'arte digitale',
};

export default function ItPage() {
  return <AppRouter />;
};
