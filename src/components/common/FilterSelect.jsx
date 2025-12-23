import React from 'react';

const FilterSelect = ({ options, value, onChange, defaultOption = "All" }) => {
    return (
        <select 
            className="select select-bordered w-full max-w-xs"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="All">{defaultOption}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default FilterSelect;