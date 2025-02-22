import { FC, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

interface SocialLink {
    name: string;
    url: string;
    icon: ReactNode;
}

const socialLinks: SocialLink[] = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/fifeefofum',
        icon: <FiInstagram />
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@fifeefofum',
        icon: <SiTiktok />
    },
    {
        name: 'Etsy',
        url: 'https://www.etsy.com/shop/fifeefofum',
        icon: <img src={'../assets/images/etsy.svg'} alt="Etsy" className="h-6 sm:h-7" />
    }
];

const Footer: FC = () => {
  return (
    <footer className="bg-accent_pink text-white py-6 md:py-8 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center md:items-start max-w-6xl mx-auto">
        {/* Left - Menu */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
          {/* Styled Logo */}
          <Link to="/" className="text-3xl sm:text-4xl lg:text-5xl font-snowdoodle hover:opacity-80 transition-opacity text-center md:text-left">
            Fifeefofum
          </Link>
          {/* Footer Links */}
          <nav className="flex flex-col gap-2 mt-4 text-sm sm:text-base w-full text-center md:text-left">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/faqs" className="hover:underline">FAQs</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>

        {/* Right - Policies */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-end justify-center h-full">
          <nav className="flex flex-col gap-2 mt-4 md:mt-10 w-full text-center md:text-right">
            <Link to="/shipping-policy" className="text-xs sm:text-base hover:underline">
              Shipping Policy
            </Link>
            <Link to="/refund-policy" className="text-xs sm:text-base hover:underline">
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col items-center gap-3 mt-8">
        <div className="flex gap-6 text-2xl sm:text-3xl">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              className="transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-xs sm:text-sm font-poppins">© {new Date().getFullYear()} Fifeefofum</p>
      </div>
    </footer>
  );
};

export default Footer;