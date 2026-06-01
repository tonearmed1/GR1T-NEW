"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { G1Variant, getVariant, isValidVariant } from "@/data/g1-variants";
import Hero from "./components/Hero";
import VariantSelector from "./components/VariantSelector";
import PlatformTech from "./components/PlatformTech";
import VariantDifferences from "./components/VariantDifferences";
import VariantLifestyle from "./components/VariantLifestyle";
import PlatformReserveCTA from "./components/PlatformReserveCTA";

/**
 * G1Platform — top-level wrapper for the unified motorcycle product surface.
 *
 * Holds the active variant in state. URL deep-links (/motorcycles/g1/street, etc.)
 * pass the initial variant via prop. When the user changes variant via the
 * VariantSelector, we update the URL via shallow routing (router.replace) so the
 * variant URL stays in sync without a page reload. Browser back/forward works.
 *
 * Variant-aware sections (Hero, VariantDifferences, VariantLifestyle, PlatformReserveCTA)
 * receive `variant` as a prop and animate the swap. Shared sections (PlatformTech)
 * never re-render.
 */

export default function G1Platform({ initialVariant }: { initialVariant: G1Variant }) {
  const [variant, setVariantState] = useState<G1Variant>(initialVariant);
  const router = useRouter();

  // Sync state on browser back/forward (URL changes externally)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPopState = () => {
      const seg = window.location.pathname.split("/").filter(Boolean).pop() || "";
      if (isValidVariant(seg)) setVariantState(seg);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setVariant = useCallback(
    (next: G1Variant) => {
      if (next === variant) return;
      setVariantState(next);
      // Shallow route update: URL changes, page doesn't reload, scroll preserved.
      // We use replace (not push) for the variant selector so rapid switching doesn't
      // pollute history. Initial page navigation still uses push (via <Link>).
      router.replace(`/motorcycles/g1/${next}`, { scroll: false });
    },
    [router, variant],
  );

  const data = getVariant(variant);

  return (
    <div className="bg-black text-white">
      <Hero variant={data} />
      <VariantSelector active={variant} onChange={setVariant} />
      <PlatformTech />
      <VariantDifferences active={variant} />
      <VariantLifestyle variant={data} />
      <PlatformReserveCTA variant={data} />
    </div>
  );
}
