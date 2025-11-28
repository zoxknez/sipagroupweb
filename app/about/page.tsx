'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Target, Eye, Heart, Building2, Shield, Clock, Award } from 'lucide-react';
import { companyInfo } from '@/lib/data/properties';

const values = [
  {
    icon: Users,
    title: 'Family-Oriented',
    description: 'As a family business, we bring personal care and long-term commitment to every property and relationship.',
  },
  {
    icon: Target,
    title: 'Strategic Focus',
    description: 'We target prominent positions and undervalued assets, seeing potential where others see challenges.',
  },
  {
    icon: Eye,
    title: 'Active Management',
    description: 'Direct property management enables us to respond efficiently and effectively to tenant needs.',
  },
  {
    icon: Heart,
    title: 'Customer-Focused',
    description: 'Our experienced team provides professional maintenance services with high standards.',
  },
];

const timeline = [
  {
    year: '2005',
    title: 'Foundation',
    description: 'Sipka Holdings Ltd established in Auckland, beginning our property investment journey.',
  },
  {
    year: '2010',
    title: 'Portfolio Growth',
    description: 'Expanded into commercial office buildings along Symonds Street, Auckland.',
  },
  {
    year: '2015',
    title: 'Diversification',
    description: 'Added residential properties and development sites to create a balanced portfolio.',
  },
  {
    year: '2018',
    title: 'Canterbury Arcade',
    description: 'Restored the historic Canterbury Arcade, showcasing our expertise in revitalizing heritage buildings.',
  },
  {
    year: '2020',
    title: 'Regional Expansion',
    description: 'Extended our reach to Wellington, Queenstown, and Matamata.',
  },
  {
    year: '2024',
    title: 'Continued Growth',
    description: 'Managing 20+ properties across four regions, continuing our family legacy.',
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
              className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 block"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <stat.icon className="w-7 h-7 text-blue-400" />
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
                  A testament to our expertise in restoring heritage buildings to their former glory.
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
                className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-6 block"
              >
                Our Story
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-8"
              >
                Discovering Hidden Value in New Zealand Real Estate
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6 text-white/70"
              >
                <p>
                  Sipka Group describes itself as &ldquo;archaeologists of property,&rdquo; focusing on 
                  prominent positions and undervalued or underperforming assets. We see beyond 
                  the surface to discover the hidden potential in every building.
                </p>
                <p>
                  With almost two decades of experience, including operating a telecommunications 
                  and security business in New Zealand, our team brings diverse expertise to 
                  property investment.
                </p>
                <p>
                  Our strategy is simple but effective: meet tenant demands while maintaining 
                  a diverse property portfolio to minimize risk. By actively managing our 
                  properties directly, we respond efficiently to every need.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
            <span className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Two Decades of Growth
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block" />

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
                      <span className="text-blue-400 text-2xl font-bold">{item.year}</span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black" />

                  {/* Empty space for other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-6 block">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Building a Legacy for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Future Generations
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              As long-term property investors, we aim to acquire more properties within 
              New Zealand and abroad. We strive to become the best by leveraging our 
              family-oriented strength so that future generations may continue our legacy.
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
    </div>
  );
}
