# 🚀 Quick Start Guide - DatePicker v3

## In 3 Minutes

### 1️⃣ Copy the Folder (1 minute)

```bash
# Copy the entire date-picker_v3 folder to your project
cp -r date-picker_v3 /your-project/src/components/
```

### 2️⃣ Import and Use (1 minute)

```tsx
import DatePickerV3 from './components/date-picker_v3'
import './components/date-picker_v3/date-picker.css'
import { useState } from 'react'

function App() {
    const [date, setDate] = useState<Date>()

    return (
        <div>
            <h1>My App</h1>
            <DatePickerV3 onChange={setDate} />
            {date && <p>Selected: {date.toLocaleDateString()}</p>}
        </div>
    )
}
```

### 3️⃣ That's It! (0 minutes) ✅

No configuration needed. No additional dependencies. Just works.

---

## Common Use Cases

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form'

function MyForm() {
    const { control } = useForm()

    return (
        <Controller
            name="date"
            control={control}
            render={({ field }) => <DatePickerV3 value={field.value} onChange={field.onChange} />}
        />
    )
}
```

### With Validation

```tsx
const [date, setDate] = useState<Date>()
const [error, setError] = useState<string>()

const validate = (date?: Date) => {
    if (!date) {
        setError('Required')
        return false
    }
    if (date < new Date()) {
        setError('Must be future date')
        return false
    }
    setError(undefined)
    return true
}

;<div>
    <DatePickerV3
        value={date}
        onChange={(d) => {
            setDate(d)
            validate(d)
        }}
    />
    {error && <span className="error">{error}</span>}
</div>
```

### Range Selection

```tsx
<DatePickerV3
    defaultSelectionMode="range"
    onChange={(start, end) => {
        console.log('From:', start)
        console.log('To:', end)
    }}
/>
```

---

## Props Cheat Sheet

| Prop                   | Type                    | Example                                      |
| ---------------------- | ----------------------- | -------------------------------------------- |
| `value`                | `Date`                  | `value={selectedDate}`                       |
| `onChange`             | `(date?: Date) => void` | `onChange={setDate}`                         |
| `displayFormat`        | `DateFormatsEnum`       | `displayFormat={DateFormatsEnum.MM_DD_YYYY}` |
| `separator`            | `string`                | `separator="/"`                              |
| `defaultSelectionMode` | `'single' \| 'range'`   | `defaultSelectionMode="range"`               |
| `disabled`             | `boolean`               | `disabled={true}`                            |
| `placeholder`          | `string`                | `placeholder="Pick date"`                    |

---

## Keyboard Shortcuts

- **↓ / Enter** - Open calendar
- **Esc** - Close calendar
- **Delete** - Clear selection
- **← →** - Navigate dates
- **Y / M / D** - Switch view mode
- **N** - Jump to today
- **S** - Jump to selection

---

## Need More?

📖 See [README.md](./README.md) for full documentation  
📝 See [examples.tsx](./examples.tsx) for more examples  
🔄 See [MIGRATION.md](./MIGRATION.md) for migration from FORMULAR
