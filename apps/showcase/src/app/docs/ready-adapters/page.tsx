import React from "react";

export default function ReadyAdaptersPage() {
  return (
    <>
      <h1>Path 1: Ready Adapters</h1>
      <p className="lead">
        Using a pre-built adapter is the fastest way to get started. Simply define your schema, wrap your form, and drop in the inputs. Validation and state synchronization are handled automatically.
      </p>

      <h2>The Two-Step Pattern</h2>
      <ol>
        <li>Define your schema and validation rules using the <code>f</code> schema builder.</li>
        <li>Pass the schema to the framework-specific provider and render your inputs.</li>
      </ol>

      <hr className="my-8 border-white/10" />

      <h2>React Integration (Formular Atomos)</h2>
      <p>Using the official <code>@formular/atomos</code> adapter for React:</p>
      <pre>
        <code className="language-tsx">
{`import { f } from "formular.dev";
import { FAProvider, FAInput } from "@formular/atomos";

const formSchema = f.object({
  id: f.string().required(),
  firstName: f.string().min(2),
  lastName: f.string().min(2)
});

export function ReactDemo() {
  return (
    <FAProvider form={formSchema} onSubmit={console.log}>
      <FAInput name="id" label="User ID" />
      <FAInput name="firstName" label="First Name" />
      <FAInput name="lastName" label="Last Name" />
      <button type="submit">Submit</button>
    </FAProvider>
  );
}`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Vue.js Integration</h2>
      <p>Using the <code>@formular/vue</code> adapter:</p>
      <pre>
        <code className="language-vue">
{`<script setup>
import { f } from 'formular.dev';
import { FormProvider, FInput } from '@formular/vue';

const formSchema = f.object({
  id: f.string().required(),
  firstName: f.string().min(2),
  lastName: f.string().min(2)
});

const handleSubmit = (data) => console.log(data);
</script>

<template>
  <FormProvider :form="formSchema" @submit="handleSubmit">
    <FInput name="id" label="User ID" />
    <FInput name="firstName" label="First Name" />
    <FInput name="lastName" label="Last Name" />
    <button type="submit">Submit</button>
  </FormProvider>
</template>`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Svelte Integration</h2>
      <p>Using the <code>@formular/svelte</code> adapter:</p>
      <pre>
        <code className="language-svelte">
{`<script>
  import { f } from 'formular.dev';
  import { FormProvider, FInput } from '@formular/svelte';

  const formSchema = f.object({
    id: f.string().required(),
    firstName: f.string().min(2),
    lastName: f.string().min(2)
  });

  function handleSubmit(event) {
    console.log(event.detail);
  }
</script>

<FormProvider form={formSchema} on:submit={handleSubmit}>
  <FInput name="id" label="User ID" />
  <FInput name="firstName" label="First Name" />
  <FInput name="lastName" label="Last Name" />
  <button type="submit">Submit</button>
</FormProvider>`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Angular Integration</h2>
      <p>Using the <code>@formular/angular</code> adapter modules:</p>
      <pre>
        <code className="language-typescript">
{`import { Component } from '@angular/core';
import { f } from 'formular.dev';

@Component({
  selector: 'app-demo',
  template: \`
    <formular-provider [form]="formSchema" (submitForm)="onSubmit($event)">
      <f-input name="id" label="User ID"></f-input>
      <f-input name="firstName" label="First Name"></f-input>
      <f-input name="lastName" label="Last Name"></f-input>
      <button type="submit">Submit</button>
    </formular-provider>
  \`
})
export class DemoComponent {
  formSchema = f.object({
    id: f.string().required(),
    firstName: f.string().min(2),
    lastName: f.string().min(2)
  });

  onSubmit(data: any) {
    console.log(data);
  }
}`}
        </code>
      </pre>

      <hr className="my-8 border-white/10" />

      <h2>Solid.js Integration</h2>
      <p>Using the <code>@formular/solid</code> adapter:</p>
      <pre>
        <code className="language-tsx">
{`import { f } from "formular.dev";
import { FormProvider, FInput } from "@formular/solid";

const formSchema = f.object({
  id: f.string().required(),
  firstName: f.string().min(2),
  lastName: f.string().min(2)
});

export function SolidDemo() {
  return (
    <FormProvider form={formSchema} onSubmit={console.log}>
      <FInput name="id" label="User ID" />
      <FInput name="firstName" label="First Name" />
      <FInput name="lastName" label="Last Name" />
      <button type="submit">Submit</button>
    </FormProvider>
  );
}`}
        </code>
      </pre>
    </>
  );
}
