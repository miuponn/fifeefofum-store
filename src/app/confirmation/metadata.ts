import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Thank you for your order at Fifeefofum!'
};

export default function confirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}