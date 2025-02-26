'use client'

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import mo from '@/assets/images/mo.png';
import AnimatedContent from '@/components/About/AnimatedContent';
import { metadata } from './metadata';

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
          <AnimatedContent socialLinks={socialLinks} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;