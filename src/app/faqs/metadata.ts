import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about products and services'
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}