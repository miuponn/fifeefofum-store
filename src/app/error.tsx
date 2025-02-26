'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="font-chewie text-3xl md:text-4xl text-dark_pink">
            Oops! Something went wrong
          </h1>
          <p className="font-poppins text-dark_pink_secondary">
            Don&apos;t worry, it&apos;s not you - it&apos;s us!
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try again
            </button>
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}