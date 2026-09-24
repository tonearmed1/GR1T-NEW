import type { Metadata } from "next";
import { notFound } from "next/navigation";
import G1Platform from "../G1Platform";
import { G1Variant, VARIANT_SLUGS, getVariant, isValidVariant } from "@/data/g1-variants";

const BASE = "https://www.gritmotorcycles.com";

/**
 * /motorcycles/g1/[variant] — deep-link URL that pre-selects a variant.
 *
 * Valid slugs come from src/data/g1-variants.ts (street, scrambler, race today;
 * adding more is a data-only change). Anything else returns 404.
 *
 * Each variant URL gets its own metadata + Product schema so Google indexes
 * them as separate product surfaces, preserving per-model SEO equity from the
 * legacy /G1S and /G1X pages.
 */

export async function generateStaticParams() {
  return VARIANT_SLUGS.map((variant) => ({ variant }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ variant: string }> }
): Promise<Metadata> {
  const { variant } = await params;
  if (!isValidVariant(variant)) {
    return { title: "GR1T Motorcycles" };
  }
  const v = getVariant(variant);
  const titleEn = `GR1T ${v.name.en} | Electric motorcycle | G1 Platform`;
  const descEn = `${v.tagline.en} ${v.character.en}`;

  return {
    title: titleEn,
    description: descEn,
    alternates: {
      canonical: `${BASE}/motorcycles/g1/${variant}`,
      languages: {
        en: `${BASE}/motorcycles/g1/${variant}`,
        it: `${BASE}/it/motorcycles/g1/${variant}`,
        "x-default": `${BASE}/motorcycles/g1/${variant}`,
      },
    },
    openGraph: {
      title: titleEn,
      description: descEn,
      url: `${BASE}/motorcycles/g1/${variant}`,
      images: [{ url: `${BASE}${v.heroImage}`, width: 1200, height: 630, alt: v.name.en }],
    },
  };
}

export default async function G1VariantPage(
  { params }: { params: Promise<{ variant: string }> }
) {
  const { variant } = await params;
  if (!isValidVariant(variant)) notFound();
  const v = getVariant(variant);

  // Product schema — only for available variants (G1R doesn't have prices yet)
  const productSchema = v.available
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `GR1T ${v.name.en}`,
        brand: { "@type": "Brand", name: "GR1T Motorcycles" },
        image: `${BASE}${v.heroImage}`,
        description: `${v.tagline.en} ${v.character.en}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${BASE}/motorcycles/g1/${variant}`,
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <G1Platform initialVariant={variant as G1Variant} />
    </>
  );
}
