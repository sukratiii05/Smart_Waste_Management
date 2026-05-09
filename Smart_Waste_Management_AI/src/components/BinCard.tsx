
import { useReveal } from "@/hooks/useReveal";
import { AlertTriangle, MapPin, Recycle, Apple, Wrench, FileText, Wine } from "lucide-react";

const ICONS: Record<Bin["type"], typeof Recycle> = {
  Plastic: Recycle,
  Organic: Apple,
  Metal: Wrench,
  Paper: FileText,
  Glass: Wine,
};


type Bin = {
  _id?: string;
  id?: number;
  type: "Plastic" | "Organic" | "Metal" | "Paper" | "Glass";
  location: string;
  fillLevel: number;
  lastEmptied: string;
};

export function BinCard({ bin, index = 0 }: { bin: Bin; index?: number }) {
  const ref = useReveal<HTMLDivElement>();
  const isAlert = bin.fillLevel >= 80;
  const Icon = ICONS[bin.type] || Recycle;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
    >
      {/* Soft top accent */}
      <div
        className={`absolute inset-x-0 top-0 h-1 transition-opacity duration-500 ${
          isAlert ? "gradient-warn opacity-90" : "gradient-eco opacity-70 group-hover:opacity-100"
        }`}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-11 w-11 place-items-center rounded-xl ${
              isAlert ? "bg-warn/15 text-warn" : "bg-primary/10 text-primary"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{bin.type}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {bin.location}
            </p>
          </div>
        </div>
        {isAlert && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warn/15 px-2.5 py-1 text-[11px] font-medium text-warn">
            <AlertTriangle className="h-3 w-3" />
            Attention
          </span>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Fill level
          </span>
          <span className="text-2xl font-semibold tabular-nums text-foreground">
            {bin.fillLevel}
            <span className="text-sm text-muted-foreground">%</span>
          </span>
        </div>

        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-out ${
              isAlert ? "gradient-warn" : "gradient-eco"
            }`}
            style={{ width: `${bin.fillLevel}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Last emptied <span className="text-foreground">{bin.lastEmptied}</span>
        </p>
      </div>
    </div>
  );
}
