import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import mo from '@/assets/images/mo.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Fifi - Digital/traditional anime artist based in Toronto, Canada'
};

const socialLinks = [
  {
    name: 'Instagram (Art)',
    url: 'https://www.instagram.com/fifeefofum',
    handle: '@fifeefofum'
  },
  {
    name: 'Instagram (Store)',
    url: 'https://www.tiktok.com/@fifeefofum',
    handle: '@fifeefofum'
  },
  {
    name: 'Etsy',
    url: 'https://www.etsy.com/shop/fifeefofum',
    handle: '@fifeefofum'
  }
];

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Image Column */}
            <div className="flex justify-center md:justify-start">
              <motion.div 
                className="relative w-3/4 md:w-full max-w-md aspect-square"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -5, 5, -5, 0],
                  transition: {
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                }}
                whileTap={{ 
                  scale: [1, 0.9, 1.1, 0.95, 1],
                  transition: { 
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
              >
                <Image 
                  src={mo}
                  alt="Mo"
                  fill
                  priority
                  sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                  quality={90}
                />
              </motion.div>
            </div>

            {/* Text Content Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-viucobacoba text-blue mb-6 md:mb-8">
                Hello, I&apos;m Fifi ✿
              </h1>

              <div className="space-y-4 text-dark_pink font-poppins font-normal text-sm md:text-base lg:text-lg mt-2 pt-4 md:pt-6">
                <p>
                  Hi! I&apos;m Fifi and I&apos;m a digital/traditional anime artist (or hobbyist) based in Toronto, Canada. 
                  Everyday I&apos;m focused on bringing my bright and colourful creations to you! 
                  I like making bright and colourful accessories mainly, but play around with making cute stickers and prints as well!
                </p>

                {/* Social Links Section */}
                <div className="pt-4">
                  <h2 className="font-poppins font-medium text-dark_pink mb-2">
                    Find me elsewhere:
                  </h2>
                  <div className="flex flex-col space-y-1">
                    {socialLinks.map(link => (
                      <a 
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-poppins font-medium text-accent_green transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="text-dark_pink">{link.name}: </span>
                        <span className="hover:underline">{link.handle}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;