"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const paymentIntentId = params.get("payment_intent");
  const kioskMode = params?.get("kiosk") === "1";

  useEffect(() => {
    if (!kioskMode) return;
    const timer = window.setTimeout(() => {
      window.location.href = "/cta";
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [kioskMode]);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Payment successful</h1>
        <p className="mt-2 text-base text-black/80">Thank you — your reservation was received.</p>
        {(sessionId || paymentIntentId) && (
          <div className="mt-6 rounded-md border border-zinc-300 px-4 py-3">
            <div className="text-sm text-black/70">{sessionId ? "Checkout session" : "Payment Intent"}</div>
            <div className="text-base font-mono">{sessionId ?? paymentIntentId}</div>
          </div>
        )}
        <div className="mt-8">
          <Link href="/" className="inline-block rounded-full bg-black px-5 py-3 text-white">Return home</Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-black">
          <div className="mx-auto max-w-2xl px-6 py-16">Loading…</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}