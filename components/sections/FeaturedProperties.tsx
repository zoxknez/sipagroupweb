'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { getFeaturedProperties, type Property } from '@/lib/data/properties';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  index: number;
}

function PropertyCard({ property, index }: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-500',
    leased: 'bg-amber-500',
    sold: 'bg-orange-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/portfolio/${property.slug}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
          {/* Image */}
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium text-white capitalize',
              statusColors[property.status]
            )}>
              {property.status}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm capitalize">
              {property.category}
            </span>
          </div>

          {/* Hover overlay with arrow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowUpRight className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <MapPin className="w-3 h-3" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Property specs */}
        <div className="flex items-center gap-4 text-sm text-white/60">
          {property.landArea && (
            <span>Land: {property.landArea}</span>
          )}
          {property.buildingArea && (
            <span>Building: {property.buildingArea}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProperties() {
  const featuredProperties = getFeaturedProperties();

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-stops))] from-amber-950/30 via-transparent to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Featured Properties
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors group"
            >
              View All Properties
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
