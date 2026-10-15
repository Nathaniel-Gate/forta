const gbp0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const num0 = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const num1 = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });

export const formatGBP = (n: number) => gbp0.format(n);
export const formatNumber = (n: number) => num0.format(n);
export const formatOneDecimal = (n: number) => num1.format(n);

/** £1,234,567 → "£1.23m"; £84,500 → "£84.5k". For headline figures only. */
export function formatGBPCompact(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `£${(n / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2)}m`;
  if (abs >= 10_000) return `£${Math.round(n / 1_000)}k`;
  if (abs >= 1_000) return `£${(n / 1_000).toFixed(1)}k`;
  return gbp0.format(n);
}
