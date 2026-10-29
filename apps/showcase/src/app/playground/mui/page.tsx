"use client";

import React, { useState } from "react";
import { f } from "formular.dev";
import { FAProvider, useFAAdapter } from "@formular/atomos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Dark theme for the showcase to match the rest of the site
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1", // indigo-500
    },
    background: {
      default: "transparent",
      paper: "#0c0c0f",
    },
  },
});

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function MuiPlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Material UI Showcase</h1>
          <p className="text-slate-400 text-sm">
            Powered by Formular.dev's headless validation mapping directly to `@mui/material` components.
          </p>
        </div>

        <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
          <ThemeProvider theme={darkTheme}>
            <FAProvider formName="muiDemo" form={signUpSchema} onSubmit={handleSubmit}>
              <MuiInnerForm />
            </FAProvider>
          </ThemeProvider>
        </div>
      </div>

      {/* Right Column: Code & State */}
      <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
        <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">MUI Integration Code</div>
          <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
{`const { fields, errors, handleChange, handleBlur } = useFAAdapter();
const getField = (name) => fields.find(f => f.name === name);
const firstName = getField("firstName");

<TextField
  label="First Name"
  value={firstName?.value || ""}
  onChange={(e) => handleChange("firstName", e.target.value)}
  onBlur={() => handleBlur("firstName")}
  error={firstName?.touched && !!errors.firstName}
  helperText={firstName?.touched && errors.firstName}
/>`}
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

function MuiInnerForm() {
  const { fields, errors, handleChange, handleBlur } = useFAAdapter();
  
  const getField = (name: string) => fields.find(f => f.name === name);
  const firstName = getField("firstName");
  const lastName = getField("lastName");
  const email = getField("email");
  const password = getField("password");

  // Wait, FAProvider wraps children in <form>. We use Box as a div.
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={(firstName?.value as string) || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          onBlur={() => handleBlur("firstName")}
          error={firstName?.touched && !!errors.firstName}
          helperText={firstName?.touched && errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={(lastName?.value as string) || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          onBlur={() => handleBlur("lastName")}
          error={lastName?.touched && !!errors.lastName}
          helperText={lastName?.touched && errors.lastName}
        />
      </Box>

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="outlined"
        value={(email?.value as string) || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={email?.touched && !!errors.email}
        helperText={email?.touched && errors.email}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={(password?.value as string) || ""}
        onChange={(e) => handleChange("password", e.target.value)}
        onBlur={() => handleBlur("password")}
        error={password?.touched && !!errors.password}
        helperText={password?.touched && errors.password}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 1, py: 1.5, textTransform: 'none', fontSize: '1rem' }}
      >
        Create Account
      </Button>
    </Box>
  );
}
