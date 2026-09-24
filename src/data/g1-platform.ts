/**
 * Shared G1 Platform specifications — what all three variants have in common.
 * Single source of truth. Changing a number here updates every variant.
 *
 * Variant-specific differences live in g1-variants.ts.
 */

export interface PlatformStat {
  label: { en: string; it: string };
  value: string;
  sub?: { en: string; it: string };
}

/** The 6 headline numbers shown in the platform tech section. */
export const PLATFORM_STATS: PlatformStat[] = [
  {
    label: { en: "City range", it: "Autonomia in città" },
    value: "150 km",
    sub: { en: "WMTC standard", it: "Standard WMTC" },
  },
  {
    label: { en: "Top speed", it: "Velocità massima" },
    value: "130 km/h",
    sub: { en: "Sustained", it: "Sostenuta" },
  },
  {
    label: { en: "Two-up payload", it: "Portata in due" },
    value: "190 kg",
    sub: { en: "Best in class", it: "Best in class" },
  },
  {
    label: { en: "Full charge", it: "Ricarica completa" },
    value: "3.2 h",
    sub: { en: "Standard outlet", it: "Presa standard" },
  },
  {
    label: { en: "Removable batteries", it: "Batterie rimovibili" },
    value: "2 × 3.0 kWh",
    sub: { en: "NMC chemistry", it: "Chimica NMC" },
  },
  {
    label: { en: "Warranty", it: "Garanzia" },
    value: "2 + 3 yr",
    sub: { en: "Motorcycle + battery", it: "Moto + batteria" },
  },
];

/** Platform capabilities — these never change between variants. */
export interface PlatformCapability {
  id: string;
  icon: string;
  title: { en: string; it: string };
  description: { en: string; it: string };
  image?: string;
}

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    id: "dual-battery",
    icon: "⚡",
    title: { en: "Removable dual battery", it: "Doppia batteria rimovibile" },
    description: {
      en: "Two 3.0 kWh packs you can lift out and charge anywhere. No 100 kg motorcycle to wrestle up the stairs.",
      it: "Due pacchi da 3.0 kWh estraibili. Niente moto da 100 kg da portare su per le scale.",
    },
    image: "/tech/10_EVERYDAY.png",
  },
  {
    id: "display",
    icon: "◷",
    title: { en: "5\" 4G connected display", it: "Display 5\" 4G connesso" },
    description: {
      en: "Wireless Apple CarPlay and Android Auto. Built-in 4G. Always navigation, always music, always connected.",
      it: "Apple CarPlay e Android Auto wireless. 4G integrato. Sempre navigazione, sempre musica.",
    },
    image: "/tech/hero.png",
  },
  {
    id: "keyless",
    icon: "★",
    title: { en: "Keyless unlock", it: "Sblocco senza chiave" },
    description: {
      en: "Bike unlocks as you approach with your phone or watch. Remote lock from the GR1T app.",
      it: "La moto si sblocca al tuo avvicinamento con telefono o smartwatch.",
    },
    image: "/tech/03_SMART-TECH.png",
  },
  {
    id: "cameras",
    icon: "◉",
    title: { en: "Front + rear cameras", it: "Telecamere ant. + post." },
    description: {
      en: "Continuous loop recording, optional cloud storage. Rider-facing camera activates if the bike is moved without your key.",
      it: "Registrazione continua, archiviazione cloud opzionale. La telecamera rivolta al pilota si attiva senza chiave.",
    },
    image: "/tech/05_CAMERAS.png",
  },
  {
    id: "storage",
    icon: "▣",
    title: { en: "9L under-seat storage", it: "Vano sottosella 9L" },
    description: {
      en: "Backpack, charger, helmet liner. Real-life space. Not just for spec sheets.",
      it: "Zaino, caricatore, sottocasco. Spazio reale, non solo da scheda tecnica.",
    },
    image: "/tech/07_EVERYDAY.png",
  },
  {
    id: "belt-drive",
    icon: "◯",
    title: { en: "Silent belt drive", it: "Trasmissione a cinghia silenziosa" },
    description: {
      en: "No chain, no grease, no rattle. Built to last with effectively zero maintenance.",
      it: "Niente catena, niente grasso, niente rumore. Manutenzione praticamente zero.",
    },
    image: "/tech/13_CRAFTED.png",
  },
];
