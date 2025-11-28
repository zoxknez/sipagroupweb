import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { properties, getPropertyBySlug } from '@/lib/data/properties';
import PropertyDetail from './PropertyDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  return {
    title: property.name,
    description: property.description,
    openGraph: {
      title: `${property.name} | Sipka Group`,
      description: property.description,
      images: [property.image],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}
