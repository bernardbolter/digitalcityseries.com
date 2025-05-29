import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: '数字城市系列',
  description: '通过数字艺术探索城市环境',
};

export default function ZhPage() {
  return <AppRouter />
};
