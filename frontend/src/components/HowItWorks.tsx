const STEPS = [
  {
    n: "01",
    title: "Enter Details",
    body: "Provide location, price, availability and review information.",
  },
  {
    n: "02",
    title: "Process",
    body: "The preprocessing pipeline prepares categorical and numerical features.",
  },
  {
    n: "03",
    title: "Predict",
    body: "The trained Random Forest model predicts the Airbnb room type.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto mt-16 max-w-6xl scroll-mt-24 px-6">
      <div className="text-center">
        <h2 className="font-display text-[26px] font-semibold text-ink-950">How the AI Works</h2>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div
          className="absolute left-0 right-0 top-6 hidden h-px bg-canvas-line sm:block"
          style={{ marginInline: "16.6%" }}
          aria-hidden="true"
        />
        {STEPS.map((step) => (
          <div key={step.n} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-canvas-line bg-canvas-card font-mono text-[13px] font-semibold text-cobalt-600 shadow-card">
              {step.n}
            </span>
            <h3 className="mt-4 font-display text-[15.5px] font-semibold text-ink-950">{step.title}</h3>
            <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-relaxed text-ink-500">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
