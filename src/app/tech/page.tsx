import { notFound } from "next/navigation";

/**
 * /tech is deprecated — its content is now consolidated into the TechFeatures
 * section on the homepage (anchor: /#tech-features).
 *
 * This file returns 404 because Cowork's sandbox can't delete files. To
 * physically remove the route + its orphan component files, run from terminal:
 *   rm -rf src/app/tech
 *
 * Until that's done, the route exists but always 404s.
 */
export default function DeprecatedTechPage() {
  notFound();
}
