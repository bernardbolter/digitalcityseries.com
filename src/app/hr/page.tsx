import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digitalna Gradska Serija',
  description: 'Istraživanje urbanih okruženja kroz digitalnu umjetnost',
};

export default function HrPage() {
  return <AppRouter />;
};
