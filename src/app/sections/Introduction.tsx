'use client'
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Introduction() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-purple-500 py-16 px-6 md:px-16 lg:px-32 flex flex-col lg:flex-row justify-between items-center">
      {/* Profile Image */}
      <motion.div
        className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl lg:mr-10"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/avatar.jpeg"
          alt="Prongs Profile"
          width={1000}
          height={1000}
          className="w-full h-full cursor-pointer object-cover filter grayscale transition-all duration-500 hover:filter-none hover:scale-110"
        />
      </motion.div>

      {/* Introduction Text */}
      <motion.div
        className="text-white mt-8 lg:mt-0 flex-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-5xl font-bold mb-4"
          variants={containerVariants}
        >
          Hi, I'm Pegasus Prongs
        </motion.h2>
        <motion.p
          className="text-xl mb-6"
          variants={containerVariants}
        >
          A passionate web developer, specializing in React, Next.js, and Blockchain. Let’s create something extraordinary together!
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#"
          className="inline-block border-2 px-8 py-4 bg-white border-transparent text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white hover:border-2 hover:border-white transition-all"
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          variants={containerVariants}
        >
          Discover My Work
        </motion.a>
      </motion.div>
    </section>
  );
}
