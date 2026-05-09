import { useReveal } from "@/hooks/useReveal";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  index = 0,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "warn" | "leaf";
  index?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const toneStyles =
    tone === "warn"
      ? "bg-warn/15 text-warn"
      : tone === "leaf"
        ? "bg-leaf/15 text-leaf"
        : "bg-primary/10 text-primary";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {hint && <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${toneStyles}`}>
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
