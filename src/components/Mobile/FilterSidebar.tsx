'use client';

import { FC, useState, useEffect } from 'react';
import { FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSidebarProps {
    isOpen: boolean;
    closeFilter: () => void;
    onCategoryFilter: (categories: string[]) => void;
    onAvailabilityFilter: (availability: string[]) => void;
    categoryFilters?: string[]; 
    availabilityFilters?: string[]; 
}

interface CustomCheckboxProps {
    label: string;
    onChange: (label: string, checked: boolean) => void;
    initialChecked?: boolean;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, onChange, initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

    useEffect(() => {
        setIsChecked(initialChecked);
    }, [initialChecked]);

    const handleCheck = (): void => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange(label, newValue);
    };

    return (
        <li className="flex items-center gap-2 cursor-pointer" onClick={handleCheck}>
            <div className={`w-4 h-4 border rounded-sm cursor-pointer 
                         flex items-center justify-center transition-colors duration-300
                         ${isChecked 
                           ? 'bg-button_pink border-button_pink' 
                           : 'bg-white border-dark_pink hover:border-button_pink'}`
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

const FilterSidebar: FC<FilterSidebarProps> = ({ 
    isOpen, 
    closeFilter,
    onCategoryFilter,
    onAvailabilityFilter,
    categoryFilters = [], 
    availabilityFilters = [] 
}) => {
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
    const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFilters);
    const [selectedAvailability, setSelectedAvailability] = useState<string[]>(availabilityFilters);

    useEffect(() => {
        setSelectedCategories(categoryFilters);
    }, [categoryFilters]);

    useEffect(() => {
        setSelectedAvailability(availabilityFilters);
    }, [availabilityFilters]);

    const categories = ["Phone Charms", "Stickers", "Keychains", "Jewelry", "Accessories"];
    const availabilityOptions = ["In Stock", "Out of Stock"];

    const handleCategoryChange = (category: string, isChecked: boolean) => {
        const newCategories = isChecked 
            ? [...selectedCategories, category] 
            : selectedCategories.filter(c => c !== category);
        
        setSelectedCategories(newCategories);
        onCategoryFilter(newCategories);
    };

    const handleAvailabilityChange = (status: string, isChecked: boolean) => {
        const newAvailability = isChecked 
            ? [...selectedAvailability, status] 
            : selectedAvailability.filter(s => s !== status);
        
        setSelectedAvailability(newAvailability);
        onAvailabilityFilter(newAvailability);
    };

    const handleClearAll = () => {
        setSelectedCategories([]);
        setSelectedAvailability([]);
        onCategoryFilter([]);
        onAvailabilityFilter([]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 mt-4 border-b border-pink">
                            <h2 className="text-[dark_pink] text-lg font-chewie font-bold">
                                Filters
                            </h2>
                            <button 
                                onClick={closeFilter}
                                className="text-dark_pink_secondary"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Filter Options */}
                        <div className="px-6 py-4">
                            {/* Category Dropdown */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    className="w-full flex justify-between items-center text-button_pink font-poppins text-sm font-medium py-2"
                                >
                                    Category
                                    {categoryOpen ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                                <AnimatePresence>
                                    {categoryOpen && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-2 space-y-2 overflow-hidden"
                                        >
                                            {categories.map((category) => (
                                                <CustomCheckbox 
                                                    key={category} 
                                                    label={category} 
                                                    onChange={handleCategoryChange}
                                                    initialChecked={selectedCategories.includes(category)}
                                                />
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Availability Dropdown */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setAvailabilityOpen(!availabilityOpen)}
                                    className="w-full flex justify-between items-center text-button_pink font-poppins text-sm font-medium py-2"
                                >
                                    Availability
                                    {availabilityOpen ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                                <AnimatePresence>
                                    {availabilityOpen && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-2 space-y-2 overflow-hidden"
                                        >
                                            {availabilityOptions.map((option) => (
                                                <CustomCheckbox 
                                                    key={option} 
                                                    label={option} 
                                                    onChange={handleAvailabilityChange}
                                                    initialChecked={selectedAvailability.includes(option)}
                                                />
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Bottom Buttons */}
                        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white">
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleClearAll}
                                    className="flex-1 py-2 mb-3 px-4 border border-dark_pink text-dark_pink font-chewie text-sm font-bold rounded-md hover:bg-dark_pink hover:text-white transition-all duration-300"
                                >
                                    clear all
                                </button>
                                <button 
                                    onClick={closeFilter}
                                    className="flex-1 py-2 mb-3 px-4 bg-dark_pink text-white font-chewie text-sm font-bold rounded-md hover:bg-white hover:text-dark_pink hover:border-dark_pink border border-transparent transition-all duration-300"
                                >
                                    apply
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeFilter}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default FilterSidebar;