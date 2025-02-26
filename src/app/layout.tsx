import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fifeefofum.com'),
  title: {
    default: 'Fifeefofum',
    template: '%s | Fifeefofum'
  },
  description: 'Your cute and cozy store',
  openGraph: {
    title: 'Fifeefofum',
    description: 'Your cute and cozy store',
    images: ['/images/og-image.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}