# DatePicker v3 - Standalone Component

A fully standalone, framework-agnostic React DatePicker component that **does not require FORMULAR form integration**.

## 📁 Portable Package

This entire `date-picker_v3` folder can be copied to any React project. All dependencies are included or minimal.

## ✨ Features

- ✅ **No FORMULAR form dependency** - Works standalone
- ✅ **Self-contained** - All utilities and hooks included
- ✅ **Toggleable drawer** interface
- ✅ **Keyboard navigation** (Arrow keys, shortcuts)
- ✅ **Single or range** date selection
- ✅ **Day/Month/Year** view modes
- ✅ **Customizable formats** and separators
- ✅ **Controlled & uncontrolled** modes

## 📦 What's Included

```
date-picker_v3/
├── core/                          # Date logic (pure functions)
│   ├── computed/                  # Grid computation
│   ├── constructors/              # Cell factories
│   ├── getters/                   # Date navigation
│   ├── models/                    # Type definitions
│   └── date-picker.types.ts       # Core types
│
├── components/                    # React components
│   ├── date-picker.body.*.tsx     # Grid views
│   ├── date-picker.cell.tsx       # Cell component
│   ├── date-picker.context.ts     # Context provider
│   ├── date-picker.header.tsx     # Navigation header
│   └── date-picker.switch.tsx     # Mode switcher
│
├── toggleable/                    # Toggleable wrapper
│   ├── toggleable.tsx             # Provider
│   ├── toggleable.context.ts      # Context
│   └── toggleable.context.hook.ts # Hook
│
├── hooks/                         # React hooks
│   ├── use-key-bindings.ts        # Keyboard handling
│   └── use-object-ref.ts          # Ref utilities
│
├── internal-components/           # Simple internal components
│   ├── button.tsx                 # Button component
│   ├── icons.tsx                  # SVG icons
│   └── portal.tsx                 # Portal system
│
├── utils/                         # Utilities
│   ├── class-utils.ts             # className helpers
│   └── date-utils.ts              # Date formatting
│
├── date-picker.tsx                # Main component (FORMULAR-free)
├── date-picker.drawer.content.tsx # Drawer logic
├── date-picker.drawer.content.ui.tsx # Drawer UI
└── README.md                      # This file
```

## 🚀 Usage

### Basic Example

```tsx
import DatePickerV3, { DateFormatsEnum } from './date-picker_v3/date-picker'

function MyComponent() {
    const [selectedDate, setSelectedDate] = useState<Date>()

    return (
        <DatePickerV3
            id="my-date-picker"
            onChange={(date) => setSelectedDate(date)}
            placeholder="Select a date..."
        />
    )
}
```

### Controlled Mode

```tsx
<DatePickerV3
    value={selectedDate}
    onChange={setSelectedDate}
    displayFormat={DateFormatsEnum.MM_DD_YYYY}
    separator="/"
/>
```

### Range Selection

```tsx
<DatePickerV3
    defaultSelectionMode="range"
    onChange={(startDate, endDate) => {
        console.log('Range:', startDate, endDate)
    }}
/>
```

### With Custom Formats

```tsx
<DatePickerV3
    displayFormat={DateFormatsEnum.DD_MM_YYYY}
    dataFormat={DateFormatsEnum.YYYY_MM_DD}
    separator="-"
    showFooter={true}
/>
```

## 🎨 Styling

Add your own CSS or use the default classes:

```css
.dp-wrapper {
    /* Container */
}
.dp-input-container {
    /* Input wrapper */
}
.dp-input {
    /* Input field */
}
.dp-clear-btn {
    /* Clear button */
}
.dp-drawer {
    /* Dropdown drawer */
}
.date-picker-container {
    /* Calendar container */
}
.date-picker-header {
    /* Navigation header */
}
.date-picker-body {
    /* Grid body */
}
.date-cell {
    /* Individual cell */
}
.date-cell.selected {
    /* Selected cell */
}
.date-cell.is-now {
    /* Today */
}
```

## ⌨️ Keyboard Shortcuts

- **Arrow Down/Enter**: Open calendar
- **Escape**: Close calendar
- **Delete**: Clear selection
- **Arrow Left/Right**: Navigate dates
- **Y/y**: Switch to year view
- **M/m**: Switch to month view
- **D/d**: Switch to day view
- **N/n**: Jump to today
- **S/s**: Jump to selection
- **Ctrl+Enter**: Close calendar

## 📋 Props API

| Prop                   | Type                               | Default            | Description          |
| ---------------------- | ---------------------------------- | ------------------ | -------------------- |
| `id`                   | string                             | `'date-picker'`    | Unique identifier    |
| `value`                | Date \| string                     | -                  | Controlled value     |
| `defaultValue`         | Date \| string                     | -                  | Uncontrolled default |
| `onChange`             | (start?: Date, end?: Date) => void | -                  | Change handler       |
| `onClear`              | () => void                         | -                  | Clear handler        |
| `separator`            | string                             | `'-'`              | Date separator       |
| `dataFormat`           | DateFormatsEnum                    | `YYYY_MM_DD`       | Storage format       |
| `displayFormat`        | DateFormatsEnum                    | `DD_MM_YYYY`       | Display format       |
| `defaultSelectionMode` | `'single'` \| `'range'`            | `'single'`         | Selection mode       |
| `showFooter`           | boolean                            | `false`            | Show mode indicators |
| `placeholder`          | string                             | `'Select date...'` | Input placeholder    |
| `className`            | string                             | `''`               | Custom CSS class     |
| `disabled`             | boolean                            | `false`            | Disabled state       |
| `drawerWidth`          | string                             | `'300px'`          | Drawer width         |
| `drawerHeight`         | string                             | `'350px'`          | Drawer height        |

## 🔧 Dependencies

### External (Required)

- `react` >= 16.8.0
- `react-dom` >= 16.8.0

### Internal (All Included)

- All core utilities
- All hooks
- All components
- SVG icons (no react-icons needed)

## 📤 Migration from FORMULAR Version

The main differences:

1. **No `fieldName` prop** - Use `value`/`onChange` instead
2. **No form context** - Component manages its own state
3. **No validation** - Handle externally if needed
4. **No FieldSet wrapper** - Simplified structure
5. **Direct callbacks** - `onChange(date)` instead of form integration

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern browsers with ES6+ support

## 📝 Notes

- This version is **completely independent** from the FORMULAR system
- All date logic is in pure functions (in `core/`)
- The `toggleable` pattern is preserved for consistency
- SVG icons replace react-icons dependency
- Minimal external dependencies for maximum portability

## 🔍 What's Different from Original

**Removed:**

- ❌ FORMULAR form integration
- ❌ `useFormularContext`
- ❌ `useField`, `useFieldDefaultValue`
- ❌ `FieldSet` wrapper
- ❌ `ValidationResultComponent`
- ❌ `useAppContext` / configuration system
- ❌ `Button` component with variant system
- ❌ Complex Portal system
- ❌ react-icons dependency

**Added:**

- ✅ Standalone state management
- ✅ `value` / `onChange` props
- ✅ Simple internal Button component
- ✅ Embedded SVG icons
- ✅ Self-contained portal system
- ✅ Local date utilities
- ✅ className utilities

## 📦 How to Use in Another Project

1. **Copy the entire `date-picker_v3` folder** to your project
2. **Install React** (if not already installed)
3. **Import and use**:

```tsx
import DatePickerV3 from './path/to/date-picker_v3/date-picker'

;<DatePickerV3 onChange={handleDateChange} />
```

4. **Add styling** (optional - component works without)

That's it! No additional setup required.

---

**Created:** December 2025  
**Version:** 3.0.0 (Standalone)  
**License:** Same as parent project
