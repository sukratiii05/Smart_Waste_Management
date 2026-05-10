import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, AlertTriangle, Gauge, Leaf } from "lucide-react";

import { AlertBanner } from "@/components/AlertBanner";
import { BinCard } from "@/components/BinCard";
import { StatCard } from "@/components/StatCard";
import { useReveal } from "@/hooks/useReveal";

type Bin = {
  _id?: string;
  id?: number;
  type: "Plastic" | "Organic" | "Metal" | "Paper" | "Glass";
  location: string;
  fillLevel: number;
  lastEmptied: string;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EcoTrack" },
      {
        name: "description",
        content:
          "Live overview of every smart waste bin: total bins, critical alerts, and average fill level.",
      },
      { property: "og:title", content: "Dashboard — EcoTrack" },
      {
        property: "og:description",
        content:
          "Live overview of every smart waste bin: total bins, critical alerts, and average fill level.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const [bins, setBins] = useState<Bin[]>([]);

  useEffect(() => {
    fetch("https://smartwastemanagement-production.up.railway.app/bins")
      .then((res) => res.json())
      .then((data) => setBins(data))
      .catch((err) => console.error(err));
  }, []);

  const total = bins.length;
  const alerts = bins.filter((b) => b.fillLevel >= 80).length;
  const avg =
    bins.length > 0
      ? Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length)
      : 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div ref={heroRef} className="reveal">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              Live monitoring
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Smart Waste{" "}
              <span className="bg-gradient-to-r from-primary to-leaf bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              Track every bin across your campus in real time. Get alerted before bins overflow
              and keep collection routes efficient.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Updated <span className="text-foreground">just now</span>
          </p>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Bins"
          value={total}
          hint="Connected smart sensors"
          icon={Trash2}
          tone="leaf"
          index={0}
        />
        <StatCard
          label="Critical Alerts"
          value={alerts}
          hint="Bins above 80% capacity"
          icon={AlertTriangle}
          tone="warn"
          index={1}
        />
        <StatCard
          label="Average Fill"
          value={`${avg}%`}
          hint="Across all monitored bins"
          icon={Gauge}
          index={2}
        />
      </section>

      <section className="mt-8">
        <AlertBanner bins={bins} />
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              All bins
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sorted by location. Bins above 80% are flagged for attention.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bins.length === 0 ? (
            <p className="text-muted-foreground">No bins available yet.</p>
          ) : (
            bins.map((bin, i) => (
              <BinCard key={bin._id || bin.id || i} bin={bin} index={i} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}