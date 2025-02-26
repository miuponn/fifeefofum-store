import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product Details',
    description: 'View product details and options'
  };
  
export default function productLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}