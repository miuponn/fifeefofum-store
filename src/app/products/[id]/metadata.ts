import { Metadata } from 'next';
import productsData from '@/data/products';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productsData.find((p) => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  const ogImages = product.images
    ? [{ url: product.images[0], alt: product.name }]
    : undefined;

  return {
    title: product.name,
    description: product.description
      ? product.description.substring(0, 160) + '...'
      : `Shop ${product.name} at Fifeefofum`,
    openGraph: {
      title: product.name,
      description: product.description
        ? product.description.substring(0, 160) + '...'
        : `Shop ${product.name} at Fifeefofum`,
      images: ogImages,
      type: "website",
    },
    other: {
      'og:product:price:amount': product.price.replace(/[^0-9.]/g, ''),
      'og:product:price:currency': 'CAD',
      'og:availability': product.styles && product.styles.length > 0
        ? 'instock' 
        : 'instock',
      'og:type': 'product'
    }
  };
}

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