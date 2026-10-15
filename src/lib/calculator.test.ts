import { describe, expect, it } from "vitest";
import { calculate, defaultInputs, sanitiseInputs } from "./calculator";

describe("calculate", () => {
  it("computes the default scenario by hand", () => {
    // Defaults: 350 staff, £45k/month SaaS, 70 tools, 60% affected, 3h/week, £42k salary
    const r = calculate(defaultInputs);

    expect(r.annualSaas).toBe(540_000);
    expect(r.saasPerEmployee).toBeCloseTo(540_000 / 350, 6);
    expect(r.costPerTool).toBeCloseTo(540_000 / 70, 6);

    // 37.5h x 46 weeks = 1,725 working hours a year
    // £42,000 x 1.25 / 1,725 = £30.4348/hour
    expect(r.loadedHourlyCost).toBeCloseTo(30.4348, 3);

    expect(r.affectedPeople).toBe(210);
    // 210 people x 3h x 46 weeks = 28,980 hours
    expect(r.hoursLostPerYear).toBe(28_980);
    // 28,980 x 30.4348 = £882,000
    expect(r.frictionCost).toBeCloseTo(882_000, 0);
    expect(r.fteLost).toBeCloseTo(28_980 / 1_725, 6);

    // Conservative: 10% of SaaS + 25% of friction
    expect(r.conservative.saasSaving).toBeCloseTo(54_000, 6);
    expect(r.conservative.timeValueRecovered).toBeCloseTo(220_500, 0);
    expect(r.conservative.total).toBeCloseTo(274_500, 0);
    expect(r.conservative.paybackMonths).toBeCloseTo(150_000 / (274_500 / 12), 4);

    // Expected: 20% of SaaS + 40% of friction
    expect(r.expected.saasSaving).toBeCloseTo(108_000, 6);
    expect(r.expected.timeValueRecovered).toBeCloseTo(352_800, 0);
    expect(r.expected.total).toBeCloseTo(460_800, 0);
    expect(r.expected.hoursRecovered).toBeCloseTo(11_592, 6);
  });

  it("expected scenario is never below conservative", () => {
    for (const employees of [50, 400, 2000]) {
      for (const hours of [0, 2, 15]) {
        const r = calculate({ ...defaultInputs, employees, hoursLostPerWeek: hours });
        expect(r.expected.total).toBeGreaterThanOrEqual(r.conservative.total);
      }
    }
  });

  it("returns null payback when there is nothing to save", () => {
    const r = calculate({ ...defaultInputs, monthlySaas: 2000, hoursLostPerWeek: 0 });
    expect(r.conservative.total).toBeCloseTo(2400, 6);
    expect(r.conservative.paybackMonths).not.toBeNull();
    const zero = calculate(
      { ...defaultInputs, hoursLostPerWeek: 0 },
      {
        workingWeeksPerYear: 46,
        hoursPerWeek: 37.5,
        employerCostMultiplier: 1.25,
        scenarios: {
          conservative: { saasReduction: 0, timeRecovery: 0 },
          expected: { saasReduction: 0, timeRecovery: 0 },
        },
        referenceEngagementFee: 150_000,
      },
    );
    expect(zero.expected.paybackMonths).toBeNull();
  });
});

describe("sanitiseInputs", () => {
  it("clamps out-of-range and replaces invalid values", () => {
    const s = sanitiseInputs({ employees: 1, monthlySaas: Number.NaN, affectedShare: 500 });
    expect(s.employees).toBe(50);
    expect(s.monthlySaas).toBe(defaultInputs.monthlySaas);
    expect(s.affectedShare).toBe(100);
  });
});
