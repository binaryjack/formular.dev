'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { f } from 'formular.dev';

// Supported Countries for the International Scenario
type CountryCode = 'CH' | 'FR' | 'US' | 'DE';

interface CountryConfig {
  readonly code: CountryCode;
  readonly name: string;
  readonly flag: string;
  readonly idLabel: string;
  readonly idPlaceholder: string;
  readonly idPatternDescription: string;
  readonly postalPlaceholder: string;
  readonly postalPattern: RegExp;
  readonly idValidator: (value: string) => boolean;
}

const COUNTRIES_CONFIG: Record<CountryCode, CountryConfig> = {
  CH: {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    idLabel: 'Swiss AHV / AVS Number',
    idPlaceholder: '756.1234.5678.97',
    idPatternDescription: 'Format: 756.xxxx.xxxx.xx (13 digits)',
    postalPlaceholder: '8001 (4 digits)',
    postalPattern: /^[1-9][0-9]{3}$/,
    idValidator: (v: string) => /^756\.\d{4}\.\d{4}\.\d{2}$/.test(v),
  },
  FR: {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    idLabel: 'French NIR / Numéro Sécu',
    idPlaceholder: '1 85 05 75 123 456 78',
    idPatternDescription: 'Format: 13 digits + 2-digit key',
    postalPlaceholder: '75008 (5 digits)',
    postalPattern: /^[0-9]{5}$/,
    idValidator: (v: string) => /^(\d{1}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{2}|\d{15})$/.test(v.trim()),
  },
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    idLabel: 'US Social Security Number (SSN)',
    idPlaceholder: '123-45-6789',
    idPatternDescription: 'Format: xxx-xx-xxxx',
    postalPlaceholder: '90210 (5 digits or ZIP+4)',
    postalPattern: /^\d{5}(-\d{4})?$/,
    idValidator: (v: string) => /^\d{3}-\d{2}-\d{4}$/.test(v),
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    idLabel: 'German Tax ID (Steuer-ID)',
    idPlaceholder: '12 345 678 901',
    idPatternDescription: 'Format: 11 numeric digits',
    postalPlaceholder: '10115 (5 digits)',
    postalPattern: /^[0-9]{5}$/,
    idValidator: (v: string) => /^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(v.trim()) || /^\d{11}$/.test(v.trim()),
  },
};

type ScenarioType = 'enterprise' | 'international' | 'billing';

export function LiveValidationLab() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('enterprise');
  const [activeTab, setActiveTab] = useState<'schema' | 'state' | 'adapters'>('schema');
  const [adapterLang, setAdapterLang] = useState<'react' | 'vue' | 'svelte' | 'vanilla'>('react');
  const [isCopied, setIsCopied] = useState(false);

  // Scenario 1: Enterprise Registration State
  const [enterpriseData, setEnterpriseData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@enterprise.com',
    password: 'SuperSecret123!',
    role: 'architect',
    acceptTerms: true,
  });

  // Scenario 2: International Compliance State
  const [internationalCountry, setInternationalCountry] = useState<CountryCode>('CH');
  const [internationalData, setInternationalData] = useState({
    country: 'CH' as CountryCode,
    nationalId: '756.9214.3812.44',
    postalCode: '8001',
    phone: '+41 44 123 45 67',
  });

  // Scenario 3: Conditional Billing State
  const [billingData, setBillingData] = useState({
    accountType: 'enterprise' as 'individual' | 'enterprise',
    billingEmail: 'billing@acme.corp',
    companyName: 'Acme Technologies Ltd',
    vatNumber: 'CHE-123.456.789 MWST',
    poReference: 'PO-2026-8841',
  });

  // Enterprise Schema
  const enterpriseSchema = useMemo(() => {
    return f.object({
      fullName: f.string().min(2).max(50).nonempty(),
      email: f.string().email().nonempty(),
      password: f.string().min(8).pattern(/[A-Z]/, 'Must include uppercase').pattern(/[0-9]/, 'Must include number'),
      role: f.enum(['architect', 'frontend_lead', 'devops', 'security']),
      acceptTerms: f.boolean().refine((val: boolean) => val === true, { message: 'You must accept the enterprise terms' }),
    });
  }, []);

  // Pure useMemo evaluation with performance measurement (SSR safe, zero re-render loops)
  const validationState = useMemo(() => {
    const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
    let result: {
      isValid: boolean;
      errors: Record<string, string>;
      values: Record<string, unknown>;
    };

    if (activeScenario === 'enterprise') {
      const parsed = enterpriseSchema.safeParse(enterpriseData);
      const errors: Record<string, string> = {};
      if (!parsed.success) {
        // Evaluate per-field
        const nameRes = enterpriseSchema.shape.fullName.safeParse(enterpriseData.fullName);
        if (!nameRes.success) errors.fullName = nameRes.error?.message || 'Invalid name';

        const emailRes = enterpriseSchema.shape.email.safeParse(enterpriseData.email);
        if (!emailRes.success) errors.email = emailRes.error?.message || 'Invalid email address';

        const passRes = enterpriseSchema.shape.password.safeParse(enterpriseData.password);
        if (!passRes.success) errors.password = passRes.error?.message || 'Must be >= 8 chars with uppercase and number';

        if (!enterpriseData.acceptTerms) errors.acceptTerms = 'Enterprise terms must be accepted';
      }
      result = {
        isValid: parsed.success,
        errors,
        values: enterpriseData,
      };
    } else if (activeScenario === 'international') {
      const config = COUNTRIES_CONFIG[internationalCountry];
      const errors: Record<string, string> = {};

      if (!config.idValidator(internationalData.nationalId)) {
        errors.nationalId = `Invalid format for ${config.name}. ${config.idPatternDescription}`;
      }
      if (!config.postalPattern.test(internationalData.postalCode)) {
        errors.postalCode = `Invalid postal code for ${config.name} (e.g. ${config.postalPlaceholder})`;
      }
      if (!internationalData.phone || internationalData.phone.length < 8) {
        errors.phone = 'Phone number is required with country prefix';
      }

      result = {
        isValid: Object.keys(errors).length === 0,
        errors,
        values: { ...internationalData, country: internationalCountry },
      };
    } else {
      // Billing scenario
      const errors: Record<string, string> = {};
      if (!billingData.billingEmail || !billingData.billingEmail.includes('@')) {
        errors.billingEmail = 'Valid billing email required';
      }
      if (billingData.accountType === 'enterprise') {
        if (!billingData.companyName || billingData.companyName.trim().length < 3) {
          errors.companyName = 'Company name required (min 3 characters)';
        }
        if (!billingData.vatNumber || billingData.vatNumber.trim().length < 5) {
          errors.vatNumber = 'Valid corporate VAT / Tax ID required';
        }
      }
      result = {
        isValid: Object.keys(errors).length === 0,
        errors,
        values: billingData,
      };
    }

    const t1 = typeof performance !== 'undefined' ? performance.now() : 0;
    const duration = Math.max(0.12, +(t1 - t0).toFixed(2));

    return {
      ...result,
      latencyMs: duration,
    };
  }, [activeScenario, enterpriseData, enterpriseSchema, internationalCountry, internationalData, billingData]);

  // Preset Handlers
  const handleLoadValidPreset = () => {
    if (activeScenario === 'enterprise') {
      setEnterpriseData({
        fullName: 'Dr. Alex Vance',
        email: 'alex.vance@blackmesa.ch',
        password: 'QuantumSecure99!',
        role: 'architect',
        acceptTerms: true,
      });
    } else if (activeScenario === 'international') {
      setInternationalCountry('CH');
      setInternationalData({
        country: 'CH',
        nationalId: '756.9214.3812.44',
        postalCode: '8001',
        phone: '+41 44 123 45 67',
      });
    } else {
      setBillingData({
        accountType: 'enterprise',
        billingEmail: 'finance@codernic.com',
        companyName: 'Codernic AG',
        vatNumber: 'CHE-982.114.772 TVA',
        poReference: 'PO-2026-904',
      });
    }
  };

  const handleLoadInvalidPreset = () => {
    if (activeScenario === 'enterprise') {
      setEnterpriseData({
        fullName: 'J',
        email: 'bad-email-format',
        password: 'weak',
        role: 'frontend_lead',
        acceptTerms: false,
      });
    } else if (activeScenario === 'international') {
      setInternationalData({
        country: internationalCountry,
        nationalId: 'INVALID_ID_999',
        postalCode: 'ABC-00',
        phone: '12',
      });
    } else {
      setBillingData({
        accountType: 'enterprise',
        billingEmail: 'notanemail',
        companyName: '',
        vatNumber: '',
        poReference: '',
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Schema code generation
  const scenarioSchemaCode = useMemo(() => {
    if (activeScenario === 'enterprise') {
      return `import { f } from 'formular.dev';

export const enterpriseSchema = f.object({
  fullName: f.string().min(2).max(50).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string()
    .min(8)
    .pattern(/[A-Z]/, 'Must contain uppercase')
    .pattern(/[0-9]/, 'Must contain number'),
  role: f.enum(['architect', 'frontend_lead', 'devops', 'security']),
  acceptTerms: f.boolean().refine(val => val === true, {
    message: 'Enterprise compliance terms must be accepted'
  })
});

// Infer complete TypeScript type automatically
export type EnterpriseInput = f.infer<typeof enterpriseSchema>;`;
    } else if (activeScenario === 'international') {
      return `import { f } from 'formular.dev';
import { COUNTRIES } from '@formular/atomos';

export const internationalSchema = f.object({
  country: f.enum(['CH', 'FR', 'US', 'DE']),
  nationalId: f.string().refine((val, ctx) => {
    const country = ctx.parent?.country;
    // Built-in country validator lookup:
    return COUNTRIES[country].validateId(val);
  }, { message: 'Invalid sovereign national identifier format' }),
  postalCode: f.string().refine((val, ctx) => {
    const country = ctx.parent?.country;
    return COUNTRIES[country].postalPattern.test(val);
  }, { message: 'Invalid postal code for target jurisdiction' }),
  phone: f.string().min(8)
});`;
    } else {
      return `import { f } from 'formular.dev';

export const billingSchema = f.object({
  accountType: f.enum(['individual', 'enterprise']),
  billingEmail: f.string().email(),
  // Conditional enterprise fields
  companyName: f.string().optional(),
  vatNumber: f.string().optional(),
  poReference: f.string().optional()
}).refine(data => {
  if (data.accountType === 'enterprise') {
    return Boolean(data.companyName && data.companyName.length >= 3 && data.vatNumber);
  }
  return true;
}, {
  message: 'Corporate accounts require valid company name and verified VAT ID',
  path: ['vatNumber']
});`;
    }
  }, [activeScenario]);

  // Adapter code snippet
  const adapterSnippet = useMemo(() => {
    switch (adapterLang) {
      case 'react':
        return `// 1. Two-step React Adapter (@formular/atomos)
import { FAProvider, FAInput, FAButton } from '@formular/atomos';
import { enterpriseSchema } from './schema';

export function RegistrationForm() {
  const handleSubmit = async (validData) => {
    await api.submit(validData);
  };

  return (
    <FAProvider form={enterpriseSchema} onSubmit={handleSubmit}>
      <FAInput id="fullName" placeholder="Full Name" />
      <FAInput id="email" placeholder="Work Email" />
      <FAButton type="submit">Verify & Register</FAButton>
    </FAProvider>
  );
}`;
      case 'vue':
        return `<!-- 1. Two-step Vue 3 Adapter (Composition API) -->
<script setup lang="ts">
import { useFormular } from '@formular/vue';
import { enterpriseSchema } from './schema';

const { form, errors, submit } = useFormular({
  schema: enterpriseSchema,
  onSubmit: async (data) => await api.submit(data)
});
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.fullName" />
    <span v-if="errors.fullName">{{ errors.fullName }}</span>
    <button type="submit">Register</button>
  </form>
</template>`;
      case 'svelte':
        return `<!-- 1. Two-step Svelte 5 Adapter ($state stores) -->
<script lang="ts">
import { createFormular } from '@formular/svelte';
import { enterpriseSchema } from './schema';

const { values, errors, handleSubmit } = createFormular({
  schema: enterpriseSchema,
  onSubmit: (data) => api.submit(data)
});
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={$values.fullName} />
  {#if $errors.fullName}
    <p class="error">{$errors.fullName}</p>
  {/if}
  <button type="submit">Register</button>
</form>`;
      case 'vanilla':
        return `// 1. Pure Headless Engine (Zero View Dependencies)
import { createForm } from 'formular.dev';
import { enterpriseSchema } from './schema';

const form = await createForm({
  schema: enterpriseSchema,
  defaultValues: { fullName: '', email: '' },
  onSubmit: async (data) => console.log('Validated:', data)
});

// Channel-based sub-millisecond updates
document.getElementById('name-input').addEventListener('input', (e) => {
  form.updateField('fullName', e.target.value);
  console.log('Valid:', form.isValid, 'Errors:', form.errors);
});`;
    }
  }, [adapterLang]);

  return (
    <div id="live-lab" className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            INTERACTIVE VALIDATION LABORATORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Experience Sub-Millisecond Reactive Validation.
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl mt-1">
            Test real-time schema validation with instant error feedback, country-specific compliance rules, and dynamic conditionals.
          </p>
        </div>

        {/* Latency & Health Indicator */}
        <div className="flex items-center gap-3 bg-[#0c0e14] border border-white/[0.04] px-3.5 py-2 rounded-lg">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Engine Cycle</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-indigo-400">~{validationState.latencyMs} ms</span>
              <span className="text-[10px] text-neutral-400">/ field</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/[0.04]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Status</span>
            <span className={`text-xs font-mono font-medium ${validationState.isValid ? 'text-emerald-400' : 'text-amber-400'}`}>
              {validationState.isValid ? '● Valid (100%)' : `● ${Object.keys(validationState.errors).length} Errors`}
            </span>
          </div>
        </div>
      </div>

      {/* Scenarios Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.03] pb-4">
        <span className="text-xs font-mono text-neutral-400 mr-2">SCENARIOS:</span>
        <button
          onClick={() => setActiveScenario('enterprise')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
            activeScenario === 'enterprise'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          1. Enterprise Sign-Up
        </button>
        <button
          onClick={() => setActiveScenario('international')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
            activeScenario === 'international'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          2. Sovereign Country ID (Swiss/FR/US/DE)
        </button>
        <button
          onClick={() => setActiveScenario('billing')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
            activeScenario === 'billing'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          3. Dynamic Conditional Billing
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleLoadValidPreset}
            className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
          >
            ✓ Fill Valid Preset
          </button>
          <button
            onClick={handleLoadInvalidPreset}
            className="px-2.5 py-1 rounded text-xs font-mono bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
          >
            ✕ Fill Edge Case
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Form Widget */}
        <div className="lg:col-span-6 bg-[#0c0e14] border border-white/[0.04] rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-mono font-semibold text-neutral-200">
                  {activeScenario === 'enterprise' && 'ENTERPRISE IDENTITY SCHEMA'}
                  {activeScenario === 'international' && 'INTERNATIONAL COMPLIANCE SCHEMA'}
                  {activeScenario === 'billing' && 'CONDITIONAL BILLING SCHEMA'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                Live Interactive Mode
              </span>
            </div>

            {/* SCENARIO 1: Enterprise Registration */}
            {activeScenario === 'enterprise' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={enterpriseData.fullName}
                      onChange={(e) => setEnterpriseData({ ...enterpriseData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.fullName
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {!validationState.errors.fullName && enterpriseData.fullName && (
                      <span className="absolute right-3 top-2.5 text-xs text-emerald-400">✓</span>
                    )}
                  </div>
                  {validationState.errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Work Email <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={enterpriseData.email}
                      onChange={(e) => setEnterpriseData({ ...enterpriseData, email: e.target.value })}
                      placeholder="jane.doe@enterprise.com"
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.email
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {!validationState.errors.email && enterpriseData.email && (
                      <span className="absolute right-3 top-2.5 text-xs text-emerald-400">✓</span>
                    )}
                  </div>
                  {validationState.errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Security Password <span className="text-rose-400">* (min 8 chars, 1 uppercase, 1 digit)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={enterpriseData.password}
                      onChange={(e) => setEnterpriseData({ ...enterpriseData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.password
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {!validationState.errors.password && enterpriseData.password && (
                      <span className="absolute right-3 top-2.5 text-xs text-emerald-400">✓</span>
                    )}
                  </div>
                  {validationState.errors.password && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.password}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">Enterprise Role</label>
                    <select
                      value={enterpriseData.role}
                      onChange={(e) => setEnterpriseData({ ...enterpriseData, role: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#08090c] border border-white/[0.04] text-xs text-neutral-100 focus:outline-none focus:border-indigo-500/60"
                    >
                      <option value="architect">Systems Architect</option>
                      <option value="frontend_lead">Frontend Lead</option>
                      <option value="devops">DevOps Lead</option>
                      <option value="security">Security Officer</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={enterpriseData.acceptTerms}
                        onChange={(e) => setEnterpriseData({ ...enterpriseData, acceptTerms: e.target.checked })}
                        className="rounded bg-[#08090c] border-white/[0.04] text-indigo-600 focus:ring-0"
                      />
                      <span>Accept SLA & Privacy Terms</span>
                    </label>
                  </div>
                </div>
                {validationState.errors.acceptTerms && (
                  <p className="text-[11px] text-rose-400 font-mono">{validationState.errors.acceptTerms}</p>
                )}
              </div>
            )}

            {/* SCENARIO 2: International Compliance */}
            {activeScenario === 'international' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Target Jurisdiction</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.keys(COUNTRIES_CONFIG) as CountryCode[]).map((cCode) => {
                      const c = COUNTRIES_CONFIG[cCode];
                      const isSelected = internationalCountry === cCode;
                      return (
                        <button
                          key={cCode}
                          onClick={() => {
                            setInternationalCountry(cCode);
                            // Set suitable placeholder defaults
                            if (cCode === 'CH') {
                              setInternationalData({ country: 'CH', nationalId: '756.9214.3812.44', postalCode: '8001', phone: '+41 44 123 45 67' });
                            } else if (cCode === 'FR') {
                              setInternationalData({ country: 'FR', nationalId: '1 85 05 75 123 456 78', postalCode: '75008', phone: '+33 1 42 68 00 00' });
                            } else if (cCode === 'US') {
                              setInternationalData({ country: 'US', nationalId: '123-45-6789', postalCode: '90210', phone: '+1 415 555 0199' });
                            } else {
                              setInternationalData({ country: 'DE', nationalId: '12 345 678 901', postalCode: '10115', phone: '+49 30 1234567' });
                            }
                          }}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded border text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                              : 'border-white/[0.04] bg-[#08090c] text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    {COUNTRIES_CONFIG[internationalCountry].idLabel} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={internationalData.nationalId}
                      onChange={(e) => setInternationalData({ ...internationalData, nationalId: e.target.value })}
                      placeholder={COUNTRIES_CONFIG[internationalCountry].idPlaceholder}
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.nationalId
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {!validationState.errors.nationalId && internationalData.nationalId && (
                      <span className="absolute right-3 top-2.5 text-xs text-emerald-400">✓</span>
                    )}
                  </div>
                  {validationState.errors.nationalId ? (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.nationalId}</p>
                  ) : (
                    <p className="text-[10px] text-neutral-400 mt-1 font-mono">
                      {COUNTRIES_CONFIG[internationalCountry].idPatternDescription}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Postal Code ({internationalCountry}) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={internationalData.postalCode}
                      onChange={(e) => setInternationalData({ ...internationalData, postalCode: e.target.value })}
                      placeholder={COUNTRIES_CONFIG[internationalCountry].postalPlaceholder}
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.postalCode
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {validationState.errors.postalCode && (
                      <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.postalCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={internationalData.phone}
                      onChange={(e) => setInternationalData({ ...internationalData, phone: e.target.value })}
                      placeholder="+41 ..."
                      className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        validationState.errors.phone
                          ? 'border-rose-500/60 focus:border-rose-400'
                          : 'border-white/[0.04] focus:border-indigo-500/60'
                      }`}
                    />
                    {validationState.errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SCENARIO 3: Conditional Billing */}
            {activeScenario === 'billing' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBillingData({ ...billingData, accountType: 'individual' })}
                      className={`py-2 px-3 rounded border text-xs font-medium transition-all ${
                        billingData.accountType === 'individual'
                          ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                          : 'border-white/[0.04] bg-[#08090c] text-neutral-400 hover:text-white'
                      }`}
                    >
                      Individual Developer
                    </button>
                    <button
                      onClick={() => setBillingData({ ...billingData, accountType: 'enterprise' })}
                      className={`py-2 px-3 rounded border text-xs font-medium transition-all ${
                        billingData.accountType === 'enterprise'
                          ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                          : 'border-white/[0.04] bg-[#08090c] text-neutral-400 hover:text-white'
                      }`}
                    >
                      Corporate Enterprise
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Billing Notification Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={billingData.billingEmail}
                    onChange={(e) => setBillingData({ ...billingData, billingEmail: e.target.value })}
                    placeholder="finance@company.com"
                    className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                      validationState.errors.billingEmail
                        ? 'border-rose-500/60 focus:border-rose-400'
                        : 'border-white/[0.04] focus:border-indigo-500/60'
                    }`}
                  />
                  {validationState.errors.billingEmail && (
                    <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.billingEmail}</p>
                  )}
                </div>

                {billingData.accountType === 'enterprise' && (
                  <div className="space-y-4 p-4 rounded-lg bg-white/[0.015] border border-white/[0.03]">
                    <div className="text-[11px] font-mono text-indigo-300">
                      ⚡ Dynamic Conditional Fields (Corporate Requirements)
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Company Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={billingData.companyName}
                        onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
                        placeholder="Acme Global Inc"
                        className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                          validationState.errors.companyName
                            ? 'border-rose-500/60 focus:border-rose-400'
                            : 'border-white/[0.04] focus:border-indigo-500/60'
                        }`}
                      />
                      {validationState.errors.companyName && (
                        <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.companyName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          VAT / Tax ID <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={billingData.vatNumber}
                          onChange={(e) => setBillingData({ ...billingData, vatNumber: e.target.value })}
                          placeholder="CHE-123.456.789 MWST"
                          className={`w-full px-3 py-2 rounded bg-[#08090c] border text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors ${
                            validationState.errors.vatNumber
                              ? 'border-rose-500/60 focus:border-rose-400'
                              : 'border-white/[0.04] focus:border-indigo-500/60'
                          }`}
                        />
                        {validationState.errors.vatNumber && (
                          <p className="text-[11px] text-rose-400 mt-1 font-mono">{validationState.errors.vatNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          PO Reference (Optional)
                        </label>
                        <input
                          type="text"
                          value={billingData.poReference}
                          onChange={(e) => setBillingData({ ...billingData, poReference: e.target.value })}
                          placeholder="PO-2026-904"
                          className="w-full px-3 py-2 rounded bg-[#08090c] border border-white/[0.04] text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/60"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form Actions Footer */}
          <div className="pt-6 mt-6 border-t border-white/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${validationState.isValid ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="text-xs font-mono text-neutral-400">
                {validationState.isValid ? 'Form is ready to submit' : 'Schema constraints violated'}
              </span>
            </div>

            <button
              type="button"
              disabled={!validationState.isValid}
              className={`px-4 py-2 rounded text-xs font-semibold transition-all ${
                validationState.isValid
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 cursor-pointer'
                  : 'bg-white/[0.04] text-neutral-400 cursor-not-allowed border border-white/[0.03]'
              }`}
            >
              Dispatch Submit →
            </button>
          </div>
        </div>

        {/* Right Column: Code & State Inspector */}
        <div className="lg:col-span-6 bg-[#0c0e14] border border-white/[0.04] rounded-xl overflow-hidden flex flex-col shadow-xl">
          {/* Tabs Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.03] px-4 bg-[#08090c]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('schema')}
                className={`py-3 px-3 text-xs font-mono border-b-2 transition-all ${
                  activeTab === 'schema'
                    ? 'border-indigo-500 text-indigo-300 font-semibold'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Schema Definition
              </button>
              <button
                onClick={() => setActiveTab('state')}
                className={`py-3 px-3 text-xs font-mono border-b-2 transition-all ${
                  activeTab === 'state'
                    ? 'border-indigo-500 text-indigo-300 font-semibold'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Reactive State Inspector
              </button>
              <button
                onClick={() => setActiveTab('adapters')}
                className={`py-3 px-3 text-xs font-mono border-b-2 transition-all ${
                  activeTab === 'adapters'
                    ? 'border-indigo-500 text-indigo-300 font-semibold'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Headless Portability
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopyCode(activeTab === 'schema' ? scenarioSchemaCode : activeTab === 'adapters' ? adapterSnippet : JSON.stringify(validationState, null, 2))}
              className="text-[11px] font-mono text-neutral-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              {isCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 flex-1 flex flex-col bg-[#07080b]">
            {activeTab === 'schema' && (
              <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed p-2 flex-1">
                <code>{scenarioSchemaCode}</code>
              </pre>
            )}

            {activeTab === 'state' && (
              <div className="flex flex-col h-full space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#0c0e14] border border-white/[0.03]">
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">Valid State</span>
                    <span className={`text-xs font-mono font-bold ${validationState.isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {validationState.isValid ? 'true' : 'false'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0c0e14] border border-white/[0.03]">
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">Validation Latency</span>
                    <span className="text-xs font-mono font-bold text-indigo-400">{validationState.latencyMs} ms</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#0c0e14] border border-white/[0.03]">
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">Error Count</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {Object.keys(validationState.errors).length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-auto rounded bg-[#08090c] p-3 border border-white/[0.03]">
                  <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                    {JSON.stringify(
                      {
                        status: validationState.isValid ? 'VALID' : 'INVALID',
                        latencyMs: validationState.latencyMs,
                        activeJurisdiction: activeScenario === 'international' ? internationalCountry : 'DEFAULT',
                        errors: validationState.errors,
                        payload: validationState.values,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'adapters' && (
              <div className="flex flex-col h-full space-y-3">
                <div className="flex items-center gap-1.5 border-b border-white/[0.03] pb-2">
                  <span className="text-[11px] font-mono text-neutral-400 mr-2">Target Framework:</span>
                  <button
                    onClick={() => setAdapterLang('react')}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      adapterLang === 'react' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    React (@formular/atomos)
                  </button>
                  <button
                    onClick={() => setAdapterLang('vue')}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      adapterLang === 'vue' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Vue 3
                  </button>
                  <button
                    onClick={() => setAdapterLang('svelte')}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      adapterLang === 'svelte' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Svelte 5
                  </button>
                  <button
                    onClick={() => setAdapterLang('vanilla')}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      adapterLang === 'vanilla' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Vanilla JS
                  </button>
                </div>

                <pre className="text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed p-2 flex-1">
                  <code>{adapterSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
