import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';

// Dynamic imports for below-fold sections to reduce initial CSS
const FeaturedProperties = dynamic(() => import('@/components/sections/FeaturedProperties').then(mod => ({ default: mod.FeaturedProperties })), {
  ssr: true,
});
const AboutTeaser = dynamic(() => import('@/components/sections/AboutTeaser').then(mod => ({ default: mod.AboutTeaser })), {
  ssr: true,
});
const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => ({ default: mod.CTA })), {
  ssr: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties />
      <AboutTeaser />
      <CTA />
    </>
  );
}
