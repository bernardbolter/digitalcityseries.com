import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: '數碼城市系列',
  description: '通過數碼藝術探索城市環境',
};

export default function YuePage() {
  return <AppRouter />;
};
