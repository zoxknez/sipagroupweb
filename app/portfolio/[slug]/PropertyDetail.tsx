'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Building2, Ruler, Calendar, Car, Check, ExternalLink } from 'lucide-react';
import { type Property, properties, companyInfo } from '@/lib/data/properties';
import { cn } from '@/lib/utils';

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const statusColors = {
    available: 'bg-green-500/20 text-green-400 border-green-500/30',
    leased: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  // Get related properties (same category, excluding current)
  const relatedProperties = properties
    .filter((p) => p.category === property.category && p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero section with image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-32 left-6 lg:left-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm hover:bg-white/20 transition-colors border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Property info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium capitalize border backdrop-blur-sm',
                  statusColors[property.status]
                )}>
                  {property.status}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 capitalize">
                  {property.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {property.name}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-white/70 text-lg">
                <MapPin className="w-5 h-5" />
                {property.address}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6">About This Property</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {property.description}
                </p>
              </motion.div>

              {/* Features */}
              {property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Vacant spaces */}
              {property.vacantSpaces && property.vacantSpaces.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Available Spaces</h2>
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-amber-500/10 border border-green-500/20">
                    <ul className="space-y-3">
                      {property.vacantSpaces.map((space, index) => (
                        <li key={index} className="flex items-center gap-3 text-white/80">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          {space}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-32"
              >
                {/* Property specs card */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <h3 className="text-xl font-bold text-white mb-6">Property Details</h3>
                  <div className="space-y-4">
                    {property.landArea && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div className="flex items-center gap-3 text-white/60">
                          <Ruler className="w-5 h-5" />
                          Land Area
                        </div>
                        <span className="text-white font-medium">{property.landArea}</span>
                      </div>
                    )}
                    {property.buildingArea && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div className="flex items-center gap-3 text-white/60">
                          <Building2 className="w-5 h-5" />
                          Building Area
                        </div>
                        <span className="text-white font-medium">{property.buildingArea}</span>
                      </div>
                    )}
                    {property.floors && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div className="flex items-center gap-3 text-white/60">
                          <Building2 className="w-5 h-5" />
                          Floors
                        </div>
                        <span className="text-white font-medium">{property.floors}</span>
                      </div>
                    )}
                    {property.carParks && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div className="flex items-center gap-3 text-white/60">
                          <Car className="w-5 h-5" />
                          Car Parks
                        </div>
                        <span className="text-white font-medium">{property.carParks}</span>
                      </div>
                    )}
                    {property.yearBuilt && (
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3 text-white/60">
                          <Calendar className="w-5 h-5" />
                          Year Built
                        </div>
                        <span className="text-white font-medium">{property.yearBuilt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600/20 to-yellow-600/20 border border-amber-500/20">
                  <h3 className="text-xl font-bold text-white mb-3">Interested?</h3>
                  <p className="text-white/60 text-sm mb-6">
                    Contact us to learn more about this property or schedule a viewing.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                    >
                      Contact Us
                    </Link>
                    <a
                      href={companyInfo.clientPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                    >
                      Client Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related properties */}
      {relatedProperties.length > 0 && (
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white">Related Properties</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProperty, index) => (
                <motion.div
                  key={relatedProperty.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/portfolio/${relatedProperty.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={relatedProperty.image}
                        alt={relatedProperty.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {relatedProperty.name}
                        </h3>
                        <p className="text-white/60 text-sm">{relatedProperty.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
