import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, placeholder = "Search...", value }) => {
    return (
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
            <input 
                type="text" 
                className="grow" 
                placeholder={placeholder} 
                onChange={(e) => onSearch(e.target.value)} 
                value={value}
            />
            <FaSearch className="opacity-70" />
        </label>
    );
};

export default SearchBar;