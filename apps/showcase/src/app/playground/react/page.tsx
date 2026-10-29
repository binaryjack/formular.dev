"use client";

import React, { useState } from "react";
import { f } from "formular.dev";
import { 
  FAProvider, 
  FAInput, 
  FAEmail, 
  FAPassword,
  FAButton
} from "@formular/atomos";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function ReactPlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">React Form Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by `@formular/atomos` React wrapper, bridging React context and `@atomos/ui` mock components.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          <FAProvider formName="register" form={signUpSchema} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FAInput id="firstName" placeholder="Jane" />
              <FAInput id="lastName" placeholder="Doe" />
            </div>
            
            <div className="mb-4">
              <FAEmail id="email" placeholder="jane.doe@example.com" />
            </div>

            <div className="mb-6">
              <FAPassword id="password" placeholder="••••••••" />
            </div>

            <FAButton type="submit" className="w-full">
              Create Account
            </FAButton>
          </FAProvider>
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">React Wrapper Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`<FAProvider form={signUpSchema} onSubmit={handleSubmit}>
  <div className="grid grid-cols-2 gap-4">
    <FAInput id="firstName" placeholder="Jane" />
    <FAInput id="lastName" placeholder="Doe" />
  </div>
  <FAEmail id="email" placeholder="..." />
  <FAPassword id="password" placeholder="..." />
  <FAButton type="submit">Create Account</FAButton>
</FAProvider>`}
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
