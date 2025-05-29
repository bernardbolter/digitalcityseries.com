import { Metadata } from 'next';
import AppRouter from '@/components/AppRouter';

export const metadata: Metadata = {
  title: 'ซีรีส์เมืองดิจิทัล',
  description: 'สำรวจสภาพแวดล้อมในเมืองผ่านศิลปะดิจิทัล',
};

export default function ThPage() {
  return <AppRouter />;
};
