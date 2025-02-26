import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="animate-pulse-gentle">
            <h1 className="font-chewie text-3xl md:text-4xl text-dark_pink">
              Loading...
            </h1>
            <p className="font-poppins text-dark_pink_secondary mt-2">
              Just a moment while we get things ready!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}