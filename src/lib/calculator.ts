import {
  calculatorAssumptions,
  calculatorInputs,
  type CalculatorAssumptions,
  type CalculatorInputKey,
} from "@/config/calculator";

export type CalculatorInputs = Record<CalculatorInputKey, number>;

export type ScenarioResult = {
  saasSaving: number;
  timeValueRecovered: number;
  hoursRecovered: number;
  total: number;
  /** Months to recover the reference engagement fee; null if there is no saving. */
  paybackMonths: number | null;
};

export type CalculatorResult = {
  annualSaas: number;
  saasPerEmployee: number;
  costPerTool: number;
  affectedPeople: number;
  hoursLostPerYear: number;
  loadedHourlyCost: number;
  frictionCost: number;
  /** Full-time-equivalent people represented by the hours lost each year. */
  fteLost: number;
  conservative: ScenarioResult;
  expected: ScenarioResult;
};

export const defaultInputs: CalculatorInputs = Object.fromEntries(
  calculatorInputs.map((i) => [i.key, i.default]),
) as CalculatorInputs;

/** Clamp each input to its configured range; replace non-finite values with defaults. */
export function sanitiseInputs(raw: Partial<CalculatorInputs>): CalculatorInputs {
  const out = { ...defaultInputs };
  for (const spec of calculatorInputs) {
    const v = raw[spec.key];
    if (typeof v === "number" && Number.isFinite(v)) {
      out[spec.key] = Math.min(spec.max, Math.max(spec.min, v));
    }
  }
  return out;
}

export function calculate(raw: Partial<CalculatorInputs>, a: CalculatorAssumptions = calculatorAssumptions): CalculatorResult {
  const i = sanitiseInputs(raw);

  const annualSaas = i.monthlySaas * 12;
  const annualHoursPerPerson = a.hoursPerWeek * a.workingWeeksPerYear;
  const loadedHourlyCost = (i.averageSalary * a.employerCostMultiplier) / annualHoursPerPerson;

  const affectedPeople = Math.round(i.employees * (i.affectedShare / 100));
  const hoursLostPerYear = affectedPeople * i.hoursLostPerWeek * a.workingWeeksPerYear;
  const frictionCost = hoursLostPerYear * loadedHourlyCost;

  const scenario = (s: CalculatorAssumptions["scenarios"]["expected"]): ScenarioResult => {
    const saasSaving = annualSaas * s.saasReduction;
    const hoursRecovered = hoursLostPerYear * s.timeRecovery;
    const timeValueRecovered = frictionCost * s.timeRecovery;
    const total = saasSaving + timeValueRecovered;
    const paybackMonths = total > 0 ? a.referenceEngagementFee / (total / 12) : null;
    return { saasSaving, timeValueRecovered, hoursRecovered, total, paybackMonths };
  };

  return {
    annualSaas,
    saasPerEmployee: annualSaas / i.employees,
    costPerTool: annualSaas / i.toolCount,
    affectedPeople,
    hoursLostPerYear,
    loadedHourlyCost,
    frictionCost,
    fteLost: hoursLostPerYear / annualHoursPerPerson,
    conservative: scenario(a.scenarios.conservative),
    expected: scenario(a.scenarios.expected),
  };
}
