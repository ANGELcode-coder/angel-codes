"use client";

/**
 * Fixed CRT scanline + vignette overlay.
 *
 * Purely decorative: sits above all content, ignores pointer events, and is
 * hidden from assistive tech. Disabled entirely for reduced-motion users and on
 * small screens where the effect costs more than it adds.
 */
export function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden select-none md:block motion-reduce:hidden"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,0,0,0.18)_3px,rgba(0,0,0,0.18)_4px)] opacity-45" />

      {/* Slow vertical sweep, like a CRT refresh */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,transparent,rgba(0,245,255,0.04),transparent)] animate-scan-sweep" />

      {/* Corner vignette to focus the centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
