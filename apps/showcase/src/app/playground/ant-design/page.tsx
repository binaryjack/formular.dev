"use client";

import React, { useState } from "react";
import { f } from "formular.dev";
import { FAProvider, useFAAdapter } from "@formular/atomos";
import { ConfigProvider, Input, Button, theme } from "antd";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function AntDesignPlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Ant Design Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by Formular.dev's headless validation mapping directly to `antd` components.
          </p>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-xl">
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
              token: {
                colorPrimary: '#6366f1',
                colorBgContainer: '#1f1f1f',
              },
            }}
          >
            <FAProvider formName="antDemo" form={signUpSchema} onSubmit={handleSubmit}>
              <AntInnerForm />
            </FAProvider>
          </ConfigProvider>
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Ant Design Integration Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`const { fields, errors, handleChange, handleBlur } = useFAAdapter();
const getField = (name) => fields.find(f => f.name === name);
const firstName = getField("firstName");

<Input
  value={firstName?.value || ""}
  onChange={(e) => handleChange("firstName", e.target.value)}
  onBlur={() => handleBlur("firstName")}
  status={firstName?.touched && errors.firstName ? "error" : ""}
/>
{firstName?.touched && errors.firstName && (
  <div className="text-[#ff4d4f] text-xs">{errors.firstName}</div>
)}`}
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

function AntInnerForm() {
  const { fields, errors, handleChange, handleBlur } = useFAAdapter();
  
  const getField = (name: string) => fields.find(f => f.name === name);
  const firstName = getField("firstName");
  const lastName = getField("lastName");
  const email = getField("email");
  const password = getField("password");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm text-slate-300">First Name</label>
          <Input
            value={(firstName?.value as string) || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            status={firstName?.touched && !!errors.firstName ? "error" : ""}
          />
          {firstName?.touched && errors.firstName && (
            <div className="text-[#ff4d4f] text-xs">{errors.firstName}</div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm text-slate-300">Last Name</label>
          <Input
            value={(lastName?.value as string) || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            status={lastName?.touched && !!errors.lastName ? "error" : ""}
          />
          {lastName?.touched && errors.lastName && (
            <div className="text-[#ff4d4f] text-xs">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Email Address</label>
        <Input
          type="email"
          value={(email?.value as string) || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          status={email?.touched && !!errors.email ? "error" : ""}
        />
        {email?.touched && errors.email && (
          <div className="text-[#ff4d4f] text-xs">{errors.email}</div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-300">Password</label>
        <Input.Password
          value={(password?.value as string) || ""}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          status={password?.touched && !!errors.password ? "error" : ""}
        />
        {password?.touched && errors.password && (
          <div className="text-[#ff4d4f] text-xs">{errors.password}</div>
        )}
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="mt-2"
      >
        Create Account
      </Button>
    </div>
  );
}
