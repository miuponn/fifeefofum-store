'use client';

import { FC, useState, useMemo } from 'react'; // Add useMemo
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiInstagram, FiPlus, FiMinus } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import CurrencySelector from '@/components/Header/CurrencySelector';
import etsyIcon from '@/assets/images/etsy.svg';
import productsData from '@/data/products'; // Import products data

interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
}

interface CategoryItem {
    name: string;
    path: string;
}

const NAV_ROUTES = ["about", "faqs", "contact"];

const HamburgerMenu: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const toggleMenu = (): void => setIsOpen(!isOpen);
    const toggleShop = (): void => setIsShopOpen(!isShopOpen);

    // Dynamically generate categories from products - same as desktop version
    const categories = useMemo(() => {
        // Filter out undefined categories first, then create the Set
        const uniqueCategories = [...new Set(
            productsData
                .map(product => product.category)
                .filter((category): category is string => category !== undefined)
        )];
        
        // Create category items from unique categories
        const categoryItems: CategoryItem[] = uniqueCategories
            .sort() // Sort alphabetically
            .map(category => ({
                name: category,
                path: `/products?category=${encodeURIComponent(category)}`,
            }));
        
        // Add "Shop All" at the beginning
        return [
            { name: "Shop All", path: "/products" },
            ...categoryItems
        ];
    }, []);

    // Rest of the component remains the same
    const socialLinks: SocialLink[] = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/fifeefofum',
            icon: <FiInstagram className="h-5 w-5" />
        },
        {
            name: 'TikTok',
            url: 'https://www.tiktok.com/@fifeefofum',
            icon: <SiTiktok className="h-5 w-5" />
        },
        {
            name: 'Etsy',
            url: 'https://www.etsy.com/shop/fifeefofum',
            icon: <Image 
                src={etsyIcon} 
                alt="Etsy" 
                width={20}
                height={20}
                className="h-5 w-5 brightness-0 invert opacity-80 filter hue-rotate-[330deg] saturate-[75%]"
                priority={false}
            />
        }
    ];

    return (
        <div className="relative md:hidden">
            <button
                onClick={toggleMenu}
                className="text-dark_pink_secondary p-2"
            >
                {isOpen ? (
                    <FiX className="h-6 w-6" />
                ) : (
                    <FiMenu className="h-6 w-6" />
                )}
            </button>

            {/* Slide-out Menu */}
            <div 
                className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } z-50`}
            >
                {/* Navigation Links */}
                <nav className="mt-16 px-6">
                    <ul className="space-y-4 font-poppins text-dark_pink_secondary">
                        <li>
                            <Link 
                                href="/"
                                className={`block py-2 hover:text-peach transition duration-300 ${
                                    pathname === '/' ? 'text-peach' : ''
                                }`}
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        
                        {/* Shop Dropdown - updated to use dynamic categories */}
                        <li>
                            <button
                                onClick={toggleShop}
                                className="w-full flex items-center justify-between py-2 hover:text-peach transition duration-300"
                            >
                                Shop
                                {isShopOpen ? (
                                    <FiMinus className="text-dark_pink" />
                                ) : (
                                    <FiPlus className="text-dark_pink" />
                                )}
                            </button>
                            
                            {/* Shop Submenu with dynamic categories */}
                            {isShopOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    {categories.map((category) => (
                                        <li key={category.name}>
                                            <Link
                                                href={category.path}
                                                className={`block px-4 py-2 text-dark_pink_secondary hover:text-peach hover:bg-[#FFF7F7] hover:rounded-md transition duration-300 ${
                                                    pathname === category.path ? 'text-peach' : ''
                                                }`}
                                                onClick={toggleMenu}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {NAV_ROUTES.map((route) => (
                            <li key={route}>
                                <Link 
                                    href={`/${route}`}
                                    className={`block py-2 hover:text-peach transition duration-300 ${
                                        pathname === `/${route}` ? 'text-peach' : ''
                                    }`}
                                    onClick={toggleMenu}
                                >
                                    {route.charAt(0).toUpperCase() + route.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
                    {/* Currency and Login Row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="scale-90 origin-left">
                            <CurrencySelector expandUp={true} />
                        </div>
                        <div className="flex items-center gap-2 text-dark_pink_secondary">
                            <FiUser className="h-5 w-5" />
                            <span className="text-sm font-poppins">Log in</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 text-dark_pink">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition duration-300"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu}
                />
            )}
        </div>
    );
};

export default HamburgerMenu;