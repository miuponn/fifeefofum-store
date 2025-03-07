import { Metadata } from 'next';
import SearchPageClient from './search-client';

type Props = {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q || '';
  
  return {
    title: query ? `Search results for "${query}"` : 'Search Products',
    description: query 
      ? `Browse products matching "${query}" at Fifeefofum`
      : 'Search for cute and handmade items in our store',
    robots: {
      index: false
    }
  };
}

export default function SearchPage({ searchParams }: Props) {
  const initialQuery = searchParams.q || '';
  return <SearchPageClient initialQuery={initialQuery} />;
}