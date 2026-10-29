import React from "react";

export default function CustomAdaptersPage() {
  return (
    <>
      <h1>Path 2: Custom Adapters</h1>
      <p className="lead">
        Building from scratch or adapting existing libraries like shadcn/ui or Material UI? The Enterprise Path uses our low-level hooks to seamlessly map Formular's validation state to your custom components.
      </p>

      <h2>The Hook Pattern</h2>
      <p>By leveraging hooks like <code>useFormularField</code>, you can bridge the gap between your custom UI and the powerful Formular.dev validation engine. This approach gives you absolute control over rendering.</p>

      <hr className="my-8 border-white/10" />

      <h2>Adapting shadcn/ui (React)</h2>
      <p>Here is an example of mapping Formular's state to a typical <code>shadcn/ui</code> Input component:</p>
      
      <pre>
        <code className="language-tsx">
{`import * as React from "react"
import { useFormularField } from "formular.dev/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShadcnFormularInput({ name, label }) {
  // 1. Connect to Formular Engine
  const { value, error, onChange, onBlur } = useFormularField(name);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      
      {/* 2. Bind the state and events */}
      <Input
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      
      {/* 3. Render errors from the schema */}
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error.message}
        </p>
      )}
    </div>
  )
}`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Adapting Material UI (MUI)</h2>
      <p>Similarly, wrapping an enterprise component from MUI is straightforward:</p>
      
      <pre>
        <code className="language-tsx">
{`import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormularField } from 'formular.dev/react';

export function MuiFormularInput({ name, label }) {
  const { value, error, onChange, onBlur } = useFormularField(name);

  return (
    <TextField
      id={name}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={!!error}
      helperText={error ? error.message : " "}
      variant="outlined"
      fullWidth
    />
  );
}`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Vanilla JS / Web Components</h2>
      <p>If you aren't using a framework, you can hook into the core <code>ServiceManager</code> directly using the Channel-based messaging system:</p>
      
      <pre>
        <code className="language-javascript">
{`import { SetupHelpers, SFormularManager } from 'formular.dev';

// 1. Initialize the IoC container
const serviceManager = SetupHelpers.forFormApplication();
const manager = serviceManager.resolve(SFormularManager);

// 2. Create the form instance
const form = await manager.createFromDescriptors('vanilla-form', [
  { name: 'username', value: '', validationOptions: { /* rules */ } }
]);

// 3. Bind to DOM
const input = document.getElementById('username');
const errorDisplay = document.getElementById('username-error');

input.addEventListener('input', (e) => {
  form.updateField('username', e.target.value);
});

// 4. Subscribe to the isolated field channel
form.subscribeToField('username', (state) => {
  if (state.error) {
    input.classList.add('is-invalid');
    errorDisplay.textContent = state.error.message;
  } else {
    input.classList.remove('is-invalid');
    errorDisplay.textContent = '';
  }
});`}
        </code>
      </pre>

      <p>This zero-friction capability ensures that no matter how complex or "crazy" your enterprise UI architecture is, Formular.dev will fit perfectly.</p>
    </>
  );
}
