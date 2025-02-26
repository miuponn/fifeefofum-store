import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Fifeefofum',
  description: 'Your cute and cozy store',
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