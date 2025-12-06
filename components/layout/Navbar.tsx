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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [magnetPosition, setMagnetPosition] = useState({ x: 0, y: 0 });

  // Handle scroll - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Don't hide navbar if mobile menu is open
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }
      
      // Show navbar when at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

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
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                  src="/logo.png"
                  alt="Sipka Group"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  SIPKA
                </span>
                <span className="text-lg sm:text-xl font-light text-white/60 tracking-tight ml-1">
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

            {/* Available Spaces Button */}
            <div className="hidden md:block">
              <motion.a
                ref={magnetRef}
                href={companyInfo.clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                animate={{ 
                  x: magnetPosition.x, 
                  y: magnetPosition.y,
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 20px rgba(245, 158, 11, 0.4)',
                    '0 0 40px rgba(245, 158, 11, 0.8)',
                    '0 0 20px rgba(245, 158, 11, 0.4)'
                  ]
                }}
                transition={{ 
                  x: { type: 'spring', stiffness: 150, damping: 15 },
                  y: { type: 'spring', stiffness: 150, damping: 15 },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group"
              >
                {/* Animated glow ring */}
                <motion.span 
                  className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                {/* Glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 blur-xl"
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="absolute inset-[1px] bg-black/50 rounded-full" />
                
                {/* Pulse dot indicator */}
                <motion.span
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
                
                <span className="relative text-sm font-semibold text-white">
                  Available Spaces
                </span>
                <ExternalLink className="relative w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              </motion.a>
            </div>

            {/* Mobile Available Spaces + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.a
                href={companyInfo.clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 10px rgba(245, 158, 11, 0.3)',
                    '0 0 20px rgba(245, 158, 11, 0.6)',
                    '0 0 10px rgba(245, 158, 11, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut'
                }}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden text-xs"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 opacity-90" />
                <span className="absolute inset-[1px] bg-black/40 rounded-full" />
                {/* Pulse dot */}
                <motion.span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative font-semibold text-white">Spaces</span>
                <ExternalLink className="relative w-3 h-3 text-white/80" />
              </motion.a>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-10 p-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30"
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
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
              </button>
            </div>
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
                    Available Spaces
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
