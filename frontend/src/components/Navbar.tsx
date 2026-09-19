import type { ApiStatus } from "../hooks/useApiStatus";

const STATUS_COPY: Record<ApiStatus, { label: string; dot: string; text: string }> = {
  checking: { label: "Checking", dot: "bg-ink-300", text: "text-ink-500" },
  online: { label: "API Online", dot: "bg-signal-green", text: "text-signal-green" },
  offline: { label: "API Offline", dot: "bg-signal-red", text: "text-signal-red" },
};

const LINKS = [
  { href: "#predict", label: "Prediction" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#model", label: "Model" },
];

export default function Navbar({ status }: { status: ApiStatus }) {
  const copy = STATUS_COPY[status];

  return (
    <header className="sticky top-0 z-30 border-b border-canvas-line/80 bg-canvas/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 text-[17px]">
            🏠
          </span>
          <div className="flex items-center gap-2">
            <span className="font-display text-[16px] font-semibold text-ink-950">Airbnb Predictor</span>
            <span className="rounded-md bg-cobalt-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-cobalt-600">
              AI / ML
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-ink-500 transition-colors hover:text-ink-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className={`flex items-center gap-2 rounded-full border border-canvas-line bg-white px-3 py-1.5 text-[12.5px] font-medium ${copy.text}`}
        >
          <span className={`h-2 w-2 rounded-full ${copy.dot} ${status === "online" ? "animate-pulseDot" : ""}`} />
          {copy.label}
        </div>
      </div>
    </header>
  );
}
