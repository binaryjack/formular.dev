"use client";

import React, { useState } from "react";
import { f } from "formular.dev";
import { FAProvider, useFAAdapter } from "@formular/atomos";
import { ChakraProvider, createSystem, defaultConfig, Field, Input, Button, Flex, Box, Stack } from "@chakra-ui/react";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

const customSystem = createSystem(defaultConfig, {
  preflight: false,
});

export default function ChakraPlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Chakra UI Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by Formular.dev's headless validation mapping directly to `@chakra-ui/react` components.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          {/* Note: In a real app the Provider would wrap the whole app, but here we scope it for the demo */}
          <ChakraProvider value={customSystem}>
            <FAProvider formName="chakraDemo" form={signUpSchema} onSubmit={handleSubmit}>
              <ChakraInnerForm />
            </FAProvider>
          </ChakraProvider>
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Chakra Integration Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`const { fields, errors, handleChange, handleBlur } = useFAAdapter();
const getField = (name) => fields.find(f => f.name === name);
const firstName = getField("firstName");

<Field.Root invalid={firstName?.touched && !!errors.firstName}>
  <Field.Label>First Name</Field.Label>
  <Input 
    value={firstName?.value || ""}
    onChange={(e) => handleChange("firstName", e.target.value)}
    onBlur={() => handleBlur("firstName")}
  />
  <Field.ErrorText>{errors.firstName}</Field.ErrorText>
</Field.Root>`}
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

function ChakraInnerForm() {
  const { fields, errors, handleChange, handleBlur } = useFAAdapter();
  
  const getField = (name: string) => fields.find(f => f.name === name);
  const firstName = getField("firstName");
  const lastName = getField("lastName");
  const email = getField("email");
  const password = getField("password");

  return (
    <Stack gap={4}>
      <Flex gap={4}>
        <Field.Root invalid={firstName?.touched && !!errors.firstName}>
          <Field.Label>First Name</Field.Label>
          <Input 
            value={(firstName?.value as string) || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
          />
          <Field.ErrorText>{errors.firstName}</Field.ErrorText>
        </Field.Root>
        
        <Field.Root invalid={lastName?.touched && !!errors.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input 
            value={(lastName?.value as string) || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
          />
          <Field.ErrorText>{errors.lastName}</Field.ErrorText>
        </Field.Root>
      </Flex>

      <Field.Root invalid={email?.touched && !!errors.email}>
        <Field.Label>Email Address</Field.Label>
        <Input 
          type="email"
          value={(email?.value as string) || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        <Field.ErrorText>{errors.email}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={password?.touched && !!errors.password}>
        <Field.Label>Password</Field.Label>
        <Input 
          type="password"
          value={(password?.value as string) || ""}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
        />
        <Field.ErrorText>{errors.password}</Field.ErrorText>
      </Field.Root>

      <Button 
        type="submit" 
        colorPalette="indigo" 
        size="lg" 
        mt={4}
      >
        Create Account
      </Button>
    </Stack>
  );
}
