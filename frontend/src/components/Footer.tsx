export default function Footer() {
  return (
    <footer className="mt-20 border-t border-canvas-line bg-canvas-card/60">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="font-display text-[14.5px] font-semibold text-ink-950">
          Airbnb Room Type Predictor
        </p>
        <p className="mt-1.5 text-[12.5px] text-ink-500">
          Machine Learning • FastAPI • React • Random Forest
        </p>
        <p className="mt-3 text-[11.5px] text-ink-300">Built as a Machine Learning project</p>
      </div>
    </footer>
  );
}
