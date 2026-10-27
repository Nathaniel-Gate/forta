/** Timing of the enquiry form's white-glow prompt (ms). One sequence: text wipe, field outlines, decaying pulses. */
export const formPrompt = {
  /** Light band sweeping left to right across the heading text. */
  wipeMs: 1800,
  /** Each field is outlined in turn; this is the gap between starts and how long each outline lasts. */
  fieldStepMs: 380,
  fieldMs: 1100,
  /** Whole-form and button pulses: start offset and length of each, slowing and fading. */
  pulses: [
    { at: 0, ms: 800, amp: 1 },
    { at: 800, ms: 1000, amp: 0.8 },
    { at: 1900, ms: 1400, amp: 0.55 },
    { at: 3400, ms: 1900, amp: 0.35 },
  ],
};
