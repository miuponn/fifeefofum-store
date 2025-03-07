'use client';

import { FC } from 'react';
import { FiFilter } from "react-icons/fi";

interface FilterButtonProps {
    openFilter: () => void;
}

const FilterButton: FC<FilterButtonProps> = ({ openFilter }) => {
    return (
        <button
            onClick={openFilter}
            className="flex items-center gap-2 px-4 py-2 border border-dark_pink 
                     text-dark_pink font-poppins text-sm font-medium uppercase 
                     rounded-md hover:bg-dark_pink hover:text-white transition">
            <FiFilter />
            Filters
        </button>
    );
};

export default FilterButton;