import { Metadata } from 'next';

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
  