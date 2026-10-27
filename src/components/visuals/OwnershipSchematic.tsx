"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero drawing: a technical plan of a client's own operating system.
 * Modules draw themselves in like a pen plotter. Purely decorative (aria-hidden); the hero copy
 * carries the meaning.
 */

const modules = [
  { id: "intake", x: 24, y: 64, w: 150, h: 84, label: "TRIGGER", sub: "email · form · schedule" },
  { id: "approvals", x: 194, y: 64, w: 150, h: 84, label: "CLAUDE SKILL", sub: "steps · checks" },
  { id: "portal", x: 364, y: 64, w: 132, h: 84, label: "REVIEW", sub: "human sign-off" },
  { id: "core", x: 24, y: 196, w: 472, h: 116, label: "THE WORKFLOW", sub: "run by your team, powered by AI" },
  { id: "reporting", x: 24, y: 360, w: 222, h: 84, label: "OUTPUT", sub: "report · draft · update" },
  { id: "data", x: 266, y: 360, w: 230, h: 84, label: "YOUR TOOLS", sub: "the systems you already use" },
];

const connectors = [
  "M99 148 V196",
  "M269 148 V196",
  "M430 148 V196",
  "M135 312 V360",
  "M381 312 V360",
  "M246 402 H266",
];

const ease = [0.65, 0, 0.35, 1] as const;

export function OwnershipSchematic({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Same initial/animate on server and client; reduced motion only zeroes the timing.
  const draw = (delay: number, duration = 1.1) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -20% 0px" },
    transition: reduce
      ? { duration: 0 }
      : { pathLength: { delay, duration, ease }, opacity: { delay, duration: 0.01 } },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "0px 0px -20% 0px" },
    transition: reduce ? { duration: 0 } : { delay, duration: 0.8 },
  });

  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden fill="none">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgb(255 255 255 / 0.07)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Dimension line across the top */}
      <motion.g {...fade(0.2)} stroke="rgb(255 255 255 / 0.35)" strokeWidth="0.75">
        <line x1="24" y1="30" x2="496" y2="30" />
        <line x1="24" y1="24" x2="24" y2="36" />
        <line x1="496" y1="24" x2="496" y2="36" />
      </motion.g>
      <motion.text {...fade(0.4)} x="260" y="24" textAnchor="middle" className="fill-steel-400 font-mono" fontSize="8.5" letterSpacing="1.5">
        SHAPED AROUND YOUR PROCESS
      </motion.text>

      {/* Core hatch fill */}
      <motion.rect {...fade(1.2)} x="24" y="196" width="472" height="116" fill="url(#hatch)" />

      {/* Modules */}
      {modules.map((m, i) => (
        <g key={m.id}>
          <motion.rect
            {...draw(0.15 + i * 0.12)}
            x={m.x}
            y={m.y}
            width={m.w}
            height={m.h}
            stroke={m.id === "core" ? "rgb(255 255 255 / 0.85)" : "rgb(255 255 255 / 0.5)"}
            strokeWidth={m.id === "core" ? 1.25 : 1}
            fill={m.id === "core" ? "rgb(255 255 255 / 0.015)" : "rgb(8 9 10 / 0.6)"}
          />
          <motion.text
            {...fade(0.7 + i * 0.12)}
            x={m.x + 12}
            y={m.y + 22}
            className="fill-stone-100 font-mono"
            fontSize={m.id === "core" ? 11 : 9.5}
            letterSpacing="1.6"
          >
            {m.label}
          </motion.text>
          <motion.text {...fade(0.85 + i * 0.12)} x={m.x + 12} y={m.y + 38} className="fill-steel-400 font-mono" fontSize="8" letterSpacing="0.4">
            {m.sub}
          </motion.text>
        </g>
      ))}

      {/* Core internals: three owned services */}
      {[0, 1, 2].map((k) => (
        <motion.rect
          key={k}
          {...draw(1.3 + k * 0.1, 0.8)}
          x={44 + k * 152}
          y={252}
          width={128}
          height={40}
          stroke="rgb(255 255 255 / 0.28)"
          strokeWidth="0.75"
          fill="rgb(8 9 10 / 0.75)"
        />
      ))}
      {["CLAUDE SKILLS", "WORKFLOW", "REVIEW"].map((t, k) => (
        <motion.text key={t} {...fade(1.6 + k * 0.08)} x={56 + k * 152} y={276} className="fill-steel-300 font-mono" fontSize="8" letterSpacing="1.2">
          {t}
        </motion.text>
      ))}

      {/* Connectors */}
      {connectors.map((d, i) => (
        <motion.path key={d} {...draw(1.1 + i * 0.07, 0.6)} d={d} stroke="rgb(255 255 255 / 0.45)" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {[
        [99, 196],
        [269, 196],
        [430, 196],
        [135, 312],
        [381, 312],
      ].map(([cx, cy]) => (
        <motion.circle key={`${cx}-${cy}`} {...fade(1.5)} cx={cx} cy={cy} r="2.5" fill="var(--color-ink-950)" stroke="white" strokeWidth="1" />
      ))}

      {/* Annotation: owned by your team */}
      <motion.g {...fade(2)}>
        <path d="M496 254 H508 V478 H420" stroke="rgb(255 255 255 / 0.3)" strokeWidth="0.75" />
        <circle cx="414" cy="478" r="3.5" fill="var(--color-signal)" />
        <text x="404" y="481" textAnchor="end" className="fill-stone-100 font-mono" fontSize="8.5" letterSpacing="1.4">
          OWNED BY: YOUR TEAM
        </text>
      </motion.g>

      {/* Title block */}
      <motion.g {...fade(2.2)} className="font-mono" fontSize="7.5" letterSpacing="1.2">
        <line x1="24" y1="496" x2="496" y2="496" stroke="rgb(255 255 255 / 0.18)" strokeWidth="0.75" />
        <text x="24" y="512" className="fill-steel-500">
          DWG 01 · ONE WORKFLOW
        </text>
        <text x="496" y="512" textAnchor="end" className="fill-steel-500">
          REV C · HANDED OVER
        </text>
      </motion.g>

    </svg>
  );
}
