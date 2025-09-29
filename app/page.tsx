import { WaitlistForm } from "@/components/waitlist-form"

export default function Page() {
  return (
    <main className="bg-hero text-hero-foreground h-screen relative overflow-hidden flex flex-col">
      <div className="light-spot" aria-hidden="true" />
      <div className="light-spot-br" aria-hidden="true" />

      <section className="px-6 flex-grow flex items-center justify-center">
        <div className="mx-auto max-w-3xl w-full">
          <div className="glass-strong rounded-2xl p-6 md:p-8 relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs shadow-[0_4px_16px_-6px_rgba(0,0,0,0.5)]">
              <span className="font-mono opacity-95">Early Access</span>
              <span className="opacity-90">Join the waitlist</span>
            </div>

            <h1 className="text-pretty text-4xl md:text-6xl font-semibold tracking-tight drop-shadow-lg">
              Unlock personalized shopping with Shoppit's AI.
            </h1>
            <p className="mt-4 md:mt-5 text-balance text-sm md:text-base opacity-95">
              Be the first to experience a smarter way to shop. Our AI finds products you'll love, tailored just for you.
            </p>

            <div className="mt-8 md:mt-10">
              <WaitlistForm />
              <p className="mt-3 text-xs opacity-90">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className=" pb-8">
        <div className="mx-auto border-t border-white/20 pt-6 opacity-85 text-xs text-center">
          © {new Date().getFullYear()} Shoppit. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
