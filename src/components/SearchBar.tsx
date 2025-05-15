'use client'
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (searchQuery) {
            params.set('query', searchQuery);
        } else {
            params.delete('query');
        }
        console.log(params.toString());
        replace(`${pathname}?${params.toString()}`);
        // Implement search logic here
    };

    return (
        <div className={`flex items-center max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden ${className}`}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
                className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-l-full"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-r-full shadow-md hover:shadow-lg focus:outline-none transition-transform transform hover:scale-105"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
