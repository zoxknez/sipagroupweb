'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Target, Eye, Heart, Building2, Shield, Clock, Award, ExternalLink } from 'lucide-react';
import { companyInfo } from '@/lib/data/properties';

const values = [
  {
    icon: Users,
    title: 'Family-Oriented',
    description: 'Our strength comes from a family-oriented business. Future generations will carry on the legacy of the Sipka Group as we lay the foundation rocks for the future.',
  },
  {
    icon: Target,
    title: 'Archaeologists of Property',
    description: 'We focus on prominent positions and undervalued assets. By breathing new life into buildings, we restore them to their former glory.',
  },
  {
    icon: Eye,
    title: 'Active Management',
    description: 'By actively managing our properties directly, we focus on tenant demands in a more efficient and effective way.',
  },
  {
    icon: Heart,
    title: 'Customer-Focused',
    description: 'Our people are customer-focused and provide the best results. We have professional staff to meet your maintenance requirements at all times.',
  },
];

const partners = [
  {
    name: 'Ascension Wine Estate',
    url: 'http://ascensionwine.co.nz/',
    description: 'Premium wine estate partnership',
  },
  {
    name: 'Soundcraft',
    url: 'http://soundcraft.co.nz/',
    description: 'Telecommunications & security partner',
  },
];

const timeline = [
  {
    year: '2005',
    title: 'Foundation',
    description: 'Sipka Holdings Ltd established in Auckland, beginning our property investment journey alongside our telecommunications and security business.',
  },
  {
    year: '2010',
    title: 'Portfolio Growth',
    description: 'Expanded into commercial office buildings along Symonds Street, Auckland CBD.',
  },
  {
    year: '2015',
    title: 'Diversification',
    description: 'Added residential properties and development sites to create a balanced, risk-minimized portfolio.',
  },
  {
    year: '2018',
    title: 'Canterbury Arcade',
    description: 'Restored the historic Canterbury Arcade on Queen Street Auckland, a testament to our success as archaeologists of property.',
  },
  {
    year: '2020',
    title: 'Regional Expansion',
    description: 'Extended our reach to Wellington, Queenstown, and Matamata with hospitality and development properties.',
  },
  {
    year: '2024',
    title: 'Family Legacy Continues',
    description: 'Managing 20+ properties across four regions, laying the foundation for future generations.',
  },
];

const achievements = [
  { icon: Building2, value: '20+', label: 'Properties' },
  { icon: Shield, value: '100%', label: 'Family Owned' },
  { icon: Clock, value: '20', label: 'Years Experience' },
  { icon: Award, value: '4', label: 'NZ Regions' },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/properties/67_symonds_st.jpg"
            alt="Sipka Group Headquarters"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 block"
            >
              About Us
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8"
            >
              Archaeologists of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
                Property
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              {companyInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all group"
              >
                View Our Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <stat.icon className="w-7 h-7 text-amber-400" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={containerRef} className="py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div style={{ y }} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/properties/canterbury_arcade.jpg"
                  alt="Canterbury Arcade"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -right-8 bottom-12 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 max-w-xs"
              >
                <p className="text-white font-semibold mb-2">Canterbury Arcade</p>
                <p className="text-white/60 text-sm">
                  A testament to our success in breathing new life back into heritage buildings.
                </p>
              </motion.div>
            </motion.div>

            {/* Content */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-6 block"
              >
                About Us
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-8"
              >
                Archaeologists of Property
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6 text-white/70"
              >
                <p>
                  As archaeologists of property, we focus on prominent positions and undervalued 
                  and underperforming assets. By breathing new life back into these buildings, 
                  we are able to renovate them and bring them back to their former glory. 
                  The Canterbury Arcade on Queen Street Auckland is a testament to this success.
                </p>
                <p>
                  We further attract new tenants to achieve the highest standard for all our tenants. 
                  Our experience expands almost two decades, including successfully operating a 
                  telecommunications and security business in New Zealand.
                </p>
                <p>
                  Our strategy is to meet tenants&apos; demands and maintain a diverse property 
                  portfolio to minimise risk. We strive to deliver a unique service to our tenant base 
                  by actively managing our properties directly. This enables us to focus on tenant 
                  demands in a more efficient and effective way.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="py-32 bg-gradient-to-b from-black via-amber-950/10 to-black overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our People
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A Family-Oriented Property Group
            </h2>
            <p className="text-white/70 text-lg">
              Sipka Group of companies is a family-oriented property group. Our people are 
              customer-focused and provide the best results. We have professional and experienced 
              staff to meet your maintenance requirements at all times.
            </p>
          </motion.div>

          {/* Family Photo Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group col-span-2 row-span-2"
            >
              <Image
                src="/images/team/slika_1.png"
                alt="Sipka Family Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold">The Sipka Family</p>
                <p className="text-white/60 text-sm">Building a legacy together</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <Image
                src="/images/team/slika_2.png"
                alt="Sipka Brothers"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <Image
                src="/images/team/slika_3.png"
                alt="Family Formal Portrait"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative aspect-[2/1] rounded-2xl overflow-hidden group col-span-2"
            >
              <Image
                src="/images/team/slika_4.png"
                alt="Sipka Group Team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold">Our Team</p>
                <p className="text-white/60 text-sm">Professional staff ready to serve</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Two Decades of Growth
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative lg:flex lg:items-center lg:gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-amber-400 text-2xl font-bold">{item.year}</span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-black" />

                  {/* Empty space for other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-amber-950/20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-6 block">
              Company Vision
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Building a Legacy for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
                Future Generations
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Sipka Group are long-term property investors and our vision is to acquire more 
              properties within New Zealand and abroad and to become the best. Our strength 
              comes from a family-oriented business so future generations may carry on the 
              legacy of the Sipka Group as we lay the foundation rocks for the future.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors group"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Trusted Partnerships
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors flex items-center justify-center gap-2">
                  {partner.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-white/50 text-sm">{partner.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
