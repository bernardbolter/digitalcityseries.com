import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: "Digital City Series | Skateboarding, AI og Oliemalerier",
  description: "Et unikt urbant kunstprojekt af Bernard Bolter. Byer indfanges på et skateboard, transformeres gennem AI og genfortolkes som fælles oliemalerier. Udforsk rejsen."
};

export default function DaPage() {
  return <AppRouter />;
};
