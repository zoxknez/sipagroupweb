'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Building2, Users, Target, Gem } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Premium Locations',
    description: 'Strategic properties across Auckland, Wellington, Matamata, and Queenstown.',
  },
  {
    icon: Users,
    title: 'Family Values',
    description: 'Customer-focused approach with professional maintenance services.',
  },
  {
    icon: Target,
    title: 'Active Management',
    description: 'Direct property management for efficient tenant response.',
  },
  {
    icon: Gem,
    title: 'Hidden Value',
    description: 'Expertise in discovering and restoring undervalued properties.',
  },
];

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Find Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Next Property?
            </span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;re looking for premium office space, retail locations, or investment opportunities, 
            Sipka Group has the expertise to help you succeed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors group"
            >
              Explore Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
