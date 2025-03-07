import { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { Urbanist } from 'next/font/google';
import { Suspense } from 'react';
import ClientLayout from './layout-client';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'Fifeefofum Store',
  description: 'Handmade accessories and gifts',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#ffffff'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}