import { FC, useState, ChangeEvent, FocusEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps{
  onSearch?: (query:string) => void;
}
const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative transition-all duration-300 ease-in-out">
      <div
        className={`flex items-center border-b-2 border-[#F9E1E1] w-32 md:w-48 lg:w-64 py-1 px-3 transition-all duration-300 ease-in-out
          ${isFocused ? "border-2 border-pink w-64 md:w-80 lg:w-96 rounded-md" : ""}
        `}
      >
        {!isFocused && (
          <span className="text-[#F9E1E1] font-viucobacoba text-lg transition-opacity duration-300">
            search...
          </span>
        )}

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className="flex-grow bg-transparent outline-none text-primary text-sm transition-all duration-300 ease-in-out"
          aria-label="Search products"
        />
      </div>

      {/* Search Icon (Scales on Hover) */}
      <FiSearch
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F9E1E1] text-lg transition-all duration-300 ease-in-out
          ${isFocused ? "text-accent_pink scale-110" : ""}
        `}
      />
    </div>
  );
};

export default SearchBar;