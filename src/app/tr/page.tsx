import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Dijital Şehir Serisi',
  description: 'Dijital sanat aracılığıyla kentsel ortamları keşfetmek',
};

export default function TrPage() {
  return <AppRouter />;
};
