'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-purple-950/20" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            style={{ y }}
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/properties/canterbury_arcade.jpg"
              alt="Canterbury Arcade - Sipka Group"
              fill
              className="object-cover"
            />
            {/* Overlay with pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
            >
              <p className="text-white font-semibold text-lg mb-1">Canterbury Arcade</p>
              <p className="text-white/60 text-sm">A testament to our restoration expertise</p>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            style={{ opacity }}
            className="lg:py-12"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-6 block"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Long-Term Property
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Investors
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/60 text-lg mb-6 leading-relaxed"
            >
              Sipka Group describes itself as &ldquo;archaeologists of property,&rdquo; focusing on 
              prominent positions and undervalued assets. We renovate buildings to bring 
              them back to their former glory and attract quality tenants.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/60 text-lg mb-10 leading-relaxed"
            >
              As a family-oriented property group with almost two decades of experience, 
              we actively manage our properties directly, enabling us to respond 
              efficiently and effectively to tenant needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Decorative element */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-4xl font-bold text-white">20+</p>
                  <p className="text-white/60 text-sm">Years of Experience</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-4xl font-bold text-white">100%</p>
                  <p className="text-white/60 text-sm">Family Owned</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
