/**
 * Layout wrapper kept for structure. It used to fade content in on scroll;
 * that was removed because fade-ups on every block read as template output.
 * Motion on this site is reserved for things that carry meaning (the method
 * gauge, calculator results).
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
