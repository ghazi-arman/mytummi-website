const STEPS = [
  { n: 1, title: "Log what you eat", body: "Search our product database, scan a barcode, or describe your meal in a sentence." },
  { n: 2, title: "Track how you feel", body: "Record symptoms as they happen — it only takes a few seconds." },
  { n: 3, title: "Discover your patterns", body: "See which food categories keep showing up before your symptoms." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-peach-soft px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-bold text-ink sm:text-5xl">How it works</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white">
                {step.n}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
