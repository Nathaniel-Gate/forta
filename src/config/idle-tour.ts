/** Idle tour knobs. Everything that tunes the tour lives here. */
export const idleTour = {
  /** No input for this long starts the tour. */
  idleMs: 30_000,
  /** Glide time = base + viewports travelled * perViewport, capped at max (seconds). */
  glide: { base: 1.6, perViewport: 0.9, max: 4.5 },
  /** How long to rest on each section before gliding to the next (random in range). */
  dwellMs: [4_000, 6_000] as const,
  /** A section taller than the screen is toured in further stops, each moving down by this share of the screen height. */
  sliceStep: 0.85,
  /** Safety net: leave the final stop after this long even if the form prompt never reports back. */
  nudgeMaxMs: 20_000,
  /** Pause after the form prompt ends before the tour heads back up. */
  afterNudgeMs: 900,
  /** Breathing room between the nav and a section's first content line at each stop. */
  navGapPx: 24,
  /** Sections to visit, top to bottom, then loop back to the first. Missing ids are skipped. */
  sectionIds: ["top", "why", "what", "method", "team", "engagement", "faq", "contact"],
};
