import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'Digitālo Pilsētu Sērija',
  description: 'Pilsētvides izpēte ar digitālās mākslas palīdzību',
};

export default function LvPage() {
  return <AppRouter />;
};
