import type { RoomType } from "../types/property";
import { IconHome } from "./icons";

const ROOM_PATHS: Record<string, string> = {
  "Entire home/apt": "M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-7.5Z",
  "Private room":
    "M4 20V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v14M4 20h14M9 12h1M18 20V9l3 1v10",
  "Shared room":
    "M8 20v-3a3 3 0 0 1 6 0v3M8 20H5v-2a3 3 0 0 1 3-3M16 20h3v-2a3 3 0 0 0-3-3M9 8.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z",
  "Hotel room":
    "M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h5v5M9 12h.01M14 12h.01M9 9h.01M14 9h.01",
};

interface PredictionResultProps {
  prediction: RoomType | string;
  onReset: () => void;
}

export default function PredictionResult({ prediction, onReset }: PredictionResultProps) {
  const path = ROOM_PATHS[prediction] ?? ROOM_PATHS["Entire home/apt"];

  return (
    <div className="animate-pop flex flex-col items-center text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-signal-green/40 animate-ring" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-signal-green/10 text-signal-green">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d={path} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-signal-green">
        Prediction Result
      </p>
      <p className="mt-1.5 font-display text-[26px] font-semibold text-ink-950">{prediction}</p>

      <dl className="mt-6 grid w-full grid-cols-1 gap-3 border-t border-canvas-line pt-5 text-left sm:grid-cols-3">
        <div>
          <dt className="text-[11px] text-ink-500">Model</dt>
          <dd className="mt-0.5 text-[13px] font-medium text-ink-900">Random Forest Classifier</dd>
        </div>
        <div>
          <dt className="text-[11px] text-ink-500">Input Features</dt>
          <dd className="mt-0.5 text-[13px] font-medium text-ink-900">10 property features</dd>
        </div>
        <div>
          <dt className="text-[11px] text-ink-500">Inference</dt>
          <dd className="mt-0.5 text-[13px] font-medium text-ink-900">Real-time</dd>
        </div>
      </dl>

      <button
        onClick={onReset}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-canvas-line bg-white py-3 text-[14px] font-medium text-ink-700 transition-colors duration-150 hover:border-ink-300 hover:bg-canvas-sunk"
      >
        <IconHome className="h-4 w-4" />
        Run Another Prediction
      </button>
    </div>
  );
}
