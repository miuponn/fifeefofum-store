import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 my-8 md:my-20">
        <div className="text-center space-y-8 max-w-md">
          <div className="relative w-32 h-32 mx-auto">
            <Image 
              src="/images/logo-bird.png"
              fill
              priority
              sizes="(max-width: 500px) 200vw, 128px"
              style={{ objectFit: 'contain' }}
              alt="Logo"
              className="animate-pulse-gentle"
            />
          </div>
          <div className="space-y-4">
            <h1 className="font-magicalsnow text-4xl md:text-4xl text-peach inline-flex items-center justify-center gap-1">
              Loading
              <span className="animate-[pulse_1s_infinite]">.</span>
              <span className="animate-[pulse_1s_infinite_0.3s]">.</span>
              <span className="animate-[pulse_1s_infinite_0.6s]">.</span>
            </h1>
            <p className="font-viucobacoba text-3xl text-peach">
              Just a moment while we get things ready!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}