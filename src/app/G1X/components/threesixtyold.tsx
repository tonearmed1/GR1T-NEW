"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";

// Static imports enable blur placeholders and faster decoding
import f1 from "../../../../public/mirageG1X/MAIN_image_MIRAGE-X.png";

const FRAME_COUNT = 1; // number of images available in /public/mirage/360

const Threesixty = () => {
  // Build image paths once
  const frames: StaticImageData[] = useMemo(() => [f1], []);

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
    <section className="bg-black text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Stats row placeholder (optional) */}
        <div className="grid grid-cols-3 sm:grid-cols-[repeat(6,auto)] gap-4 mb-8 sm:mb-12 items-center">
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">150 km</div>
            <div className="text-sm text-gray-300 text-left">Range</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">130 km/h</div>
            <div className="text-sm text-gray-300 text-left">Top Speed</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">190 kg</div>
            <div className=" text-nowrap text-sm text-gray-300 text-left">Carrying Capacity</div>
          </div>
          <div className="pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">11kW</div>
            <div className="text-nowrap text-sm text-gray-300 text-left">Nominal Power</div>
          </div>
          <div className="pr-4  last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">36 hp</div>
            <div className="text-sm text-gray-300 text-left">Peak Power</div>
          </div>

          <div className="pr-4 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-bold text-left">2</div>
            <div className="text-nowrap text-sm text-gray-300 text-left">Removable Batteries</div>
          </div>
        </div>

        {/* Viewer */}
        <div
          className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={frames[safeDisplayIndex]}
              alt={`G1X 360 frame ${safeDisplayIndex + 1}`}
              fill
              className="object-contain transition-opacity duration-150"
              priority
              placeholder="blur"
              quality={25}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 1000px"
              style={{
                transform: "scale(1)", // was 0.95 → make it full scale
                transformOrigin: "50% 50%",
                willChange: "opacity",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Threesixty;
