import { Metadata, Viewport } from 'next';

export const siteConfig = {
  name: 'Fifeefofum',
  description: 'Your cute and cozy store',
  url: 'https://fifeefofum.com',
  ogImage: '/images/og-image.png',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    type: 'website',
    siteName: siteConfig.name,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', rel: 'icon' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#ffffff'
};