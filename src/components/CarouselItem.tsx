'use client'
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CarouselItemProps {
  children: ReactNode;
  className?: string; // Optional prop for custom styles
  textElements?: string[]; // Optional prop for multiple texts
  animation?: object; // Optional prop for custom animation
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, className, textElements, animation }) => {
  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...animation} // Apply custom animation if provided
    >
      {children}
      {textElements && textElements.map((text, index) => (
        <div key={index} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded-lg">
          {text}
        </div>
      ))}
    </motion.div>
  );
};

export default CarouselItem;
