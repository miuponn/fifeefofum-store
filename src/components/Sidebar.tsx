'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronUp } from 'react-icons/fi';
import lovebirdsImage from '@/assets/images/lovebirds.png';

interface SidebarProps {
    backgroundColor?: string;
    onCategoryFilter: (categories: string[]) => void;
    onAvailabilityFilter: (availability: string[]) => void;
    categoryFilters?: string[]; // Add this prop
    availabilityFilters?: string[]; // Add this prop
}

interface CustomCheckboxProps {
    label: string;
    onChange: (label: string, checked: boolean) => void;
    initialChecked?: boolean;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, onChange, initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

    const handleChange = (): void => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange(label, newChecked);
    };

    return (
        <li className="flex items-center gap-2 cursor-pointer" onClick={handleChange}>
            <div className={`w-4 h-4 border-2 rounded-sm cursor-pointer 
                         flex items-center justify-center transition-colors duration-300
                         ${isChecked 
                           ? 'bg-button_pink border-button_pink' 
                           : 'border-dark_pink hover:border-button_pink'}`
                         }>
                {isChecked && (
                    <svg 
                        className="w-3 h-3 text-white" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>
            <span className="font-poppins text-sm text-dark_pink hover:text-button_pink">
                {label}
            </span>
        </li>
    );
};

const Sidebar: FC<SidebarProps> = ({ 
    backgroundColor = "white", 
    onCategoryFilter, 
    onAvailabilityFilter,
    categoryFilters = [], 
    availabilityFilters = [] 
}) => {
    const [categoryOpen, setCategoryOpen] = useState<boolean>(true);
    const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(true);
    
    const categories = ["Phone Charms", "Stickers", "Keychains", "Jewelry", "Accessories"];
    const availabilityOptions = ["In Stock", "Out of Stock"];

    const handleCategoryChange = (category: string, isChecked: boolean) => {
        const newSelectedCategories = isChecked 
            ? [...categoryFilters, category] 
            : categoryFilters.filter(c => c !== category);
        
        onCategoryFilter(newSelectedCategories);
    };

    const handleAvailabilityChange = (status: string, isChecked: boolean) => {
        const newSelectedAvailability = isChecked 
            ? [...availabilityFilters, status] 
            : availabilityFilters.filter(s => s !== status);
        
        onAvailabilityFilter(newSelectedAvailability);
    };

    return (
        <aside className={`bg-${backgroundColor} p-4 rounded-lg`}>
            <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 flex-grow">
                <h2 className="text-2xl md:text-3xl font-chewie font-extrabold text-dark_pink mb-6">
                    Products
                </h2>

                <nav className="text-sm font-poppins font-regular text-dark_pink mb-6">
                    <Link href="/" className="hover:underline text-[#AF001A]">Home</Link>
                    <span className="text-red-500 mx-3">&gt;</span>
                    <span className="text-dark_pink">Products</span>
                </nav>

                <div className="mt-6">
                    <h3 className="text-md font-poppins font-medium uppercase text-[#E57485]">
                        Browse By
                    </h3>

                    {/* Category Filter */}
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            className="w-full flex justify-between items-center uppercase text-[#E57485] font-poppins text-sm font-medium cursor-pointer"
                        >
                            Category
                            <FiChevronUp className={`transform transition-transform duration-300 ${!categoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${categoryOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul className="mt-2 mb-6 space-y-2">
                                {categories.map((category) => (
                                    <CustomCheckbox 
                                        key={category} 
                                        label={category} 
                                        onChange={handleCategoryChange}
                                        initialChecked={categoryFilters.includes(category)} // Add this
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Availability Filter */}
                    <div className="space-y-3">
                        <button
                            onClick={() => setAvailabilityOpen(!availabilityOpen)}
                            className="w-full flex justify-between items-center uppercase text-[#E57485] font-poppins text-sm font-medium cursor-pointer"
                        >
                            Availability
                            <FiChevronUp className={`transform transition-transform duration-300 ${!availabilityOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${availabilityOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul className="mt-2 mb-6 space-y-2">
                                {availabilityOptions.map((status) => (
                                    <CustomCheckbox 
                                        key={status} 
                                        label={status} 
                                        onChange={handleAvailabilityChange}
                                        initialChecked={availabilityFilters.includes(status)} // Add this
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-6 lg:px-8 py-6 flex justify-center">
                <Image 
                    src={lovebirdsImage}
                    alt="Lovebirds"
                    width={200}
                    height={200}
                    priority={false}
                    className="h-[160px] md:h-[180px] lg:h-[200px] w-auto object-contain"
                />
            </div>
        </aside>
    );
};

export default Sidebar;