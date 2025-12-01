'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { companyInfo } from '@/lib/data/properties';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ],
  portfolio: [
    { href: '/portfolio?category=commercial', label: 'Commercial' },
    { href: '/portfolio?category=residential', label: 'Residential' },
    { href: '/portfolio?category=development', label: 'Development' },
    { href: '/portfolio?category=hospitality', label: 'Hospitality' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Sipka Group"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white">SIPKA</span>
                <span className="text-xl font-light text-white/60 ml-1">GROUP</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              {companyInfo.tagline}. A family-oriented property investment group with almost two decades of experience in New Zealand.
            </p>
            <motion.a
              href={companyInfo.clientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-semibold"
            >
              Client Portal
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio column */}
          <div>
            <h3 className="text-white font-semibold mb-6">Portfolio</h3>
            <ul className="space-y-3">
              {footerLinks.portfolio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.mobile.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  {companyInfo.mobile}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {companyInfo.partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
