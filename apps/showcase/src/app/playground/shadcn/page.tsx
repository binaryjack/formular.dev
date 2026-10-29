"use client";

import React, { useState } from "react";
import { f } from "formular.dev";
import { FAProvider, useFAAdapter } from "@formular/atomos";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

// Mocking shadcn/ui components using Tailwind
const Label = ({ htmlFor, children, className }: any) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-200 ${className || ""}`}>
    {children}
  </label>
);

const Input = React.forwardRef<HTMLInputElement, any>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border bg-slate-950 px-3 py-2 text-sm ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-red-500" : "border-slate-800"} ${className || ""}`}
    {...props}
  />
));
Input.displayName = "Input";

const Button = React.forwardRef<HTMLButtonElement, any>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-600/90 h-10 px-4 py-2 ${className || ""}`}
    {...props}
  />
));
Button.displayName = "Button";

export default function ShadcnPlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Shadcn UI Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by Formular.dev's headless validation mapping directly to shadcn/ui Tailwind components.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          <FAProvider formName="shadcnDemo" form={signUpSchema} onSubmit={handleSubmit}>
            <ShadcnInnerForm />
          </FAProvider>
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Shadcn UI Integration Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`const { fields, errors, handleChange, handleBlur } = useFAAdapter();
const getField = (name) => fields.find(f => f.name === name);
const firstName = getField("firstName");

<div className="space-y-2">
  <Label htmlFor="firstName">First Name</Label>
  <Input
    id="firstName"
    value={firstName?.value || ""}
    onChange={(e) => handleChange("firstName", e.target.value)}
    onBlur={() => handleBlur("firstName")}
    error={firstName?.touched && !!errors.firstName}
  />
  {firstName?.touched && errors.firstName && (
    <p className="text-red-500 text-sm">{errors.firstName}</p>
  )}
</div>`}
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

function ShadcnInnerForm() {
  const { fields, errors, handleChange, handleBlur } = useFAAdapter();
  const getField = (name: string) => fields.find(f => f.name === name);
  
  const firstName = getField("firstName");
  const lastName = getField("lastName");
  const email = getField("email");
  const password = getField("password");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={(firstName?.value as string) || ""}
            onChange={(e: any) => handleChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            error={firstName?.touched && !!errors.firstName}
          />
          {firstName?.touched && errors.firstName && (
            <p className="text-[0.8rem] font-medium text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={(lastName?.value as string) || ""}
            onChange={(e: any) => handleChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            error={lastName?.touched && !!errors.lastName}
          />
          {lastName?.touched && errors.lastName && (
            <p className="text-[0.8rem] font-medium text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={(email?.value as string) || ""}
          onChange={(e: any) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={email?.touched && !!errors.email}
        />
        {email?.touched && errors.email && (
          <p className="text-[0.8rem] font-medium text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={(password?.value as string) || ""}
          onChange={(e: any) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          error={password?.touched && !!errors.password}
        />
        {password?.touched && errors.password && (
          <p className="text-[0.8rem] font-medium text-red-500">{errors.password}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </div>
  );
}
