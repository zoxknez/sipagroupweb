'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function ImageCarousel({ 
  images, 
  direction = 'left', 
  speed = 30,
  className 
}: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 3);
    }
  }, [images]);

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div
        ref={containerRef}
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? [-containerWidth, 0] : [0, -containerWidth],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative flex-shrink-0 w-80 h-52 rounded-2xl overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Property ${index + 1}`}
              fill
              sizes="320px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Vertical scrolling version
export function ImageCarouselVertical({ 
  images, 
  direction = 'up', 
  speed = 40,
  className 
}: {
  images: string[];
  direction?: 'up' | 'down';
  speed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight / 3);
    }
  }, [images]);

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {/* Gradient overlays */}
      <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />
      
      <motion.div
        ref={containerRef}
        className="flex flex-col gap-4"
        animate={{
          y: direction === 'up' ? [-containerHeight, 0] : [0, -containerHeight],
        }}
        transition={{
          y: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative flex-shrink-0 w-full aspect-[4/3] rounded-xl overflow-hidden"
          >
            <Image
              src={image}
              alt={`Property ${index + 1}`}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
