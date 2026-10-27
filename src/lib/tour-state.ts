import { useSyncExternalStore } from "react";

/** Whether the idle tour is running. Animations read this to decide whether to replay on re-entry. */
let touring = false;
const listeners = new Set<() => void>();

export const tourState = {
  set(v: boolean) {
    if (v === touring) return;
    touring = v;
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
