'use client';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage }) => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    // Handle click event for pagination
    const handleClick = (page : number) => {
        if (page > 0 && page <= totalPage) {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
        }
    };

    // Render the page numbers based on total pages
    const renderPageNumbers = () => {
        const range = [];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPage - 1, currentPage + 2);

        // Always push the first page
        range.push(1);
        
        // Add ellipsis if there are pages between 1 and the startPage
        if (startPage > 2) range.push('...');

        // Add the pages in the range
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        // Add ellipsis if there are pages between endPage and the last page
        if (endPage < totalPage - 1) range.push('...');

        // Always push the last page if it's not already included
        if (totalPage > 1) range.push(totalPage);

        return range;
    };

    // Conditional rendering based on total pages
    if (totalPage <= 1) {
        return null; // or <div>No more pages</div>; depending on your preference
    }

    return (
        <div className="flex justify-center items-center mt-4">
            {/* Previous Button */}
            <button
                onClick={() => handleClick(currentPage - 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            <div className="mx-2">
                {renderPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handleClick(page)}
                        className={`px-3 py-1 mx-1 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handleClick(currentPage + 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={currentPage === totalPage}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;