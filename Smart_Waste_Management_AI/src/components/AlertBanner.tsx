import { useReveal } from "@/hooks/useReveal";
import { AlertTriangle } from "lucide-react";

type Bin = {
  _id?: string;
  id?: number;
  type: "Plastic" | "Organic" | "Metal" | "Paper" | "Glass";
  location: string;
  fillLevel: number;
  lastEmptied: string;
};

export function AlertBanner({ bins }: { bins: Bin[] }) {
  const ref = useReveal<HTMLDivElement>();

  const alertBins = bins.filter((b) => b.fillLevel >= 80);

  if (!alertBins.length) return null;

  return (
    <div
      ref={ref}
      className="reveal flex items-start gap-3 rounded-2xl border border-warn/30 bg-warn/10 p-4 shadow-soft"
      role="alert"
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warn/20 text-warn">
        <AlertTriangle className="h-4.5 w-4.5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">
          {alertBins.length} bin{alertBins.length > 1 ? "s" : ""} need attention
        </p>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {alertBins
            .map((b) => `${b.type} • ${b.location} (${b.fillLevel}%)`)
            .join("  ·  ")}
        </p>
      </div>
    </div>
  );
}