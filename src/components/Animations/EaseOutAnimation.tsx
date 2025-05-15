'use client'
import React from 'react';
import { motion } from "framer-motion";

export default function EaseOutAnimation({ children } : any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-12 w-full"
    >
      {children}
    </motion.section>
  );
}
