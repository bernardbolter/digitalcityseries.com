import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digitala Städer-serien',
  description: 'Utforska urbana miljöer genom digital konst',
};

export default function SvPage() {
  return <AppRouter />;
};
