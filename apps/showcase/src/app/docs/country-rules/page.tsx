import React from "react";

export default function CountryRulesPage() {
  return (
    <>
      <h1>Country-Specific & International Rules</h1>
      <p className="lead">
        Formular ships with built-in or easily configurable international format checks, including strict checksum algorithms for European and Swiss legal compliance.
      </p>

      <h2>1. Swiss AHV / AVS Social Security Number</h2>
      <p>
        Swiss social security numbers must adhere to the 13-digit EAN-13 standard with country prefix <code>756</code> and a valid modulo-10 checksum algorithm.
      </p>
      <pre>
        <code className="language-typescript">
{`import { f } from '@binaryjack/formular.dev'

export const citizenSchema = f.object({
  fullName: f.string().min(2),
  // Validates standard Swiss AHV: 756.xxxx.xxxx.xx with EAN-13 checksum
  ahvNumber: f.string().ahv()
})

// Accepted formats:
// "756.1234.5678.97" (formatted with dots)
// "7561234567897"    (unformatted 13 digits)`}
        </code>
      </pre>

      <div className="p-4 my-4 rounded-lg bg-neutral-900 border border-neutral-800">
        <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Checksum Algorithm</h4>
        <p className="text-xs text-neutral-400 mb-0">
          The 13th digit of the AHV number is verified using the standard EAN-13 alternating weighting factor (1 and 3) modulo 10. Malformed or counterfeit numbers are flagged instantly before server transmission.
        </p>
      </div>

      <h2>2. International IBAN Validation</h2>
      <p>
        Formular supports IBAN verification with ISO 7064 Modulo 97-10 check digit math across 70+ banking jurisdictions:
      </p>
      <pre>
        <code className="language-typescript">
{`export const bankTransferSchema = f.object({
  recipient: f.string().min(2),
  iban: f.string()
    .trim()
    .toUpperCase()
    .refine((val) => {
      // Clean whitespace
      const clean = val.replace(/\\s+/g, '')
      if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$/.test(clean)) return false

      // Rearrange and convert to numeric string
      const rearranged = clean.slice(4) + clean.slice(0, 4)
      const numeric = rearranged.replace(/[A-Z]/g, (ch) => (ch.charCodeAt(0) - 55).toString())

      // Modulo 97 division
      let remainder = 0
      for (let i = 0; i < numeric.length; i += 7) {
        const chunk = remainder + numeric.substring(i, i + 7)
        remainder = parseInt(chunk, 10) % 97
      }
      return remainder === 1
    }, "Invalid IBAN checksum")
})`}
        </code>
      </pre>

      <h2>3. Postal / ZIP Codes by Country</h2>
      <p>
        Validate postal codes with country-specific format requirements:
      </p>
      <pre>
        <code className="language-typescript">
{`export const addressSchema = f.object({
  country: f.enum(["CH", "FR", "DE", "US"] as const),
  postalCode: f.string().postalCode('CH') // Direct helper for CH: 4 digits (1000-9999)
})

// Or dynamic based on selected country:
export const localizedAddressSchema = f.object({
  country: f.string(),
  postalCode: f.string()
}).refine((data) => {
  switch (data.country) {
    case 'CH': return /^[1-9]\\d{3}$/.test(data.postalCode)    // 4 digits
    case 'FR': return /^\\d{5}$/.test(data.postalCode)          // 5 digits
    case 'DE': return /^\\d{5}$/.test(data.postalCode)          // 5 digits
    case 'US': return /^\\d{5}(-\\d{4})?$/.test(data.postalCode) // 5 or 9 digits
    default: return true
  }
}, {
  message: "Invalid postal code format for the selected country",
  path: ["postalCode"]
})`}
        </code>
      </pre>

      <h2>4. International Phone Numbers (E.164)</h2>
      <pre>
        <code className="language-typescript">
{`// Validates international E.164 phone formats (+41 79 123 45 67)
export const contactSchema = f.object({
  phone: f.string().phone('CH') // Built-in validator with country code validation
})`}
        </code>
      </pre>
    </>
  );
}
