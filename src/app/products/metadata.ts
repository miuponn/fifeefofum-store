import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Browse our collection of cute and cozy items'
  };
  
export default function productsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}