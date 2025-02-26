'use client';

import { FC, useState } from 'react';
import { FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSidebarProps {
    isOpen: boolean;
    closeFilter: () => void;
}

interface CustomCheckboxProps {
    label: string;
    onChange?: (checked: boolean) => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheck = (): void => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    return (
        <li className="flex items-center gap-2 cursor-pointer" onClick={handleCheck}>
            <div className={`w-4 h-4 border-1 rounded-sm cursor-pointer 
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

const FilterSidebar: FC<FilterSidebarProps> = ({ isOpen, closeFilter }) => {
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
    const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(false);

    const categories = ["Phone Charms", "Stickers", "Keychains", "Jewelry", "Accessories"];
    const availabilityOptions = ["In Stock", "Out of Stock"];

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
                            <h2 className="text-[dark_pink] text-md font-chewie font-bold">
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
                                    className="w-full flex justify-between items-center text-[#E57485] font-poppins text-sm font-medium py-2 border-b border-pink"
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
                                                <CustomCheckbox key={category} label={category} />
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Availability Dropdown */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setAvailabilityOpen(!availabilityOpen)}
                                    className="w-full flex justify-between items-center text-[#E57485] font-poppins text-sm font-medium py-2 border-b border-pink"
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
                                            {availabilityOptions.map((status) => (
                                                <CustomCheckbox key={status} label={status} />
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Bottom Buttons */}
                        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-pink">
                            <div className="flex gap-4">
                                <button 
                                    onClick={closeFilter}
                                    className="flex-1 py-2 px-4 border border-dark_pink text-dark_pink font-poppins text-sm font-medium rounded-md hover:bg-dark_pink hover:text-white transition-all duration-300"
                                >
                                    Clear All
                                </button>
                                <button 
                                    onClick={closeFilter}
                                    className="flex-1 py-2 px-4 bg-dark_pink text-white font-poppins text-sm font-medium rounded-md hover:bg-white hover:text-dark_pink hover:border-dark_pink border border-transparent transition-all duration-300"
                                >
                                    Apply
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