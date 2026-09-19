import { IconBolt, IconLayers, IconSparkles } from "./icons";

const STATS = [
  { label: "Model", value: "Random Forest", icon: <IconLayers /> },
  { label: "Features", value: "10", icon: <IconSparkles /> },
  { label: "Prediction", value: "Real-time", icon: <IconBolt /> },
];

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-14 pt-16 text-center sm:pt-20">
      <span className="animate-rise inline-flex items-center gap-1.5 rounded-full border border-canvas-line bg-white px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-cobalt-600">
        AI-POWERED ROOM TYPE CLASSIFICATION
      </span>

      <h1
        className="animate-rise mt-5 text-balance font-display text-[36px] font-semibold leading-[1.12] text-ink-950 sm:text-[46px]"
        style={{ animationDelay: "60ms" }}
      >
        Predict the perfect Airbnb room type
      </h1>

      <p
        className="animate-rise mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-500"
        style={{ animationDelay: "110ms" }}
      >
        Enter property details and let our Random Forest model classify the most likely room type.
      </p>

      <div
        className="animate-rise mx-auto mt-9 grid max-w-xl grid-cols-3 gap-3"
        style={{ animationDelay: "160ms" }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl2 border border-canvas-line bg-white/70 px-4 py-4 shadow-card"
          >
            <div className="flex items-center justify-center gap-1.5 text-cobalt-600">{stat.icon}</div>
            <p className="mt-2 font-display text-[15px] font-semibold text-ink-950">{stat.value}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
