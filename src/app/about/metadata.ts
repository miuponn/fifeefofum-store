import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Meet Fifi - Digital/traditional anime artist based in Toronto, Canada'
};

export default function confirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
