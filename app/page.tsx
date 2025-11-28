import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { CTA } from '@/components/sections/CTA';

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
