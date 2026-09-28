"use client";

import { CursorTrail } from "@/components/ui/CursorTrail";

export function CursorTrailWrapper() {
  return <CursorTrail color="#ff2d78" dotCount={50} dotSize={4} maxOpacity={0.4} springStiffness={0.06} springDamping={0.85} />;
}
