import { useEffect, useState } from "react";
import { Loader2, Recycle, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const SUGGESTIONS: Record<string, { tip: string; emoji: string }> = {
  plastic: { tip: "Rinse and place in the recycling bin", emoji: "♻️" },
  organic: { tip: "Compost — turns into healthy soil", emoji: "🌱" },
  metal: { tip: "Send to scrap or metal recycling", emoji: "🔁" },
  paper: { tip: "Flatten and recycle with paper waste", emoji: "📄" },
  glass: { tip: "Drop in the glass collection bin", emoji: "🍶" },
};

function getSuggestion(type: string) {
  const key = type.toLowerCase();
  for (const k of Object.keys(SUGGESTIONS)) {
    if (key.includes(k)) return SUGGESTIONS[k];
  }
  return { tip: "Dispose responsibly at a designated point", emoji: "🌍" };
}

export function WastePrediction({ imageFile }: { imageFile: File }) {
  const ref = useReveal<HTMLDivElement>();
  const [label, setLabel] = useState<string>("Analyzing image...");
  const [confidence, setConfidence] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const run = async () => {
      setLoading(true);
      setError(null);
      setConfidence(0);
      setLabel("Analyzing image...");
      try {
        const tmImage = await import("@teachablemachine/image");
        const modelURL = "https://teachablemachine.withgoogle.com/models/bo-M_1JNQ/model.json";
        const metadataURL =
          "https://teachablemachine.withgoogle.com/models/bo-M_1JNQ/metadata.json";

        const model = await tmImage.load(modelURL, metadataURL);

        const img = document.createElement("img");
        objectUrl = URL.createObjectURL(imageFile);
        img.src = objectUrl;
        img.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
        });

        const predictions = await model.predict(img);
        if (cancelled) return;

        const best = predictions.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current,
        );

        const conf = Math.round(best.probability * 100);

        setLabel(best.className);
        setConfidence(conf);

        // ✅ BACKEND CALL (CORRECT PLACE)
        await fetch("http://localhost:5000/waste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: best.className,
            confidence: conf,
          }),
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("We couldn't classify this image. Please try another.");
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  const suggestion = getSuggestion(label);

  return (
    <div
      ref={ref}
      className="reveal overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-6 py-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <p className="text-sm font-medium text-foreground">AI Classification</p>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm">Analyzing image with the EcoTrack model…</p>
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Detected waste
                </p>
                <h3 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                  {suggestion.emoji} {label}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Confidence
                </p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-primary">
                  {confidence}%
                </p>
              </div>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full gradient-eco transition-[width] duration-1000 ease-out"
                style={{ width: `${confidence}%` }}
              />
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-accent/60 p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                <Recycle className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Suggested action</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{suggestion.tip}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}