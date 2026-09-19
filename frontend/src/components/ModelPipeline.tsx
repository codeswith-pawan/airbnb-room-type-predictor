const STAGES = ["Property Data", "Preprocessing", "Random Forest Classifier", "Room Type Prediction"];

export default function ModelPipeline() {
  return (
    <section id="model" className="mx-auto mt-16 max-w-4xl scroll-mt-24 px-6">
      <div className="rounded-xl3 border border-canvas-line bg-canvas-card p-6 shadow-card sm:p-8">
        <h2 className="font-display text-[18px] font-semibold text-ink-950">Machine Learning Pipeline</h2>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-3">
          {STAGES.map((stage, i) => (
            <div key={stage} className="flex flex-col items-center gap-2 sm:flex-row sm:contents">
              <div className="w-full rounded-xl border border-canvas-line bg-canvas-sunk px-4 py-3 text-center sm:w-auto sm:flex-1">
                <p className="text-[13px] font-medium text-ink-900">{stage}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="flex-shrink-0 text-ink-300" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 rotate-90 sm:rotate-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-canvas-line pt-5">
          <span className="text-[13px] text-ink-500">Algorithm:</span>
          <span className="text-[13px] font-semibold text-ink-950">Random Forest Classifier</span>
        </div>
      </div>
    </section>
  );
}
