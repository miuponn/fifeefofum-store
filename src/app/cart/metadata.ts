import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Here is your cart view!'
};

export default function cartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}