export default function CancelPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Payment canceled</h1>
        <p className="mt-2 text-base text-black/80">You have canceled checkout. No payment was taken.</p>
        <div className="mt-8">
          <a href="/checkout" className="inline-block rounded-full bg-black px-5 py-3 text-white">Return to checkout</a>
        </div>
      </div>
    </div>
  );
}