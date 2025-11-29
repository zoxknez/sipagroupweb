'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { companyInfo } from '@/lib/data/properties';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [magnetPosition, setMagnetPosition] = useState({ x: 0, y: 0 });

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on links - handled in Link onClick

  // Magnetic button effect
  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnetPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMagnetLeave = () => {
    setMagnetPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 overflow-hidden rounded-lg"
              >
                <Image
                  src="/images/logo.png"
                  alt="Sipka Group"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white tracking-tight">
                  SIPKA
                </span>
                <span className="text-xl font-light text-white/60 tracking-tight ml-1">
                  GROUP
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      pathname === link.href
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    )}
                  >
                    {link.label}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: pathname === link.href ? '100%' : 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Client Portal Button */}
            <div className="hidden md:block">
              <motion.a
                ref={magnetRef}
                href={companyInfo.clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                animate={{ x: magnetPosition.x, y: magnetPosition.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group"
              >
                {/* Glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <span className="absolute inset-[1px] bg-black/50 rounded-full" />
                
                <span className="relative text-sm font-semibold text-white">
                  Client Portal
                </span>
                <ExternalLink className="relative w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2 text-white"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border-l border-white/10 p-8 pt-24"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block text-3xl font-bold transition-colors',
                        pathname === link.href
                          ? 'text-white'
                          : 'text-white/50 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-6 mt-6 border-t border-white/10"
                >
                  <a
                    href={companyInfo.clientPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white font-semibold"
                  >
                    Client Portal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
