export function SectionSkeleton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div
      className={
        tone === "dark"
          ? "flex h-[60vh] w-full animate-pulse items-center justify-center bg-ink"
          : "flex h-[60vh] w-full animate-pulse items-center justify-center bg-ivory"
      }
      aria-hidden="true"
    >
      <div className="h-px w-24 bg-gold/30" />
    </div>
  );
}
