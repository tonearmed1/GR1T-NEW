# GR1T G1 Platform — Website Architecture

**Branch:** `redesign-g1-platform`
**Date:** 1 June 2026
**Status:** Proposal for review — not merged to main.

---

## 1. Strategic premise

GR1T's three motorcycles (G1S Street, G1X Scrambler, G1R coming) share ~85-90% of their
specifications, technology, and components. The current website treats them as three separate
products, duplicating content and weakening the platform story.

**The redesign reframes them as three characters of one platform.** This is the same
positioning Tesla uses for Model S / 3 / X / Y, Polestar for 2 / 3 / 4, and Porsche for the
Taycan range — all variants of one base platform, each with a distinct emotional identity,
unified under a single product narrative.

### Why this is the right move
- **Premium signal.** Platform engineering is what serious motorcycle and EV brands talk about.
- **Lower maintenance.** Update charging specs in one place, all variants reflect it.
- **Cleaner navigation.** One Motorcycles entry, not three.
- **Future-proof.** Adding G1R (or G1A, future) becomes a data change, not a new page.
- **Story coherence.** The visitor immediately grasps that GR1T is one platform with intent,
  not three loose products competing for attention.

### The tradeoff we accept (and mitigate)
- **SEO:** Collapsing three URLs into one would lose per-model long-tail visibility.
- **Mitigation:** Each variant gets its own deep-link URL (`/motorcycles/g1/street`, etc.)
  that renders the same component pre-selected. Same SEO surface, in-page switching uses
  shallow routing so the URL updates without reload. This is the Tesla pattern.

---

## 2. URL structure

```
/motorcycles                          Variant overview (optional landing — can redirect to /g1)
/motorcycles/g1                       Platform page — default variant (Street)
/motorcycles/g1/street                Platform page pre-selecting G1S Street
/motorcycles/g1/scrambler             Platform page pre-selecting G1X Scrambler
/motorcycles/g1/race                  Platform page pre-selecting G1R Race (when launched)
```

**Redirects from current URLs:**
| Old                | New                                |
|--------------------|------------------------------------|
| `/G1S`             | `/motorcycles/g1/street` (301)     |
| `/G1S/specs`       | `/motorcycles/g1/street#specs` (301) |
| `/G1X`             | `/motorcycles/g1/scrambler` (301)  |
| `/G1X/specs`       | `/motorcycles/g1/scrambler#specs` (301) |

301s preserve backlinks and SEO equity. Implemented in `next.config.ts`.

---

## 3. Site map (revised)

```
Home
Motorcycles
  └─ G1 Platform               ← single product surface (with variant deep-links)
Technology                     ← (already lives on homepage as TechFeatures)
Founders Circle                ← optional separate page; currently in /reserve flow
About
Contact
```

The header simplifies further. Current 4 items (Motorcycles dropdown / About / News /
Contact + Reserve CTA) stays; the dropdown changes from "G1S Street | G1X Scrambler"
to a single "G1 Platform" link OR keeps both as quick-access deep-links into the same
page. Recommendation: keep both deep-links visible to power users, since clicking
"G1X Scrambler" still goes to the right place — just lands on the unified page with
G1X pre-selected.

---

## 4. Page anatomy — `/motorcycles/g1`

Single page, structured for cinematic scroll. Each section uses scroll-triggered
animations (subtle fade + Y-translate, never more than 24px of motion).

### 4.1 Hero
- Full-bleed cinematic image of the **currently selected variant**
- Variant name (huge — 96-128px on desktop, Britti Sans display)
- Tagline (24-28px, role-defining: "Urban freedom." / "Adventure and exploration." / "Performance and attitude.")
- Subtle scroll indicator
- No CTA in the hero — the visitor scrolls to learn, the variant selector is the next interaction
- On variant switch: cross-fade the background image (300ms), letter-by-letter
  reveal of the new tagline (Polestar-style)

### 4.2 Variant selector — sticky
Sits just below the hero. On mobile, becomes a sticky bottom tab bar so it's always reachable.

- 3 large tiles (or 2 + "Coming soon" for G1R)
- Each tile: small bike profile illustration + variant name + one-line character
- Active state: bold border, brand accent
- Click → variant state updates, URL updates via `router.replace()` (shallow), section
  contents below cross-fade
- Sticky behavior: on scroll past hero, condense to a thin horizontal tab bar at top
- Accessibility: keyboard navigable, ARIA tablist + tabpanel

### 4.3 Platform technology (shared — appears once)
Heading: "One platform. Everything you need."

- Shared specs grid: 6 numbers (range, top speed, payload, charge time, batteries, warranty)
- Cards for each platform capability (these never change between variants):
  - Removable dual battery
  - 5" 4G connected display
  - GR1T Keyless Unlock + App
  - Front & rear cameras
  - 9L under-seat storage
  - Belt drive
  - Charge anywhere
- Re-uses the existing `<TechFeatures />` component patterns (DAB-style hover-expand
  cards already built on homepage). Section is **identical** regardless of selected
  variant — that's the point.

### 4.4 Variant differences — comparison view
Heading: "Same DNA. Three characters."

Visual comparison table or side-by-side cards showing only what differs:

| Difference         | G1S Street             | G1X Scrambler            | G1R Race (TBD)         |
|--------------------|------------------------|--------------------------|------------------------|
| Tyres              | Pirelli Angel City     | Metzeler Karoo Street    | TBD (track)            |
| Wheels             | 17" street             | 17" spoked, scrambler    | TBD                    |
| Suspension travel  | 120 mm                 | 140 mm                   | TBD                    |
| Front design       | Café-racer headlight   | High-mount + windscreen  | TBD                    |
| Racks              | Optional rear rack     | Full pannier + top rack  | None / minimal         |
| Hand protectors    | No                     | Yes                      | TBD                    |
| Character          | Lightweight urban      | City + trail capable     | Performance            |
| Starting price     | €7,000                 | €8,000                   | TBD                    |

Visitor immediately sees "what's different from the bike I'm looking at." For the
selected variant, that column is highlighted.

### 4.5 Variant lifestyle — emotional storytelling (variant-specific)

This section changes wholesale between variants. Three distinct stories:

#### G1S Street — "Urban freedom"
- Full-bleed image of the bike in city setting (rider parked, café, graffiti wall)
- Short paragraph (3-4 lines): commute, weekday escape, weekend ride
- Two supporting images side by side (rider close-up, detail shot)
- Subtle parallax on scroll

#### G1X Scrambler — "Adventure and exploration"
- Full-bleed image: bike on trail or city-to-nature transition
- Story copy: built to leave the asphalt, ready when you are
- Two supporting images (off-road action, bike at trailhead)

#### G1R Race — "Performance and attitude" (placeholder)
- "Coming 2027" treatment until images and copy exist
- Reservation interest capture (email field) — convert curiosity into a list

### 4.6 Reserve CTA — premium band
- Full-width dark band with hero image of current variant
- Title: "Reserve your G1." (variant-aware: "Reserve your G1S Street.")
- Sub: €100 refundable. Held separately.
- Primary CTA → `/reserve` (passing model code)
- Secondary CTA → "Book a test ride" (Phase 3 stub for now)

---

## 5. Component hierarchy

```
G1PlatformPage (server)
└─ G1Platform (client — holds variant state, URL syncing)
   ├─ Hero (variant-aware imagery)
   ├─ VariantSelector (sticky)
   ├─ PlatformTech (shared, never changes)
   ├─ VariantDifferences (comparison table)
   ├─ VariantLifestyle (variant-aware storytelling)
   └─ PlatformReserveCTA (variant-aware)
```

Shared building blocks (already exist or to be created):
- `<Image>` (Next.js)
- `<motion.div>` (Framer Motion — already in deps)
- `<Link>` + `useRouter` (Next.js navigation)
- `useLanguage()` (existing EN/IT context)

---

## 6. Data model

All variant differences live in **one file**: `src/data/g1-variants.ts`.

```ts
export type G1Variant = "street" | "scrambler" | "race";

export interface G1VariantData {
  slug: G1Variant;
  code: "G1S" | "G1X" | "G1R";
  name: { en: string; it: string };
  tagline: { en: string; it: string };
  character: { en: string; it: string };
  available: boolean;        // false = "coming soon" treatment
  heroImage: string;
  galleryImages: string[];
  startingPrice: string | null;
  differences: {
    tyres: string;
    wheels: string;
    suspensionTravelMm: number;
    frontDesign: string;
    racks: string;
    handProtectors: boolean;
  };
  lifestyle: {
    storyEn: string;
    storyIt: string;
    images: string[];
  };
}
```

Platform-wide specs live in `src/data/g1-platform.ts` (range, batteries, motor — never
changes per variant).

Both data modules are co-located in `src/data/` so non-technical editors can update
variant details in one file without touching components.

---

## 7. Animations & transitions

Principles:
- Subtle, fast, premium. Never over 400ms.
- Respect `prefers-reduced-motion` (skip animations).
- Cross-fades, not slides. Slides feel "tech-bro," cross-fades feel cinema.

| Element                      | Animation                                                          |
|------------------------------|--------------------------------------------------------------------|
| Hero image (variant switch)  | Cross-fade 300ms, ease-out                                         |
| Hero text (variant switch)   | Letter-stagger reveal 20ms per char, with fade-up 4px              |
| Variant selector active      | Border scale 250ms                                                 |
| PlatformTech cards entering  | Stagger fade-up 50ms apart, 24px Y                                 |
| Comparison table active row  | Highlight slide-in 200ms                                           |
| Lifestyle parallax           | Background `translateY` 0 → -10% over scroll                       |
| Reserve CTA appearance       | Scale 0.98 → 1 + fade, 350ms                                       |
| Page transition              | None (Next.js default; we avoid heavy intro animations)            |

Framer Motion provides all of this. Already in `package.json`.

---

## 8. Mobile-first responsive layout

The page is built mobile-first. Key breakpoints (Tailwind):
- Base (≤640px): mobile, single column, sticky bottom variant selector
- sm (640px+): start using two-column layouts in comparison + lifestyle
- md (768px+): variant selector becomes horizontal tab bar at top
- lg (1024px+): hero text scales up, full cinematic treatment
- xl (1280px+): max content widths

Mobile-specific patterns:
- **Sticky bottom variant selector** — three tabs at the bottom of the viewport,
  always visible. Tap to switch.
- **Hero fills 70vh on mobile** (not 100vh — leaves room for the page below to be
  visible, prompting scroll).
- **Comparison table** — horizontal scroll with the active variant column anchored left,
  others scroll into view.
- **Lifestyle imagery** — full-width edge-to-edge, no padding. Tight rhythm.
- **Reserve CTA** — sticky bottom bar persists on the platform page (separate from the
  variant selector — only appears past the lifestyle section).

---

## 9. Folder structure

```
src/
├── app/
│   ├── motorcycles/                         (NEW)
│   │   └── g1/                              (NEW)
│   │       ├── page.tsx                     (server: default = street)
│   │       ├── G1Platform.tsx               (client: top-level wrapper)
│   │       ├── [variant]/
│   │       │   └── page.tsx                 (server: deep-link variant)
│   │       └── components/
│   │           ├── Hero.tsx
│   │           ├── VariantSelector.tsx
│   │           ├── PlatformTech.tsx
│   │           ├── VariantDifferences.tsx
│   │           ├── VariantLifestyle.tsx
│   │           └── PlatformReserveCTA.tsx
│   ├── G1S/ (legacy — to be deprecated, redirected via next.config)
│   └── G1X/ (legacy — to be deprecated, redirected via next.config)
├── data/
│   ├── g1-variants.ts                       (NEW: per-variant data)
│   └── g1-platform.ts                       (NEW: shared platform spec data)
└── components/
    ├── home/
    │   └── TechFeatures.tsx                 (existing — reused on /motorcycles/g1)
    └── product/
        └── ProductSections.tsx              (existing — pieces reused)

public/
├── g1-platform/                             (NEW image folder)
│   ├── shared/                              (platform-level imagery)
│   ├── street/                              (G1S-specific photos)
│   ├── scrambler/                           (G1X-specific photos)
│   └── race/                                (G1R-specific — empty placeholder)
└── (existing /grit-g1 and /grit-g1x stay for backward compat during migration)

docs/
└── G1_PLATFORM_ARCHITECTURE.md              (this file)
```

---

## 10. Step-by-step migration plan

This branch (`redesign-g1-platform`) is the staging ground. Migration happens in 6 steps:

### Step 1 — Foundation (this PR's scope)
- ✅ Branch created (`redesign-g1-platform`)
- ✅ Architecture documented (this file)
- Build data models: `g1-variants.ts` + `g1-platform.ts`
- Build core components: `G1Platform.tsx`, `Hero.tsx`, `VariantSelector.tsx`
- Stub the remaining components with TODO comments
- Verify Vercel preview deploys cleanly

### Step 2 — Content completion
- Complete `PlatformTech.tsx` (reuse `TechFeatures` patterns)
- Complete `VariantDifferences.tsx` (comparison table)
- Complete `VariantLifestyle.tsx` (variant-aware story sections)
- Complete `PlatformReserveCTA.tsx`
- Add real imagery to `/public/g1-platform/<variant>/`
- Italian translations for all variant data

### Step 3 — Polish
- Animation pass: smooth variant switching, scroll triggers, parallax
- Mobile-specific tweaks: sticky bottom selector, hero ratio, comparison scroll
- Accessibility audit: keyboard nav, ARIA roles, reduced-motion fallbacks
- Performance: image optimisation, font preload, code-splitting

### Step 4 — Migration prep
- Add 301 redirects in `next.config.ts` for `/G1S`, `/G1X` and their sub-routes
- Update Header navigation: change G1S/G1X dropdown entries to point at new URLs
- Update Footer: same
- Update homepage `BikesSection`: cards link to new variant URLs
- Update Reserve flow: model parameter handling

### Step 5 — Cutover
- Final visual QA on Vercel preview
- Senior dev review of branch
- Merge `redesign-g1-platform` → `main`
- After successful production deploy, leave legacy `/G1S` and `/G1X` files in place
  for one week (redirects active) before deletion

### Step 6 — Cleanup
- Delete `src/app/G1S/` and `src/app/G1X/` directories
- Move `/public/grit-g1*` images into `/public/g1-platform/<variant>/`
- Remove now-orphaned imports

---

## 11. SEO strategy

Each deep-link URL gets its own metadata + Product schema:

- `/motorcycles/g1` — Platform-level metadata, "GR1T G1 Platform" title
- `/motorcycles/g1/street` — "GR1T G1S Street | Electric Motorcycle" + Product schema with G1S details
- `/motorcycles/g1/scrambler` — "GR1T G1X Scrambler | ..." + Product schema with G1X details

Canonical tags point each variant URL to itself (not to `/motorcycles/g1`). Hreflang
links each variant to its EN/IT pair.

Result: Google sees 3 distinct product pages for SEO purposes, but the user experience
is one unified product surface with seamless switching. Best of both.

301 redirects from `/G1S` and `/G1X` preserve all existing inbound links (press articles,
old social posts, the EICMA materials).

---

## 12. Where to upload imagery

When new product photos arrive, drop them into:

| Folder                              | What goes here                                              |
|-------------------------------------|-------------------------------------------------------------|
| `/public/g1-platform/shared/`       | Bike-agnostic imagery (battery close-up, app screenshots)   |
| `/public/g1-platform/street/`       | G1S-specific: urban photos, lifestyle, detail shots         |
| `/public/g1-platform/scrambler/`    | G1X-specific: off-road, urban with rugged styling           |
| `/public/g1-platform/race/`         | G1R when shoot happens                                      |

File naming convention: `hero.jpg`, `lifestyle-1.jpg`, `detail-1.jpg`, etc.
The data model in `src/data/g1-variants.ts` references these paths by string.

---

## 13. What this redesign does NOT change

- The Reserve flow at `/reserve` (already built)
- The Help Center at `/faqs` (already redesigned)
- The Tech features section on the homepage (already consolidated)
- The Footer / Header (minor link updates only)
- The Instagram feed (Elfsight, already live)
- The Cookie banner

Scope is **deliberately** confined to the motorcycle product surface. Everything else
stays as-is.

---

## 14. Review checklist (for the senior dev)

Before merging this branch to main, verify:

- [ ] Variant switching works smoothly on all three breakpoints (mobile, tablet, desktop)
- [ ] Deep-link URLs render with correct variant pre-selected
- [ ] Browser back/forward works (shallow routing should integrate with history)
- [ ] Old `/G1S` and `/G1X` URLs 301-redirect correctly
- [ ] No console errors on load
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1, INP < 200ms on the platform page
- [ ] FAQ schema unaffected (the FAQ work in `/faqs` is independent)
- [ ] Reserve flow still works (model param picked up from variant URL)
- [ ] EN + IT both render (we may need help-page translations completing)
- [ ] Reduced-motion users get a static experience (animations short-circuit)

---

## 15. Future variants

When G1R launches (or any future variant):
1. Add an entry to `src/data/g1-variants.ts` with `available: true`
2. Drop photos into `/public/g1-platform/race/`
3. Variant selector and comparison table pick it up automatically — no code changes

That's the whole point of this architecture.
