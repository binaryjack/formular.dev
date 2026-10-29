import React from "react";

export default function ComponentAugmentationPage() {
  return (
    <>
      <h1>Component Augmentation Guide</h1>
      <p className="lead">
        Learn how to supercharge your existing UI component library (shadcn/ui, Radix Primitives, Tailwind UI, Material UI) with Formular's reactive validation engine.
      </p>

      <h2>1. The Augmentation Philosophy</h2>
      <p>
        Traditional form libraries often force you to wrap everything in heavy Context Providers or rewrite your input props. Formular uses a headless, decoupled design: your UI components remain 100% pure presentational elements, while Formular manages state, validation, formatting, and dirtiness via lightweight adapters.
      </p>

      <h2>2. Pattern A: The Native Spread Pattern</h2>
      <p>
        For standard HTML elements or components that accept standard input props:
      </p>
      <pre>
        <code className="language-tsx">
{`import { createForm, f } from '@binaryjack/formular.dev'

const myForm = createForm({
  schema: f.object({
    email: f.string().email(),
    password: f.string().min(8)
  })
})

export function LoginForm() {
  return (
    <form onSubmit={(e) => { e.preventDefault(); myForm.submit(); }}>
      <input 
        type="email" 
        {...myForm.register('email')} 
        placeholder="you@domain.com" 
      />
      <input 
        type="password" 
        {...myForm.register('password')} 
        placeholder="••••••••" 
      />
      <button type="submit">Log in</button>
    </form>
  )
}`}
        </code>
      </pre>

      <h2>3. Pattern B: Custom Design System Inputs (shadcn/ui, Radix)</h2>
      <p>
        When wrapping design system components with custom error badges and floating labels, bind directly to field observables:
      </p>
      <pre>
        <code className="language-tsx">
{`interface CustomFieldProps {
  name: string
  label: string
  form: FormInstance
}

export function FormField({ name, label, form }: CustomFieldProps) {
  const { value, error, isDirty, onChange, onBlur } = form.useField(name)

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono text-neutral-400 uppercase">
        {label}
      </label>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={\`w-full bg-neutral-900 border px-3 py-2 rounded text-white text-sm transition-colors \${
          error 
            ? "border-red-500/50 focus:border-red-500" 
            : isDirty 
              ? "border-indigo-500/50" 
              : "border-neutral-800"
        }\`}
      />
      {error && (
        <p className="text-xs text-red-400 font-mono flex items-center gap-1">
          <span>✕</span> {error.message}
        </p>
      )}
    </div>
  )
}`}
        </code>
      </pre>

      <h2>4. Non-Text Inputs (Switches, Sliders, Dropdowns)</h2>
      <p>
        For complex components where event objects are not standard <code>React.ChangeEvent</code>, pass values directly to <code>onChange</code>:
      </p>
      <pre>
        <code className="language-tsx">
{`// Example with a Radix Switch or Boolean Toggle
function NotificationsToggle({ form }: { form: FormInstance }) {
  const { value, onChange } = form.useField("enableNotifications")

  return (
    <Switch.Root 
      checked={!!value} 
      onCheckedChange={(checked) => onChange(checked)}
    >
      <Switch.Thumb />
    </Switch.Root>
  )
}`}
        </code>
      </pre>
    </>
  );
}
