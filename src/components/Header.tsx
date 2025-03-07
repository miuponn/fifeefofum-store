'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from "./Header/AnnouncementBar";
import CurrencySelector from "./Header/CurrencySelector"; 
import SearchBar from "./Header/SearchBar";
import NavLinks from "./Header/NavLinks";
import logoSvg from '@/assets/images/Fifeefofum.svg';

const Header: FC = () => {
    return (
        <>
            <header className="hidden md:block w-full relative z-50">
                <AnnouncementBar message="Fun message or important notification goes here!" />

                {/* Navbar */}
                <nav className="bg-white py-2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between w-full">
                    {/* Left: Currency Selector & Search Bar */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-[25%]">
                        <CurrencySelector />
                        <SearchBar />
                    </div>

                    <div className="flex-shrink-0 w-[50%] flex justify-center px-2 sm:px-4 md:px-6 lg:px-8">
                        <Link href="/">
                            <Image 
                                src={logoSvg}
                                alt="Fifeefofum Logo"
                                width={180}
                                height={60}
                                priority
                                className="h-8 md:h-10 lg:h-12 xl:h-14 my-1 md:my-2 lg:my-3 xl:my-4 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="w-[25%] flex justify-end items-center gap-4">
                        <NavLinks />
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;