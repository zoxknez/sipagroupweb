'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Building2, Home, Landmark, Mountain } from 'lucide-react';
import { properties, categories, type Property, type PropertyCategory } from '@/lib/data/properties';
import { cn } from '@/lib/utils';

const categoryIcons = {
  commercial: Building2,
  residential: Home,
  development: Mountain,
  hospitality: Landmark,
  all: Building2,
};

interface PropertyCardProps {
  property: Property;
  index: number;
}

function PropertyCard({ property, index }: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-500/20 text-green-400 border-green-500/30',
    leased: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/portfolio/${property.slug}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-900">
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium capitalize border backdrop-blur-sm',
              statusColors[property.status]
            )}>
              {property.status}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 capitalize">
              {property.category}
            </span>
          </div>

          {/* Hover arrow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
            >
              <ArrowUpRight className="w-7 h-7 text-white" />
            </motion.div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Property specs */}
        <div className="flex flex-wrap gap-4 text-sm text-white/50">
          {property.landArea && property.landArea !== 'CBD' && property.landArea !== 'Town centre' && (
            <span className="flex items-center gap-1">
              <span className="text-white/30">Land:</span> {property.landArea}
            </span>
          )}
          {property.buildingArea && property.buildingArea !== 'Multiple structures' && property.buildingArea !== 'Development Site' && property.buildingArea !== 'Retail complex' && (
            <span className="flex items-center gap-1">
              <span className="text-white/30">Building:</span> {property.buildingArea}
            </span>
          )}
          {property.floors && (
            <span className="flex items-center gap-1">
              <span className="text-white/30">Floors:</span> {property.floors}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PropertyCategory | 'all'>('all');

  const filteredProperties = useMemo(() => {
    if (activeCategory === 'all') return properties;
    return properties.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Property Collection
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio of commercial, residential, and development properties 
            across New Zealand&apos;s premier locations.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category.value];
            return (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category.value
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* Properties count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-white/40 text-sm mb-8"
        >
          Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
        </motion.p>

        {/* Properties grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">No properties found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
