import type { Intent } from "@/content/home";

/**
 * CTAs across the page can preselect the enquiry type. A DOM event keeps the
 * CTAs decoupled from the form (no shared React state needed).
 */
export const INTENT_EVENT = "forta:intent";

export function requestIntent(intent: Intent) {
  window.dispatchEvent(new CustomEvent<Intent>(INTENT_EVENT, { detail: intent }));
}

export const ESTIMATE_EVENT = "forta:estimate";

/** The calculator publishes its latest summary so the enquiry form can attach it. */
export function publishEstimate(summary: string) {
  window.dispatchEvent(new CustomEvent<string>(ESTIMATE_EVENT, { detail: summary }));
}
