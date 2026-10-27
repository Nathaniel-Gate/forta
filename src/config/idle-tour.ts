/** Idle tour knobs. Everything that tunes the tour lives here. */
export const idleTour = {
  /** No input for this long starts the tour. */
  idleMs: 30_000,
  /** Glide time = base + viewports travelled * perViewport, capped at max (seconds). */
  glide: { base: 1.6, perViewport: 0.9, max: 4.5 },
  /** How long to rest on each section before gliding to the next (random in range). */
  dwellMs: [4_000, 6_000] as const,
  /** A section taller than this share of the screen is toured in several stops so all of it is seen. */
  maxSliceOfViewport: 0.95,
  /** Sections to visit, top to bottom, then loop back to the first. Missing ids are skipped. */
  sectionIds: ["top", "why", "what", "method", "team", "engagement", "faq", "contact"],
};
