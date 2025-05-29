import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digitale By-serie',
  description: 'Udforskning af bymiljøer gennem digital kunst',
};

export default function DaPage() {
  return <AppRouter />;
};
