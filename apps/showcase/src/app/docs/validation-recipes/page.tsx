import React from "react";

export default function ValidationRecipesPage() {
  return (
    <>
      <h1>Validation Recipes & Schema Patterns</h1>
      <p className="lead">
        Real-world recipes for high-performance enterprise form validation using the <code>f</code> schema DSL.
      </p>

      <h2>1. Cross-Field Validation (Password Match)</h2>
      <p>
        To validate that two fields correlate (e.g., password and password confirmation), apply a <code>.refine()</code> on the enclosing <code>f.object</code>:
      </p>
      <pre>
        <code className="language-typescript">
{`import { f } from '@binaryjack/formular.dev'

export const signupSchema = f.object({
  email: f.string().email(),
  password: f.string().min(8),
  confirmPassword: f.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})`}
        </code>
      </pre>

      <h2>2. Value Sanitization & Chained Transforms</h2>
      <p>
        Formular cleanses values before validation runs. Transforms execute eagerly without mutating the original DOM event:
      </p>
      <pre>
        <code className="language-typescript">
{`export const profileSchema = f.object({
  // Automatically trims surrounding whitespace and downcases
  handle: f.string()
    .trim()
    .toLowerCase()
    .pattern(/^[a-z0-9_]{3,20}$/, "Only lowercase letters, numbers, and underscores"),
  
  // Normalizes empty string to null or default
  bio: f.string().max(280).optional()
})`}
        </code>
      </pre>

      <h2>3. Conditional & Dependent Field Validation</h2>
      <p>
        Enforce validation rules dynamically based on previous user selections (e.g. VAT number required only when company is selected):
      </p>
      <pre>
        <code className="language-typescript">
{`export const billingSchema = f.object({
  accountType: f.enum(["personal", "business"] as const),
  companyName: f.string().optional(),
  vatNumber: f.string().optional()
}).refine((data) => {
  if (data.accountType === "business") {
    return !!data.companyName && data.companyName.length > 2 && !!data.vatNumber
  }
  return true
}, {
  message: "Company name and VAT number are required for business accounts",
  path: ["companyName"]
})`}
        </code>
      </pre>

      <h2>4. Dynamic Array Validation</h2>
      <p>
        Validate collections of items with minimum, maximum, and element-level constraints:
      </p>
      <pre>
        <code className="language-typescript">
{`export const inviteTeamSchema = f.object({
  teamName: f.string().min(3),
  invitations: f.array(
    f.object({
      email: f.string().email(),
      role: f.enum(["admin", "member", "viewer"] as const)
    })
  ).min(1, "At least one team member must be invited").max(10, "Maximum 10 invitations per batch")
})`}
        </code>
      </pre>
    </>
  );
}
