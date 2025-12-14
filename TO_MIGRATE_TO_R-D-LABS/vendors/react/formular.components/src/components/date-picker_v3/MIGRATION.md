# Migration Guide: FORMULAR DatePicker → Standalone v3

## Quick Comparison

| Feature          | FORMULAR Version                         | Standalone v3   |
| ---------------- | ---------------------------------------- | --------------- |
| Form Integration | ✅ Required                              | ❌ Not needed   |
| Dependencies     | formular.dev.lib, formular.design.system | React only      |
| State Management | Form instance                            | Component props |
| Validation       | Built-in                                 | External        |
| Styling          | Design system                            | Custom CSS      |
| Icons            | react-icons                              | Embedded SVG    |

## Migration Steps

### 1. Replace Import

**Before (FORMULAR):**

```tsx
import DatePicker from '@components/date-picker/date-picker'
import { DateFormatsEnum } from 'formular.dev.lib'
```

**After (v3):**

```tsx
import DatePickerV3, { DateFormatsEnum } from './date-picker_v3'
import './date-picker_v3/date-picker.css'
```

### 2. Update Component Usage

**Before (FORMULAR - with form):**

```tsx
<FormularForm formular={myFormInstance}>
    <DatePicker
        fieldName="birthDate"
        separator="/"
        dataFormat={DateFormatsEnum.YYYY_MM_DD}
        displayFormat={DateFormatsEnum.DD_MM_YYYY}
    />
</FormularForm>
```

**After (v3 - standalone):**

```tsx
const [birthDate, setBirthDate] = useState<Date>()

<DatePickerV3
    id="birthDate"
    value={birthDate}
    onChange={(date) => setBirthDate(date)}
    separator="/"
    dataFormat={DateFormatsEnum.YYYY_MM_DD}
    displayFormat={DateFormatsEnum.DD_MM_YYYY}
/>
```

### 3. Prop Changes

| FORMULAR Prop          | v3 Equivalent          | Notes                     |
| ---------------------- | ---------------------- | ------------------------- |
| `fieldName`            | `id`                   | Just an identifier now    |
| N/A                    | `value`                | NEW: Controlled value     |
| N/A                    | `defaultValue`         | NEW: Uncontrolled default |
| N/A                    | `onChange`             | NEW: Required callback    |
| N/A                    | `onClear`              | NEW: Clear callback       |
| `separator`            | `separator`            | ✅ Same                   |
| `dataFormat`           | `dataFormat`           | ✅ Same                   |
| `displayFormat`        | `displayFormat`        | ✅ Same                   |
| `defaultSelectionMode` | `defaultSelectionMode` | ✅ Same                   |

### 4. Handle Validation Externally

**Before (FORMULAR - built-in):**

```tsx
const schema = {
    properties: [
        DateBuilder.setId(1)
            .setName('eventDate')
            .setValidationData(true, Validators.date('eventDate', true).build())
            .build()
    ]
}
```

**After (v3 - external validation):**

```tsx
const [eventDate, setEventDate] = useState<Date>()
const [error, setError] = useState<string>()

const validateDate = (date?: Date) => {
    if (!date) {
        setError('Date is required')
        return false
    }
    setError(undefined)
    return true
}

;<div>
    <DatePickerV3
        id="eventDate"
        value={eventDate}
        onChange={(date) => {
            setEventDate(date)
            validateDate(date)
        }}
    />
    {error && <span className="error">{error}</span>}
</div>
```

### 5. Form Integration Pattern

**With React Hook Form:**

```tsx
import { Controller, useForm } from 'react-hook-form'

function MyForm() {
    const { control, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Controller
                name="eventDate"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field, fieldState }) => (
                    <div>
                        <DatePickerV3
                            id="eventDate"
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {fieldState.error && <span>{fieldState.error.message}</span>}
                    </div>
                )}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

## What You Gain

✅ **Portability** - Copy folder to any React project  
✅ **Simplicity** - No complex form system required  
✅ **Flexibility** - Use with any form library  
✅ **Independence** - No external library dependencies  
✅ **Lightweight** - Smaller bundle size

## What You Lose

❌ **Automatic form integration** - Manual state management  
❌ **Built-in validation** - Handle externally  
❌ **Design system styling** - Provide your own CSS  
❌ **Configuration context** - Props-based config only

## When to Use Each

### Use FORMULAR Version When:

- Working within the FORMULAR ecosystem
- Need integrated validation
- Want design system consistency
- Building complex forms with many fields

### Use Standalone v3 When:

- Building a standalone component library
- Need maximum portability
- Using different form libraries
- Want minimal dependencies
- Building non-FORMULAR projects

## Troubleshooting

### Issue: Date not updating

**Solution:** Make sure you're using controlled mode correctly:

```tsx
// ❌ Wrong
<DatePickerV3 onChange={setDate} />

// ✅ Correct
<DatePickerV3 value={date} onChange={setDate} />
```

### Issue: Styling doesn't match

**Solution:** Import the CSS file:

```tsx
import './date-picker_v3/date-picker.css'
```

### Issue: TypeScript errors

**Solution:** Update your imports to use the local types:

```tsx
import { DateFormatsEnum } from './date-picker_v3/utils/date-utils'
```

---

Need help? Check the [README.md](./README.md) for full documentation.
