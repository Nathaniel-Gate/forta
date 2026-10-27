import { useSyncExternalStore } from "react";

/** Whether the idle tour is running. Animations read this to decide whether to replay on re-entry. */
let touring = false;
let nudging = false;
const listeners = new Set<() => void>();

export const tourState = {
  set(v: boolean) {
    if (v === touring) return;
    touring = v;
    if (!v) nudging = false;
    listeners.forEach((l) => l());
  },
  /** True while the tour is resting on its last stop and the enquiry form should invite the visitor in. */
  setNudge(v: boolean) {
    if (v === nudging) return;
    nudging = v;
    listeners.forEach((l) => l());
  },
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => void listeners.delete(l);
};

export const useTouring = () =>
  useSyncExternalStore(
    subscribe,
    () => touring,
    () => false,
  );

export const useNudge = () =>
  useSyncExternalStore(
    subscribe,
    () => nudging,
    () => false,
  );
