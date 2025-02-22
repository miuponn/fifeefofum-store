import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronUp } from 'react-icons/fi';
import lovebirdsImage from '../assets/images/lovebirds.png';

interface SidebarProps {
    backgroundColor?: string;
}

interface CustomCheckboxProps {
    label: string;
    onChange?: (checked: boolean) => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleChange = (): void => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <li className="flex items-center gap-2 cursor-pointer" onClick={handleChange}>
            <div className="w-4 h-4 border-2 border-[#E57485] rounded flex items-center justify-center">
                {isChecked && (
                    <svg className="w-3 h-3 text-button_pink" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </div>
            <span className="font-poppins font-medium uppercase text-dark_pink text-xs hover:underline">
                {label}
            </span>
        </li>
    );
};

const Sidebar: FC<SidebarProps> = ({ backgroundColor = "white" }) => {
    const [categoryOpen, setCategoryOpen] = useState<boolean>(true);
    const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(true);

    return (
        <aside className={`bg-${backgroundColor} p-4 rounded-lg`}>
            <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 flex-grow">
                <h2 className="text-2xl md:text-3xl font-chewie font-extrabold text-dark_pink mb-6">
                    Products
                </h2>

                <nav className="text-sm font-poppins font-light text-dark_pink mb-6">
                    <Link to="/" className="hover:underline text-[#AF001A]">Home</Link>
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
                                {["Phone Charms", "Stickers", "Keychains", "Jewelry", "Accessories"].map((category) => (
                                    <CustomCheckbox key={category} label={category} />
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
                                {["In Stock", "Out of Stock"].map((status) => (
                                    <CustomCheckbox key={status} label={status} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-6 lg:px-8 py-6 flex justify-center">
                <img 
                    src={lovebirdsImage} 
                    alt="Lovebirds"
                    className="h-[160px] md:h-[180px] lg:h-[200px] w-auto object-contain"
                />
            </div>
        </aside>
    );
};

export default Sidebar;