'use client';

import { FC, useState, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { faqsData } from '@/data/faqsData';
import twinklesLeft from '@/assets/images/twinkles-l.svg';
import twinklesRight from '@/assets/images/twinkles-r.svg';
import moBlueberry from '@/assets/images/mo-blueberry.png';

interface FAQItemProps {
  question: string;
  answer: string | string[];
}

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderAnswer = (text: string | string[]): ReactElement => {
    if (Array.isArray(text)) {
      return (
        <ul className="list-disc pl-4 space-y-2">
          {text.map((item, index) => (
            <li key={index} className="font-poppins text-dark_pink text-sm">{item}</li>
          ))}
        </ul>
      );
    }
    
    if (text.includes('*contact page*')) {
      const parts = text.split('*contact page*');
      return (
        <p className="font-poppins text-dark_pink text-sm">
          {parts[0]}
          <Link 
            href="/contact" 
            className="font-medium hover:underline"
          >
            Contact Page!
          </Link>
          {parts[1]}
        </p>
      );
    }
    
    return <p className="font-poppins text-dark_pink text-sm">{text}</p>;
  };

  return (
    <div className="border-b border-[#F9E1E1] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-4 text-left"
      >
        {isOpen ? (
          <FiChevronUp className="text-button_pink text-2xl md:text-3xl flex-shrink-0" />
        ) : (
          <FiChevronDown className="text-button_pink text-2xl md:text-3xl flex-shrink-0" />
        )}
        <span className="font-poppins font-semibold text-[#E57485] text-sm md:text-base">
          {question}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out pl-10"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? '1rem' : '0'
        }}
      >
        {renderAnswer(answer)}
      </div>
    </div>
  );
};

const FAQsPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg_pink">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 lg:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Header w/ twinkles */}
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <Image 
              src={twinklesLeft}
              alt="Decorative Left"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8"
              priority={false}
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-chewie font-bold text-dark_pink text-center">
              Frequently Asked Questions
            </h1>
            <Image 
              src={twinklesRight}
              alt="Decorative Right"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8"
              priority={false}
            />
          </div>

          {/* FAQs List Container */}
          <div className="w-full space-y-2">
            {faqsData.map((faq) => (
              <FAQItem 
                key={faq.id} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
        </div>

        {/* Mo Blueberry Image */}
        <div className="mt-8 md:mt-0 md:absolute md:right-4 lg:right-8 xl:right-12 md:bottom-8 lg:bottom-12">
          <div className="relative w-48 md:w-56 lg:w-64 aspect-square">
            <Image 
              src={moBlueberry}
              alt="Mo Blueberry"
              fill
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQsPage;