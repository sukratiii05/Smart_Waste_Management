import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { ImagePlus, RotateCcw, UploadCloud } from "lucide-react";

import { WastePrediction } from "@/components/WastePrediction";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload & Classify — EcoTrack" },
      {
        name: "description",
        content:
          "Upload an image of waste and let EcoTrack's AI classify it as plastic, organic, metal, paper, or glass.",
      },
      { property: "og:title", content: "Upload & Classify — EcoTrack" },
      {
        property: "og:description",
        content:
          "Upload an image of waste and let EcoTrack's AI classify it instantly.",
      },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const dropRef = useReveal<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setImage(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div ref={heroRef} className="reveal text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <ImagePlus className="h-3.5 w-3.5 text-primary" />
          AI Waste Classifier
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Upload an image,{" "}
          <span className="bg-gradient-to-r from-primary to-leaf bg-clip-text text-transparent">
            sort it smarter
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Drop a photo of any waste item and our model will classify it as plastic, organic,
          metal, and more — with a clear disposal suggestion.
        </p>
      </div>

      {/* Dropzone */}
      <div
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`reveal mt-10 rounded-3xl border-2 border-dashed bg-card/60 p-10 text-center shadow-card transition-all duration-300 sm:p-14 ${
          dragging
            ? "scale-[1.01] border-primary bg-accent/40 shadow-glow"
            : "border-border/70 hover:border-primary/60"
        }`}
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-eco shadow-glow animate-float">
          <UploadCloud className="h-7 w-7 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-foreground">
          Drag & drop your image here
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">PNG, JPG up to 10MB</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
          >
            <ImagePlus className="h-4 w-4" />
            Choose image
          </button>
          {image && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {/* Preview + result */}
      {preview && image && (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PreviewCard preview={preview} fileName={image.name} />
          <WastePrediction imageFile={image} />
        </div>
      )}
    </div>
  );
}

function PreviewCard({ preview, fileName }: { preview: string; fileName: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal reveal-slide-left overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <p className="text-sm font-medium text-foreground">Preview</p>
        <p className="max-w-[60%] truncate text-xs text-muted-foreground">{fileName}</p>
      </div>
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={preview}
          alt="Uploaded waste preview"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
}
