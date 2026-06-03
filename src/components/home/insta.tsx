"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/insta/DSC09277.webp", caption: "" },
  { src: "/insta/DSC09786.webp", caption: "" },
  { src: "/insta/582524486_17969954885975835_4701173643443028079_n.jpeg", caption: "" },
  { src: "/insta/583038479_17969954717975835_5830481309611677992_n.jpeg", caption: "" },
  { src: "/insta/583288409_17969954726975835_5105729800801945357_n.jpeg", caption: "" },
  { src: "/insta/575707898_17968953869975835_3799456203592499690_n.webp", caption: "" },
  { src: "/insta/579640737_17968953809975835_8771644436581467461_n.webp", caption: "" },
];

const Insta = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");
  const at = (offset: number) => slides[(current + offset) % slides.length];

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start">
          <div>
            <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={at(0).src}
                alt={`Instagram ${pad(current + 1)}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="mt-3 text-sm text-black">{/* {pad(current + 1)} {at(0).caption} */}</div>
          </div>

          <div className="flex flex-col gap-6 items-start justify-start">
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
              Follow us
              <br />
              on Instagram
            </div>

            <div className="flex items-center gap-3 mt-6 sm:mt-3">
              <Link
                href="https://www.instagram.com/grit.motorcycles"
                target="_blank"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
              >
                +
              </Link>
              <button
                type="button"
                onClick={prev}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-black text-black flex items-center justify-center"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-black text-black flex items-center justify-center"
                aria-label="Next"
              >
                →
              </button>
            </div>
            <div className="relative w-full h-[160px] sm:h-[200px] lg:h-[240px] rounded-2xl overflow-hidden">
              <Image
                src={at(1).src}
                alt={`Instagram ${pad(current + 2)}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="mt-3 text-sm text-black">{/* {pad(current + 2)} {at(1).caption} */}</div>
          </div>

          <div className="w-full">
            <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={at(2).src}
                alt={`Instagram ${pad(current + 3)}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-3 text-sm text-black">{/* {pad(current + 3)} {at(2).caption} */}</div>
          </div>

          <div className="w-full">
            <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={at(3).src}
                alt={`Instagram ${pad(current + 4)}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-3 text-sm text-black">{/* {pad(current + 4)} {at(3).caption} */}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insta;
