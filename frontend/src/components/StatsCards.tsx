import { IconBolt, IconHome, IconLayers } from "./icons";

interface StatsCardsProps {
  prediction: string | null;
}

export default function StatsCards({ prediction }: StatsCardsProps) {
  const cards = [
    {
      label: "Room Type",
      value: prediction ?? "—",
      icon: <IconHome />,
      highlight: Boolean(prediction),
    },
    { label: "Model", value: "Random Forest", icon: <IconLayers />, highlight: false },
    { label: "Features Used", value: "10", icon: <IconBolt />, highlight: false },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`flex items-center gap-3.5 rounded-xl2 border p-5 shadow-card transition-colors ${
            card.highlight ? "border-cobalt-200 bg-cobalt-50/60" : "border-canvas-line bg-canvas-card"
          }`}
        >
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
              card.highlight ? "bg-cobalt-100 text-cobalt-700" : "bg-canvas-sunk text-ink-700"
            }`}
          >
            {card.icon}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-semibold text-ink-950">{card.value}</p>
            <p className="text-[11.5px] text-ink-500">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
