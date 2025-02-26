'use client';

import { useState, ChangeEvent, FocusEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = 'search...' }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || ''
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative transition-all duration-300 ease-in-out">
      <div
        className={`flex items-center border-b-2 border-[#F9E1E1] w-32 md:w-48 lg:w-64 py-1 px-3 
          transition-all duration-300 ease-in-out
          ${isFocused ? "border-2 border-pink w-64 md:w-80 lg:w-96 rounded-md" : ""}
        `}
      >
        {!isFocused && !searchQuery && (
          <span 
            className="absolute left-3 text-[#F9E1E1] font-viucobacoba text-lg 
              transition-opacity duration-300 pointer-events-none"
          >
            {placeholder}
          </span>
        )}

        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className="flex-grow bg-transparent outline-none text-dark_pink_secondary 
            text-sm transition-all duration-300 ease-in-out w-full"
        />
      </div>

      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 
          hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <FiSearch
          className={`text-[#F9E1E1] text-lg transition-all duration-300 ease-in-out
            ${isFocused ? "text-accent_pink" : ""}
          `}
        />
      </button>
    </form>
  );
};

export default SearchBar;