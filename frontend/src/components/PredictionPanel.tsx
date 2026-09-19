import PredictionResult from "./PredictionResult";
import type { RoomType } from "../types/property";

export type PredictionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; prediction: RoomType | string }
  | { status: "error"; message: string };

interface PredictionPanelProps {
  state: PredictionState;
  canSubmit: boolean;
  onPredict: () => void;
  onReset: () => void;
}

export default function PredictionPanel({ state, canSubmit, onPredict, onReset }: PredictionPanelProps) {
  return (
    <section className="animate-rise sticky top-24 rounded-xl3 border border-canvas-line bg-gradient-to-b from-white to-canvas-sunk/60 p-6 shadow-panel sm:p-7">
      <h2 className="font-display text-[18px] font-semibold text-ink-950">AI Prediction</h2>

      <div className="mt-5 flex min-h-[280px] flex-col justify-center">
        {state.status === "idle" && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cobalt-50 text-cobalt-600">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-7.5Z" strokeLinejoin="round" />
                <path d="M14.5 9.5 16 8l1.5 1.5M16 8v2.2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="mt-4 font-display text-[16.5px] font-semibold text-ink-950">Ready to analyze</p>
            <p className="mt-1.5 max-w-[26ch] text-[13.5px] text-ink-500">
              Enter the property information and run the model.
            </p>
          </div>
        )}

        {state.status === "loading" && (
          <div className="flex flex-col items-center text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cobalt-100 border-t-cobalt-600" />
            <p className="mt-4 text-[13.5px] font-medium text-ink-700">Running inference…</p>
          </div>
        )}

        {state.status === "success" && (
          <PredictionResult prediction={state.prediction} onReset={onReset} />
        )}

        {state.status === "error" && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-red/10 text-signal-red">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <p className="mt-4 font-display text-[15.5px] font-semibold text-ink-950">Prediction failed</p>
            <p className="mt-1.5 max-w-[32ch] text-[13.5px] text-ink-500">{state.message}</p>
            <button
              onClick={onReset}
              className="mt-5 w-full rounded-lg border border-canvas-line bg-white py-3 text-[14px] font-medium text-ink-700 transition-colors duration-150 hover:border-ink-300 hover:bg-canvas-sunk"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {state.status === "idle" || state.status === "loading" ? (
        <button
          onClick={onPredict}
          disabled={!canSubmit || state.status === "loading"}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-cobalt-600 py-3.5 text-[14.5px] font-semibold text-white shadow-pop transition-all duration-150 hover:-translate-y-0.5 hover:bg-cobalt-700 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none"
        >
          {state.status === "loading" ? "Predicting…" : "Predict Room Type"}
          {state.status !== "loading" && (
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          )}
        </button>
      ) : null}
    </section>
  );
}
