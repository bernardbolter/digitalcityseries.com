import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Série Cidade Digital',
  description: 'Explorando ambientes urbanos através da arte digital',
};

export default function PtPage() {
  return <AppRouter />;
};
