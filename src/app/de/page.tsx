import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digitale Städteserie',
  description: 'Erkundung städtischer Umgebungen durch digitale Kunst',
};

export default function DePage() {
  return <AppRouter />;
};
