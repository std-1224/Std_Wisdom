// components/Chip.tsx
'use client'
import React from 'react';

interface ChipProps {
  label: string;
  onDelete?: () => void; // Optional delete function
}

const Chip: React.FC<ChipProps> = ({ label = "!", onDelete }) => {
  return (
    <div className="flex items-center bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2">
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-2 text-white hover:text-red-300"
          aria-label="Delete"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Chip;
