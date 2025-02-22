import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiInstagram, FiPlus, FiMinus } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import CurrencySelector from '../Header/CurrencySelector';

const HamburgerMenu: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);

    const toggleMenu = (): void => setIsOpen(!isOpen);
    const toggleShop = (): void => setIsShopOpen(!isShopOpen);

    return (
        <div className="relative md:hidden">
            <button
                onClick={toggleMenu}
                className="text-dark_pink_secondary p-2"
                aria-label="Menu"
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
                                to="/" 
                                className="block py-2 hover:text-peach transition duration-300"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        
                        {/* Shop Dropdown */}
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
                            
                            {/* Shop Submenu */}
                            {isShopOpen && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    {["Shop All", "Bracelets", "Keychains", "Rings", "Necklaces", "Stickers"].map((category) => (
                                        <li key={category} className="bg-[#FFF7F7] rounded-md">
                                            <Link
                                                to={category === "Shop All" ? "/products" : "#"}
                                                className="block px-4 py-2 text-dark_pink_secondary hover:text-peach transition duration-300"
                                                onClick={toggleMenu}
                                            >
                                                {category}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {["about", "faqs", "contact"].map((route) => (
                            <li key={route}>
                                <Link 
                                    to={`/${route}`}
                                    className="block py-2 hover:text-peach transition duration-300"
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

const socialLinks = [
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
        icon: <img 
            src={'../../assets/images/etsy.svg'} 
            alt="Etsy" 
            className="h-9 w-9 pb-3" 
            style={{ filter: 'invert(37%) sepia(74%) saturate(1096%) hue-rotate(308deg) brightness(91%) contrast(89%)' }}
        />
    }
];

export default HamburgerMenu;