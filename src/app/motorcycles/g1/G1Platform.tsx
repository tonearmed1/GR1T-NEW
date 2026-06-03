"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ModelKey = "street" | "scrambler" | "raider";

interface ModelData {
  name: string;
  price: string;
  desc: string;
  href: string;
  img: string;
}

const MODELS: Record<ModelKey, ModelData> = {
  street: {
    name: "G1S Street",
    price: "€7,000",
    desc: "Urban. Refined. Everyday freedom.",
    href: "/G1S",
    img: "/grit-g1/hero.jpg",
  },
  scrambler: {
    name: "G1X Scrambler",
    price: "€8,000",
    desc: "Versatile. Explorative. Off-road capable.",
    href: "/G1X",
    img: "/grit-g1x/hero.jpg",
  },
  raider: {
    name: "G1XR Raider",
    price: "€9,000",
    desc: "Purposeful. Capable. Built for adventure.",
    href: "/G1XR",
    img: "/grit-g1/hero.jpg",
  },
};

const MODEL_TABS: { key: ModelKey; label: string }[] = [
  { key: "street", label: "G1S STREET" },
  { key: "scrambler", label: "G1X SCRAMBLER" },
  { key: "raider", label: "G1XR RAIDER" },
];

type FeaturePanelKey = "batteries" | "storage" | "cockpit" | "security" | "passenger" | "payload";

interface FeaturePanel {
  num: string;
  title: string;
  desc: string;
  bg: string;
  textColor: string;
}

const FEATURE_PANELS: Record<FeaturePanelKey, FeaturePanel> = {
  batteries: { num: "01", title: "Dual Removable Batteries", desc: "The heart of the G1. Two 3kWh batteries that slide out with a simple click. Charge anywhere.", bg: "bg-black", textColor: "text-white" },
  storage: { num: "02", title: "Hidden Storage", desc: "Secure, weather-proof compartment for essentials without breaking the G1's silhouette.", bg: "bg-surface-container", textColor: "text-black" },
  cockpit: { num: "03", title: "Smart Cockpit", desc: "Native Apple CarPlay and Android Auto. High-definition display for navigation and media.", bg: "bg-surface-alt", textColor: "text-black" },
  security: { num: "04", title: "Security & Cameras", desc: "360° awareness with integrated cameras. GPS tracking and remote monitoring via app.", bg: "bg-technical-grey", textColor: "text-white" },
  passenger: { num: "05", title: "Passenger Ready", desc: "Reinforced subframe and ergonomic pillion position for comfort and safety with a passenger.", bg: "bg-white", textColor: "text-black" },
  payload: { num: "06", title: "190 kg Payload", desc: "Built for more than just the rider. Engineered for heavy-duty daily use and luggage.", bg: "bg-surface-container-low", textColor: "text-black" },
};

const FINISH_CARDS = [
  { name: "Stealth Black", subtitle: "Matte Powder Coat", img: "/grit-g1/hero.jpg" },
  { name: "Technical Grey", subtitle: "Satin Finish", img: "/grit-g1x/hero.jpg" },
  { name: "Forest Green", subtitle: "Deep Earth Tone", img: "/grit-g1/hero.jpg" },
];

const ECOSYSTEM_CARDS = [
  { title: "Passenger Setup", subtitle: "Comfort for two.", img: "/grit-g1/hero.jpg" },
  { title: "Touring Kit", subtitle: "Long range comfort.", img: "/grit-g1x/hero.jpg" },
  { title: "Rear Rack System", subtitle: "Everyday practicality.", img: "/grit-g1/hero.jpg" },
  { title: "Urban Utility Pack", subtitle: "Storage and carrying solutions for daily life.", img: "/grit-g1x/hero.jpg" },
];

const TESTIMONIALS = [
  { quote: "The design stopped me in my tracks.", source: "EICMA Visitor" },
  { quote: "Exactly what urban electric motorcycles should be.", source: "Industry Journalist" },
  { quote: "The removable batteries solve a real problem.", source: "Test Rider" },
];

const TECH_SPECS = [
  { label: "Nominal Power", value: "11 kW" },
  { label: "Top Speed", value: "130 km/h" },
  { label: "WMTC Range", value: "150 km" },
  { label: "Battery Capacity", value: "6 kWh (Dual)" },
  { label: "Max Payload", value: "190 kg" },
  { label: "Curb Weight", value: "127 kg" },
  { label: "Connectivity", value: "CarPlay / Android Auto" },
];

const FAQ_TOPICS = [
  { title: "Battery & Charging", desc: "Learn about charging speeds, range, and battery health." },
  { title: "Ownership", desc: "Details on servicing, maintenance, and the app ecosystem." },
  { title: "Licensing", desc: "Which driver's license categories apply to the G1 Series." },
  { title: "Warranty", desc: "Comprehensive coverage for your peace of mind." },
  { title: "Deliveries", desc: "Estimated timelines and regional availability." },
  { title: "Performance", desc: "Top speeds, power curves, and riding modes explained." },
];

const PLATFORM_STATS = [
  { value: "6", unit: "kWh", label: "Dual Removable Batteries" },
  { value: "11", unit: "kW", label: "Nominal Power Output" },
  { value: "130", unit: "km/h", label: "Top Motorway Speed" },
  { value: "190", unit: "kg", label: "Maximum Payload" },
];

export default function G1Platform({ initialVariant }: { initialVariant: string }) {
  const [activeModel, setActiveModel] = useState<ModelKey>(
    initialVariant === "scrambler" ? "scrambler" : initialVariant === "raider" ? "raider" : "street"
  );
  const [activePanel, setActivePanel] = useState<FeaturePanelKey>("batteries");

  const model = MODELS[activeModel];

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 bg-white overflow-hidden">
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 md:px-20 flex flex-col items-center text-center">
          <h1 className="font-britti font-bold text-[40px] md:text-[90px] leading-tight text-black mb-8 tracking-tight">
            The G1 Series.<br />Three Characters. One DNA.
          </h1>
          {/* Selector pills */}
          <div className="flex flex-wrap justify-center gap-1 mb-12 p-1.5 bg-surface-container rounded-full">
            {MODEL_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveModel(tab.key)}
                className={`px-10 py-3.5 rounded-full text-sm font-medium transition-all ${
                  activeModel === tab.key
                    ? "bg-black text-white"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Bike image */}
          <div className="relative w-full max-w-7xl aspect-[16/9] mb-8">
            <Image
              src={model.img}
              alt={model.name}
              fill
              className="object-contain scale-110"
            />
          </div>
          {/* Model info */}
          <div className="flex flex-col items-center max-w-2xl transition-all duration-700">
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-4xl font-semibold">{model.name}</h2>
              <span className="text-3xl font-bold text-grit-orange">{model.price}</span>
            </div>
            <p className="text-lg text-outline mb-8">{model.desc}</p>
            <div className="flex gap-4">
              <Link href="/checkout" className="bg-black text-white px-12 py-5 text-sm font-medium uppercase tracking-widest hover:bg-grit-orange transition-all duration-300">
                Reserve Yours
              </Link>
              <Link href={model.href} className="border border-outline text-black px-12 py-5 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                Explore Model
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONALISATION ── */}
      <section className="py-32 px-5 md:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mb-20">
            <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Personalisation</span>
            <h2 className="font-britti font-bold text-4xl md:text-5xl mb-6">Uniquely Yours.</h2>
            <p className="text-lg text-outline">Choose from curated finishes, accessory packages and bespoke commissions to create a motorcycle that reflects your personality and riding style.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FINISH_CARDS.map((card) => (
              <div key={card.name} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-6 relative">
                  <Image
                    src={card.img}
                    alt={card.name}
                    fill
                    className="object-contain grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-125"
                  />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">{card.name}</h3>
                <p className="text-xs text-outline uppercase tracking-widest">{card.subtitle}</p>
              </div>
            ))}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-grit-orange/10 overflow-hidden mb-6">
                <div className="w-full h-full flex items-center justify-center p-10 text-center border-2 border-grit-orange/20 hover:border-grit-orange/50 transition-all">
                  <div>
                    <h3 className="text-sm font-bold text-grit-orange uppercase tracking-widest">Bespoke Commission</h3>
                    <p className="text-xs text-grit-orange/70 uppercase mt-2 tracking-widest">Limitless possibilities</p>
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Consult Our Studio</h3>
              <p className="text-xs text-outline uppercase tracking-widest">Custom Tailored Editions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM SCROLL ── */}
      <section className="py-32 bg-surface-container-low overflow-hidden">
        <div className="px-5 md:px-20 mb-16 flex justify-between items-end max-w-[1440px] mx-auto">
          <div className="max-w-2xl">
            <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Ecosystem</span>
            <h2 className="font-britti font-bold text-4xl md:text-5xl">One Platform. Multiple Possibilities.</h2>
            <p className="text-lg text-outline mt-6">From daily commuting to weekend escapes, explore premium equipment packages designed to match the way you ride.</p>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-10 px-5 md:px-20" style={{ scrollbarWidth: "none" }}>
          {ECOSYSTEM_CARDS.map((card) => (
            <div key={card.title} className="min-w-[400px] md:min-w-[500px] bg-white group relative overflow-hidden shadow-sm flex-shrink-0">
              <div className="h-[400px] overflow-hidden relative">
                <Image src={card.img} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                <p className="text-sm text-outline uppercase tracking-widest">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE PANELS ── */}
      <section className="bg-white">
        <div className="px-5 md:px-20 py-24 max-w-[1440px] mx-auto text-center">
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Interaction</span>
          <h2 className="font-britti font-bold text-4xl md:text-5xl">Real Life. Thought Through.</h2>
        </div>
        <div className="flex flex-col lg:flex-row h-auto lg:h-[800px] w-full overflow-hidden border-t border-b border-outline-variant">
          {(Object.keys(FEATURE_PANELS) as FeaturePanelKey[]).map((key, i) => {
            const panel = FEATURE_PANELS[key];
            const isActive = activePanel === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setActivePanel(key)}
                onClick={() => setActivePanel(key)}
                className={`relative flex flex-col justify-end p-12 overflow-hidden group cursor-pointer border-r border-outline-variant/20 transition-all duration-700 ${panel.bg} ${panel.textColor} ${isActive ? "lg:flex-[45] flex-[6]" : "lg:flex-[15] flex-[2]"} min-w-[80px]`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative z-10">
                  <span className="text-grit-orange text-xs mb-4 block tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl md:text-4xl leading-tight mb-4 font-semibold whitespace-nowrap overflow-hidden">{panel.title}</h3>
                  <div className={`transition-all duration-700 overflow-hidden ${isActive ? "opacity-100 max-h-40" : "opacity-0 max-h-0"}`}>
                    <p className="text-sm opacity-80 max-w-md">{panel.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PLATFORM DNA ── */}
      <section className="py-32 px-5 md:px-20 bg-black text-white">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-6 block">The Foundation</span>
            <h2 className="font-britti font-bold text-4xl md:text-5xl mb-8">One Platform. Shared DNA.</h2>
            <p className="text-lg text-on-primary-container mb-12 max-w-lg leading-relaxed">
              Every G1 shares the same lightweight architecture, removable battery system and connected technology platform. Three distinct personalities. One engineering philosophy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-16">
              {PLATFORM_STATS.map((s) => (
                <div key={s.label} className="space-y-2">
                  <p className="text-3xl font-bold">{s.value} <span className="text-sm uppercase text-grit-orange">{s.unit}</span></p>
                  <p className="text-xs text-on-primary-container uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3]">
            <Image src="/grit-g1/hero.jpg" alt="G1 Platform" fill className="object-contain brightness-90 contrast-125" />
          </div>
        </div>
      </section>

      {/* ── MOTOR VALLEY ── */}
      <section className="py-32 px-5 md:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/grit-g1/hero.jpg" alt="Motor Valley Factory" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-6 block">Legacy & Innovation</span>
              <h2 className="font-britti font-bold text-4xl md:text-5xl mb-8 leading-tight">Designed and Engineered in Italy&apos;s Motor Valley.</h2>
              <p className="text-lg text-outline mb-10 leading-relaxed">Built in the heart of one of the world&apos;s most respected motorcycle regions, where design, engineering and riding culture come together.</p>
              <Link href="/about-us" className="border-b-2 border-black pb-1 text-sm font-medium uppercase tracking-widest hover:text-grit-orange hover:border-grit-orange transition-all w-fit">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-5 md:px-20 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-britti font-bold text-4xl md:text-5xl mb-16 text-center">What Riders Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.source} className="bg-white p-10 border border-outline-variant/30 flex flex-col justify-between">
                <p className="text-lg italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-grit-orange uppercase tracking-widest">— {t.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH SPECS ── */}
      <section className="py-32 px-5 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-britti font-bold text-4xl md:text-5xl mb-16 text-center">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-outline-variant">
            {TECH_SPECS.map((spec, i) => (
              <div key={spec.label} className={`py-8 border-b border-outline-variant flex justify-between items-center ${i === TECH_SPECS.length - 1 ? "md:col-span-2" : ""}`}>
                <span className="text-xs text-on-surface-variant uppercase tracking-widest">{spec.label}</span>
                <span className="text-lg font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="border border-black px-12 py-5 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              Download Full Spec Sheet
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ CENTRE ── */}
      <section className="py-32 px-5 md:px-20 bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-britti font-bold text-4xl md:text-5xl mb-16 text-center">FAQ Centre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {FAQ_TOPICS.map((faq) => (
              <Link key={faq.title} href="/faqs" className="group p-8 bg-white border border-outline-variant/30 hover:border-grit-orange transition-all">
                <h3 className="text-sm font-medium uppercase tracking-widest mb-4 group-hover:text-grit-orange transition-colors">{faq.title}</h3>
                <p className="text-sm text-outline">{faq.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faqs" className="bg-black text-white px-12 py-5 text-sm font-medium uppercase tracking-widest hover:bg-grit-orange transition-all inline-block">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/grit-g1/hero.jpg" alt="Reserve Your G1" fill className="object-cover scale-105" />
        <div className="relative z-20 text-center text-white px-5 max-w-5xl mx-auto">
          <h2 className="font-britti font-bold text-[40px] md:text-[80px] leading-tight mb-8 tracking-tight">
            Become Part Of The Founding Generation.
          </h2>
          <p className="text-lg mb-12 text-on-primary-container max-w-2xl mx-auto opacity-90">
            Reserve your place among the first riders to experience the G1 Series.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/checkout" className="bg-grit-orange text-white px-14 py-6 text-sm font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
              Reserve Your G1
            </Link>
            <Link href="/contact" className="border border-white/50 text-white px-14 py-6 text-sm font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-500">
              Join the Mailing List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
