import { Metadata } from 'next';
import ProductsPageClient from './products-client';

type Props = {
  searchParams: { category?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = searchParams.category;
  
  if (category) {
    return {
      title: `${category} | Fifeefofum`,
      description: `Browse our collection of ${category.toLowerCase()} at Fifeefofum`,
      openGraph: {
        title: `${category} | Fifeefofum`,
        description: `Browse our collection of ${category.toLowerCase()} at Fifeefofum`,
      }
    };
  }
  
  return {
    title: 'All Products | Fifeefofum',
    description: 'Browse our complete collection of cute and handmade items'
  };
}

export default function ProductsPage({ searchParams }: Props) {
  return <ProductsPageClient initialCategory={searchParams.category} />;
}