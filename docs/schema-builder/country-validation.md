# Country-Specific Validation

The `formular.dev` schema builder provides built-in country-specific validators natively as part of the `f.string()` schema interface, enabling rapid internationalized form creation.

## Phone Numbers
Validates phone numbers for specific country codes (e.g., 'US', 'UK', 'CH', 'FR', 'DE', 'IT', 'ES', 'CA', 'AU', 'JP').
```typescript
import { f } from 'formular.dev';

const schema = f.string().phone('CH', 'Invalid Swiss phone number');
```

## Postal Codes
Validates postal codes corresponding to specific country rules.
```typescript
const schema = f.string().postalCode('US', 'Invalid ZIP code');
```

## AHV (Swiss Social Security)
Validates the Swiss AHV social security number with exact format (`756.XXXX.XXXX.XX`) and proper checksum verification using the EAN-13 algorithm.
```typescript
const schema = f.string().ahv('Invalid AHV number');
```

## SSN (US Social Security Number)
While the `ahv()` format is built-in as a named method, US SSN format validation can be accomplished using the built-in `.pattern()` string constraint to enforce the correct 9-digit pattern.
```typescript
const ssnSchema = f.string().pattern(
    /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/, 
    'Invalid US Social Security Number'
);
```
