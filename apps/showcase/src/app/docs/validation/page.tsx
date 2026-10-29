import React from "react";

export default function ValidationPage() {
  return (
    <>
      <h1>Validation Engine</h1>
      <p className="lead">
        The schema builder <code>f</code> provides a fluent, zero-dependency interface to build complex validation structures with 100% type safety.
      </p>

      <h2>Supported Data Types</h2>
      <ul>
        <li><code>f.string()</code>: Matches string values.</li>
        <li><code>f.number()</code>: Matches numeric values.</li>
        <li><code>f.boolean()</code>: Matches boolean values.</li>
        <li><code>f.date()</code>: Matches Date objects.</li>
        <li><code>f.array(schema)</code>: Matches an array of elements.</li>
        <li><code>f.object(shape)</code>: Matches an object conforming to the given shape.</li>
      </ul>

      <h2>Built-in Modifiers and Constraints</h2>
      <p>Every schema type supports standard modifiers:</p>
      <ul>
        <li><code>.optional()</code>: Allows undefined values.</li>
        <li><code>.nullable()</code>: Allows null values.</li>
        <li><code>.default(value)</code>: Sets a fallback value.</li>
        <li><code>.refine(predicate)</code>: Applies a custom validation function.</li>
      </ul>

      <h3>String Constraints</h3>
      <pre>
        <code className="language-typescript">
{`f.string()
  .email()             // Format check for email
  .url()               // Format check for URL
  .min(length)         // Minimum character length
  .max(length)         // Maximum character length
  .length(exact)       // Exact character length
  .pattern(regex)      // Custom regular expression match
  .nonempty()          // Requires a non-empty string`}
        </code>
      </pre>

      <h3>Number Constraints</h3>
      <pre>
        <code className="language-typescript">
{`f.number()
  .min(value)          // Minimum value
  .max(value)          // Maximum value
  .int()               // Requires an integer
  .positive()          // Greater than zero
  .safe();             // Within MAX_SAFE_INTEGER`}
        </code>
      </pre>

      <h2>Country-Specific Validation</h2>
      <p>Validation for country-specific fields is built into the string schema builder natively:</p>
      <pre>
        <code className="language-typescript">
{`// Phone number validation (CH, US, UK, FR, DE, IT, ES, CA, etc.)
f.string().phone('CH');

// Postal/ZIP code validation
f.string().postalCode('US');

// Swiss AHV (social security number) validation
f.string().ahv();`}
        </code>
      </pre>

      <h2>Error Handling</h2>
      <p>Validation failures automatically propagate to the UI via the adapter. If executed programmatically, they throw a specialized <code>SchemaValidationError</code>:</p>
      <pre>
        <code className="language-typescript">
{`try {
    await form.submit();
} catch (error) {
    if (error instanceof SchemaValidationError) {
        console.error('Validation error path:', error.path); 
        console.error('List of errors:', error.errors);
    }
}`}
        </code>
      </pre>
    </>
  );
}
