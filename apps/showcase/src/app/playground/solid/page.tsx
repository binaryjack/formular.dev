"use client";

import React, { useEffect, useRef, useState } from "react";
import { f } from "formular.dev";
import { mountSolidForm } from "../frameworks/solid-wrapper";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function SolidPlaygroundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const unmount = mountSolidForm(
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
          <h1 className="text-2xl font-bold mb-2">Solid JS Form Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by `@formular/atomos-solid` fine-grained signal-based wrapper.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          <div ref={containerRef} />
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Solid Wrapper Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`import { createSolidForm } from '@formular/atomos-solid';

const form = createSolidForm(signUpSchema);

const handleSubmit = async () => {
  const data = await form.submit();
  if (data) {
    console.log("Success:", data);
  }
};

return (
  <form onSubmit={handleSubmit}>
    <div class="grid grid-cols-2 gap-4">
      <FAInput id="firstName" value={form.fields().firstName} />
      <FAInput id="lastName" value={form.fields().lastName} />
    </div>
    <FAEmail id="email" value={form.fields().email} />
    <FAPassword id="password" value={form.fields().password} />
    <FAButton type="submit">Create Account</FAButton>
  </form>
);`}
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
