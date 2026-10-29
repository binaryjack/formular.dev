import React from "react";

export default function MultiStepWizardsPage() {
  return (
    <>
      <h1>Multi-Step Wizards & Progressive Forms</h1>
      <p className="lead">
        Build frictionless multi-step flows and checkout funnels using schema slicing (<code>pick</code> / <code>omit</code>), per-step barrier validation, and persistent memory retention.
      </p>

      <h2>1. The Architecture of a Multi-Step Wizard</h2>
      <p>
        In multi-step workflows, each step has its own validation requirements, but the final submission requires the unified data payload. Formular makes this trivial by deriving step schemas directly from the master schema:
      </p>

      <pre>
        <code className="language-typescript">
{`import { f, createForm } from '@binaryjack/formular.dev'

// 1. Define the Master Schema
export const onboardingSchema = f.object({
  // Step 1: Personal Info
  fullName: f.string().min(2),
  email: f.string().email(),

  // Step 2: Company Info
  companyName: f.string().min(2),
  role: f.enum(["developer", "designer", "founder"] as const),

  // Step 3: Plan Selection
  plan: f.enum(["starter", "pro", "enterprise"] as const),
  billingCycle: f.enum(["monthly", "annual"] as const)
})

// 2. Slice Step Schemas using .pick()
export const step1Schema = onboardingSchema.pick(["fullName", "email"])
export const step2Schema = onboardingSchema.pick(["companyName", "role"])
export const step3Schema = onboardingSchema.pick(["plan", "billingCycle"])`}
        </code>
      </pre>

      <h2>2. Step Barrier Navigation (Guarded Next Step)</h2>
      <p>
        Before allowing the user to navigate to the next step, execute a partial validation barrier:
      </p>

      <pre>
        <code className="language-tsx">
{`export function WizardController({ form, currentStep, setStep }: WizardProps) {
  const handleNext = async () => {
    let currentSchema;
    if (currentStep === 1) currentSchema = step1Schema;
    if (currentStep === 2) currentSchema = step2Schema;

    if (currentSchema) {
      const result = currentSchema.safeParse(form.getValues());
      if (!result.success) {
        // Trigger field visual errors for the current step
        form.validateFields(Object.keys(currentSchema.shape));
        return; // Halt navigation
      }
    }

    // Step is valid, proceed
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button onClick={() => setStep((prev) => prev - 1)}>
          Back
        </button>
      )}
      <button onClick={handleNext}>
        {currentStep === 3 ? "Complete Registration" : "Continue"}
      </button>
    </div>
  );
}`}
        </code>
      </pre>

      <h2>3. State Persistence Across Steps</h2>
      <p>
        Because Formular operates with a decoupled state manager outside the React rendering tree, stepping backward or forward never loses form state—even if step components unmount completely.
      </p>
    </>
  );
}
