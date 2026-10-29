import React from "react";

export default function AsyncValidationPage() {
  return (
    <>
      <h1>Async Validation & Debounce</h1>
      <p className="lead">
        Perform remote server checks (username availability, email domain DNS, coupon code validation) without hammering the network or freezing UI interactions.
      </p>

      <h2>1. The Problem with Naive Async Validation</h2>
      <p>
        Triggering an HTTP request on every keyup creates race conditions, outdated response overwriting, and high server load. Formular solves this with native microtask debounce and promise cancellation:
      </p>

      <pre>
        <code className="language-typescript">
{`import { f } from '@binaryjack/formular.dev'

export const registerSchema = f.object({
  // Debounce waits 350ms of user typing idle before firing the remote check
  username: f.string()
    .min(3)
    .debounce(350)
    .refine(async (username) => {
      const response = await fetch(\`/api/check-username?u=\${encodeURIComponent(username)}\`)
      const data = await response.json()
      return data.available
    }, "This username is already taken")
})`}
        </code>
      </pre>

      <h2>2. UI Busy & Loading Indicators</h2>
      <p>
        While an async refinement is in-flight, Formular automatically sets the field's busy state to <code>true</code>. Adapters expose this via <code>isValidating</code>:
      </p>

      <pre>
        <code className="language-tsx">
{`function UsernameField({ form }: { form: FormInstance }) {
  const { value, error, isValidating, onChange } = form.useField("username")

  return (
    <div className="relative">
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
      />
      {isValidating && (
        <span className="absolute right-3 top-2.5 text-xs text-indigo-400 animate-pulse">
          Checking...
        </span>
      )}
      {error && <p className="text-xs text-red-400 mt-1">{error.message}</p>}
    </div>
  )
}`}
        </code>
      </pre>

      <h2>3. Submission Barrier</h2>
      <p>
        Calling <code>form.submit()</code> automatically halts and awaits any pending async validations before proceeding. If any async validator returns <code>false</code>, submission is rejected cleanly with a <code>SchemaValidationError</code>.
      </p>
    </>
  );
}
