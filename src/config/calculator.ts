/**
 * Savings calculator knobs. Every assumption the model uses lives here so it
 * can be tuned (or challenged by a client's finance team) in one place.
 * The maths is in src/lib/calculator.ts and is covered by unit tests.
 */

export type CalculatorInputKey =
  | "employees"
  | "monthlySaas"
  | "toolCount"
  | "affectedShare"
  | "hoursLostPerWeek"
  | "averageSalary";

export type InputSpec = {
  key: CalculatorInputKey;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  default: number;
  format: "number" | "currency" | "percent" | "hours";
};

export const calculatorInputs: InputSpec[] = [
  {
    key: "employees",
    label: "Employees",
    help: "Total headcount across the business.",
    min: 50,
    max: 2000,
    step: 10,
    default: 350,
    format: "number",
  },
  {
    key: "monthlySaas",
    label: "Monthly software spend",
    help: "SaaS subscriptions and licences, across all teams.",
    min: 2000,
    max: 400000,
    step: 1000,
    default: 45000,
    format: "currency",
  },
  {
    key: "toolCount",
    label: "Software tools in use",
    help: "A rough count is fine. Include team-level tools.",
    min: 5,
    max: 400,
    step: 1,
    default: 70,
    format: "number",
  },
  {
    key: "affectedShare",
    label: "Staff in process-heavy roles",
    help: "Share of people whose day involves workflows, handoffs or admin.",
    min: 10,
    max: 100,
    step: 5,
    default: 60,
    format: "percent",
  },
  {
    key: "hoursLostPerWeek",
    label: "Hours lost per person, per week",
    help: "Re-keying, chasing, switching tools and working around gaps.",
    min: 0,
    max: 15,
    step: 0.5,
    default: 3,
    format: "hours",
  },
  {
    key: "averageSalary",
    label: "Average salary in those roles",
    help: "UK full-time median is £39,039 (ONS, 2025).",
    min: 22000,
    max: 120000,
    step: 1000,
    default: 42000,
    format: "currency",
  },
];

type Scenario = { saasReduction: number; timeRecovery: number };

export type CalculatorAssumptions = {
  workingWeeksPerYear: number;
  hoursPerWeek: number;
  employerCostMultiplier: number;
  scenarios: { conservative: Scenario; expected: Scenario };
  referenceEngagementFee: number;
};

export const calculatorAssumptions: CalculatorAssumptions = {
  /** 52 weeks less statutory leave (5.6 weeks) and rounding. */
  workingWeeksPerYear: 46,
  /** Standard UK full-time week. */
  hoursPerWeek: 37.5,
  /**
   * Salary to fully loaded employment cost: employer NICs (15% above threshold
   * from April 2025), minimum 3% pension contribution and modest overhead.
   * Deliberately conservative; many finance teams use 1.3 or higher.
   */
  employerCostMultiplier: 1.25,
  scenarios: {
    conservative: {
      /** Share of SaaS spend that can be retired or rationalised. */
      saasReduction: 0.1,
      /** Share of lost hours recovered through better systems. */
      timeRecovery: 0.25,
    },
    expected: {
      saasReduction: 0.2,
      timeRecovery: 0.4,
    },
  },
  /** Mid-point engagement fee, used only for the indicative payback line. */
  referenceEngagementFee: 150000,
};
