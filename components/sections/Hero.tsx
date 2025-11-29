'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const CityScene = dynamic(
  () => import('@/components/3d/CityScene').then((mod) => mod.CityScene),
  { ssr: false }
);

export function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('stats-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <CityScene />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          {/* Small tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-amber-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6"
          >
            New Zealand Property Investment
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight mb-4"
          >
            <span className="inline-block">SIPKA</span>
            <span className="inline-block font-light text-white/60 ml-4">GROUP</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/60 font-light tracking-wide mt-6"
          >
            Archaeologists of Property
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="max-w-xl mx-auto text-white/40 text-sm md:text-base mt-8"
          >
            Discovering hidden value in New Zealand&apos;s premier real estate.
            Click on any building to explore our portfolio.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Corner decorations */}
      <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-white/10 z-20" />
      <div className="absolute top-20 right-6 w-20 h-20 border-r-2 border-t-2 border-white/10 z-20" />
      <div className="absolute bottom-20 left-6 w-20 h-20 border-l-2 border-b-2 border-white/10 z-20" />
      <div className="absolute bottom-20 right-6 w-20 h-20 border-r-2 border-b-2 border-white/10 z-20" />
    </section>
  );
}
