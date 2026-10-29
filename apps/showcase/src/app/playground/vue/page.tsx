"use client";

import React, { useEffect, useRef, useState } from "react";
import { f } from "formular.dev";
import { mountVueForm } from "../frameworks/vue-wrapper";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function VuePlaygroundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const unmount = mountVueForm(
      containerRef.current,
      signUpSchema,
      async (data) => {
        setSubmittedData(data);
      },
      (msg) => console.log(msg),
      (err) => console.error(err)
    );
    return () => unmount();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form Container */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Vue.js Form Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by `@formular/atomos-vue` Composition API wrapper, bridging Vue's reactive state and native components.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          <div ref={containerRef} />
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Vue Wrapper Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-2 gap-4">
      <FAInput id="firstName" v-model="form.firstName" />
      <FAInput id="lastName" v-model="form.lastName" />
    </div>
    <FAEmail id="email" v-model="form.email" />
    <FAPassword id="password" v-model="form.password" />
    <FAButton type="submit">Create Account</FAButton>
  </form>
</template>

<script setup>
import { useForm } from '@formular/atomos-vue';
const form = useForm(signUpSchema);
const handleSubmit = () => form.submit();
</script>`}
          </pre>
        </div>

        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Submitted State</div>
          <pre className="text-xs text-emerald-400 font-mono overflow-x-auto min-h-[100px] leading-relaxed">
            {submittedData ? JSON.stringify(submittedData, null, 2) : "// Submit the form to see the validated payload"}
          </pre>
        </div>
      </div>
    </div>
  );
}
