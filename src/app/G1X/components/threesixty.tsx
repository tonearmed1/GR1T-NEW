"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// Static imports enable blur placeholders and faster decoding
import f1 from "../../../../public/mirageG1X/360/360_gradi_off road.1.1.png";
import f2 from "../../../../public/mirageG1X/360/360_gradi_off road.1.2.png";
import f3 from "../../../../public/mirageG1X/360/360_gradi_off road.1.3.png";
import f4 from "../../../../public/mirageG1X/360/360_gradi_off road.1.4.png";
import f5 from "../../../../public/mirageG1X/360/360_gradi_off road.1.5.png";
import f6 from "../../../../public/mirageG1X/360/360_gradi_off road.1.6.png";
import f7 from "../../../../public/mirageG1X/360/360_gradi_off road.1.7.png";
import f8 from "../../../../public/mirageG1X/360/360_gradi_off road.1.8.png";
import f9 from "../../../../public/mirageG1X/360/360_gradi_off road.1.9.png";
import f10 from "../../../../public/mirageG1X/360/360_gradi_off road.1.10.png";
import f11 from "../../../../public/mirageG1X/360/360_gradi_off road.1.11.png";
import f12 from "../../../../public/mirageG1X/360/360_gradi_off road.1.12.png";
import f13 from "../../../../public/mirageG1X/360/360_gradi_off road.1.13.png";
import f14 from "../../../../public/mirageG1X/360/360_gradi_off road.1.14.png";
import f15 from "../../../../public/mirageG1X/360/360_gradi_off road.1.15.png";
import f16 from "../../../../public/mirageG1X/360/360_gradi_off road.1.16.png";
import f17 from "../../../../public/mirageG1X/360/360_gradi_off road.1.17.png";
import f18 from "../../../../public/mirageG1X/360/360_gradi_off road.1.18.png";
import f19 from "../../../../public/mirageG1X/360/360_gradi_off road.1.19.png";
import f20 from "../../../../public/mirageG1X/360/360_gradi_off road.1.20.png";
import f21 from "../../../../public/mirageG1X/360/360_gradi_off road.1.21.png";
import f22 from "../../../../public/mirageG1X/360/360_gradi_off road.1.22.png";
import f23 from "../../../../public/mirageG1X/360/360_gradi_off road.1.23.png";
import f24 from "../../../../public/mirageG1X/360/360_gradi_off road.1.24.png";
import f25 from "../../../../public/mirageG1X/360/360_gradi_off road.1.25.png";
import f26 from "../../../../public/mirageG1X/360/360_gradi_off road.1.26.png";
import f27 from "../../../../public/mirageG1X/360/360_gradi_off road.1.27.png";
import f28 from "../../../../public/mirageG1X/360/360_gradi_off road.1.28.png";
import f29 from "../../../../public/mirageG1X/360/360_gradi_off road.1.29.png";
import f30 from "../../../../public/mirageG1X/360/360_gradi_off road.1.30.png";
import f31 from "../../../../public/mirageG1X/360/360_gradi_off road.1.31.png";

const FRAME_COUNT = 31; // number of images available in /public/mirage/360

const ThreesixtyG1X = () => {
  const { t } = useLanguage();
  // Build image paths once
  const frames: StaticImageData[] = useMemo(
    () => [
      f1,
      f2,
      f3,
      f4,
      f5,
      f6,
      f7,
      f8,
      f9,
      f10,
      f11,
      f12,
      f13,
      f14,
      f15,
      f16,
      f17,
      f18,
      f19,
      f20,
      f21,
      f22,
      f23,
      f24,
      f25,
      f26,
      f27,
      f28,
      f29,
      f30,
      f31,
    ],
    []
  );

  // Derive count from actual frames to avoid out-of-bounds
  const frameCount = frames.length;

  const [index, setIndex] = useState(0);
  // Guard against invalid indices that could lead to empty src
  const safeIndex = index >= 0 && index < frameCount ? index : 0;

  // Crossfade support: track previous and current displayed indices
  const [displayIndex, setDisplayIndex] = useState(safeIndex);
  const [prevDisplayIndex, setPrevDisplayIndex] = useState(safeIndex);

  useEffect(() => {
    if (index !== displayIndex) {
      setPrevDisplayIndex(displayIndex);
      setDisplayIndex(index);
    }
  }, [index, displayIndex]);

  // Clamp the crossfade indices to valid bounds
  const safeDisplayIndex = displayIndex >= 0 && displayIndex < frameCount ? displayIndex : 0;
  const safePrevDisplayIndex = prevDisplayIndex >= 0 && prevDisplayIndex < frameCount ? prevDisplayIndex : 0;
  const dragRef = useRef<{ dragging: boolean; startX: number; startIndex: number; pointerId: number | null }>({
    dragging: false,
    startX: 0,
    startIndex: 0,
    pointerId: null,
  });
  const loadedSet = useRef<Set<number>>(new Set());

  const preload = useCallback(
    (i: number) => {
      if (typeof window === "undefined") return;
      // Bounds check to prevent accessing undefined frames
      if (i < 0 || i >= frameCount) return;
      if (loadedSet.current.has(i)) return;
      const img = new window.Image();
      img.src = frames[i].src;
      loadedSet.current.add(i);
    },
    [frames, frameCount]
  );

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(0, Math.min(frameCount - 1, Number(e.target.value)));
    setIndex(v);
  };

  // Simple drag-to-rotate over the image area
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragRef.current.dragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startIndex = index;
      dragRef.current.pointerId = e.pointerId;
      // Capture pointer to keep receiving events even if it leaves the element
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    },
    [index]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.dragging) return;
      e.preventDefault();
      const deltaX = e.clientX - dragRef.current.startX;
      // Adjust sensitivity: bigger divisor = slower rotation
      const sensitivity = 4;
      // Invert direction: dragging right advances frames visually to the right
      const steps = Math.round(deltaX / sensitivity);
      const next = (dragRef.current.startIndex - steps + frameCount) % frameCount;
      // Avoid redundant state updates to reduce jitter
      setIndex((prev) => (prev === next ? prev : next));
    },
    [frameCount]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = false;
    // Release captured pointer
    if (dragRef.current.pointerId !== null) {
      try {
        e.currentTarget.releasePointerCapture(dragRef.current.pointerId);
      } catch {}
      dragRef.current.pointerId = null;
    }
  }, []);

  // Warm preload: initial neighbors, then queue the rest progressively
  useEffect(() => {
    // Preload initial neighborhood for instant rotation feel
    if (frameCount === 0) return;
    const radius = 4;
    for (let r = 0; r <= radius; r++) {
      const a = (0 + r) % frameCount;
      const b = (0 - r + frameCount) % frameCount;
      preload(a);
      preload(b);
    }

    // Progressive queue for remaining frames (spaced to avoid burst)
    const remaining: number[] = [];
    for (let i = 0; i < frameCount; i++) {
      if (!loadedSet.current.has(i)) remaining.push(i);
    }
    remaining.forEach((i, idx) => {
      window.setTimeout(() => preload(i), 80 * idx);
    });
  }, [preload, frameCount]);

  // As the index changes, keep neighbors preloaded
  useEffect(() => {
    if (frameCount === 0) return;
    const neighborRadius = 3;
    for (let r = 1; r <= neighborRadius; r++) {
      const a = (index + r) % frameCount;
      const b = (index - r + frameCount) % frameCount;
      preload(a);
      preload(b);
    }
  }, [index, preload, frameCount]);

  return (
    <section className="bg-black text-white py-8 sm:py-10">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        {/* Stats row placeholder (optional) */}
        <div className="grid grid-cols-3 sm:grid-cols-[repeat(6,auto)] gap-3 mb-6 sm:mb-8 items-center">
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">150 km</div>
            <div className="text-sm text-gray-300 text-left">{t("g1x.stats.rangeLabel")}</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">130 km/h</div>
            <div className="text-sm text-gray-300 text-left">{t("g1x.stats.topSpeedLabel")}</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">190 kg</div>
            <div className=" text-nowrap text-sm text-gray-300 text-left">{t("g1x.stats.carryingCapacityLabel")}</div>
          </div>
          <div className="pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">11kW</div>
            <div className="text-nowrap text-sm text-gray-300 text-left">{t("g1x.stats.nominalPowerLabel")}</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">36 hp</div>
            <div className="text-sm text-gray-300 text-left">{t("g1x.stats.peakPowerLabel")}</div>
          </div>

          <div className="pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">2</div>
            <div className="text-nowrap text-sm text-gray-300 text-left">{t("g1x.stats.removableBatteriesLabel")}</div>
          </div>
        </div>

        {/* Viewer */}
        <div
          className="relative w-full h-[360px] sm:h-[480px] lg:h-[600px] xl:h-[640px] select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Previous frame fades out */}
            <Image
              src={frames[safePrevDisplayIndex]}
              alt={`G1X 360 previous frame ${safePrevDisplayIndex + 1}`}
              fill
              className="object-contain opacity-0 transition-opacity duration-150"
              priority
              placeholder="blur"
              quality={30}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1400px"
              style={{ transform: "scale(1.35)", transformOrigin: "50% 50%", willChange: "opacity" }}
            />
            {/* Current frame fades in */}
            <Image
              src={frames[safeDisplayIndex]}
              alt={`G1S 360 frame ${safeDisplayIndex + 1}`}
              fill
              className="object-contain opacity-100 transition-opacity duration-150"
              priority
              placeholder="blur"
              quality={30}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1400px"
              style={{ transform: "scale(1.35)", transformOrigin: "50% 50%", willChange: "opacity" }}
            />
          </div>

          {/* Elliptical rings for depth */}
          <div className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[75%] lg:w-[65%]">
            <div className="mx-auto h-full sm:h-55 lg:h-32  " />
            <div className="mx-auto h-full sm:h-55 lg:h-32  " />
            <div className="mx-auto -mt-6 h-20 sm:h-24 lg:h-28 " />
            <div className="mx-auto -mt-5 h-16 sm:h-20 lg:h-24 " />
          </div>

          {/* Navigation Arrows */}
          {/* <button 
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = (index - 1 + frameCount) % frameCount;
              setIndex(newIndex);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 focus:outline-none transition-colors z-10"
            aria-label="Previous view"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </button> */}

          {/* <button 
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = (index + 1) % frameCount;
              setIndex(newIndex);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 focus:outline-none transition-colors z-10"
            aria-label="Next view"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button> */}
        </div>

        {/* Slider control */}
        <div className="mt-4 flex items-center justify-center group">
          <input
            type="range"
            min={0}
            max={frameCount - 1}
            step={1}
            value={index}
            onChange={onSliderChange}
            aria-label="Rotate G1S"
            className="mirage-slider w-[92%] sm:w-[75%] lg:w-[65%] appearance-none h-3 rounded outline-none"
          />
        </div>
        <style jsx>{`
          .mirage-slider {
            accent-color: #ffffff;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.3);
            border-radius: 9999px;
            transition: transform 200ms ease;
          }
          .group:hover .mirage-slider {
            transform: rotateX(8deg);
            transform-origin: center;
          }
          .mirage-slider::-webkit-slider-runnable-track {
            height: 12px;
            border-radius: 9999px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06));
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          .mirage-slider::-moz-range-track {
            height: 12px;
            border-radius: 9999px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06));
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          .mirage-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #ffffff, #dcdcdc);
            border: 1px solid rgba(255, 255, 255, 0.35);
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45), inset 0 -2px 4px rgba(0, 0, 0, 0.25);
            transition: transform 150ms ease, box-shadow 150ms ease;
            transform: translateZ(0);
            margin-top: -5px; /* Center thumb on track */
          }
          .mirage-slider:active::-webkit-slider-thumb {
            transform: translateZ(8px) scale(1.04);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.55), inset 0 -2px 5px rgba(0, 0, 0, 0.3);
          }
          .mirage-slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #ffffff, #dcdcdc);
            border: 1px solid rgba(255, 255, 255, 0.35);
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45), inset 0 -2px 4px rgba(0, 0, 0, 0.25);
            transition: transform 150ms ease, box-shadow 150ms ease;
            transform: translateZ(0);
          }
          .mirage-slider:active::-moz-range-thumb {
            transform: translateZ(8px) scale(1.04);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.55), inset 0 -2px 5px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    </section>
  );
};

export default ThreesixtyG1X;
