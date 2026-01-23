# Formular Field Types & UI Component Guide

## 🏗️ Architecture Overview

### **Inheritance Hierarchy**

```
IInputBase (Core)
    ├── value, isValid, isDirty, isPristine
    ├── validationManager, domManager, notificationManager
    ├── handleValidation(), setValue(), getValue()
    └── refreshUi(), register(), ref()
            │
            ├─→ ITextBaseInput (extends IInputBase)
            │   ├── text, email, password, url, tel, number
            │   └── register(), ref(), handleOnChanged()
            │
            ├─→ ICheckBoxBaseInput (extends IInputBase)
            │   ├── checkbox, toggle
            │   ├── checked: boolean
            │   └── register(), ref()
            │
            ├─→ ISelectBaseInput (extends IInputBase)
            │   ├── select, dropdown
            │   ├── options: IOptionItem[]
            │   └── register(), ref(), handleOnSelected()
            │
            ├─→ IRadioBaseInput (extends IInputBase)
            │   ├── radio buttons
            │   ├── options: IOptionItem[]
            │   └── register(), ref()
            │
            ├─→ IOptionBaseInput (extends IInputBase)
            │   ├── autocomplete, combobox
            │   ├── options: IOptionItem[]
            │   └── register(), ref(), handleOnSelected()
            │
            ├─→ IMaskedBaseInput (extends ITextBaseInput)
            │   ├── date, phone, currency
            │   ├── mask: string
            │   └── handleMasking()
            │
            └─→ IDrawerBaseInput (extends IInputBase)
                ├── date picker, color picker
                ├── drawer component
                └── handleDrawerOpen(), handleDrawerClose()
```

### **Key Concept: All Fields Extend IInputBase**

```typescript
// Every field type inherits from IInputBase
interface IInputBase {
    // Core data
    value: InputDataTypes
    originalValue: InputDataTypes

    // Core state
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean

    // Core managers (ALL types have these)
    domManager: IDomManager
    validationManager: IValidationManager
    notificationManager: INotificationManager
    trackingManager: ITrackingManager
    valueManager: IValueManager
    styleManager: IStyleManager

    // Core methods (ALL types have these)
    setValue: (value) => void
    getValue: () => InputDataTypes
    handleValidation: (data) => void
    refreshUi: () => void
    register: () => any // Returns DOM props
    ref: (element) => void
}

// Then each variant adds specific behavior
interface ITextBaseInput extends IInputBase {
    handleOnChanged: (data) => void
    handleOnClear: (data) => void
}

interface ICheckBoxBaseInput extends IInputBase {
    checked: boolean // ← Specific to checkboxes
}

interface ISelectBaseInput extends IInputBase {
    options: IOptionItem[] // ← Specific to selects
    handleOnSelected: (data) => void
}
```

---

## 🎨 UI Components for Each Field Type

### **1. Text Input (TextBaseInput)**

**Types:** `text`, `email`, `password`, `url`, `tel`, `number`

```tsx
// Pulsar Component
const TextInput = ({ field }) => {
    return (
        <div class="field-group">
            <label for={field.name}>{field.label}</label>
            <input
                {...field.register()} // onChange, onBlur, onFocus, etc.
                ref={field.ref()} // DOM reference
                type={field.type} // text, email, password, etc.
                placeholder={field.placeholder}
                disabled={!field.enabled}
            />
            {field.errors.length > 0 && <span class="error">{field.errors[0].message}</span>}
            {field.guides.length > 0 && <span class="guide">{field.guides[0].message}</span>}
        </div>
    )
}
```

**Styling Variants:**

```tsx
// Material Design Style
const MaterialTextInput = ({ field }) => {
    return (
        <div class={`mdc-text-field ${field.isFocus ? 'mdc-text-field--focused' : ''}`}>
            <input
                {...field.register()}
                ref={field.ref()}
                class="mdc-text-field__input"
                id={field.name}
            />
            <label class="mdc-floating-label" for={field.name}>
                {field.label}
            </label>
            <div class="mdc-line-ripple"></div>
        </div>
    )
}

// Tailwind CSS Style
const TailwindTextInput = ({ field }) => {
    return (
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
            <input
                {...field.register()}
                ref={field.ref()}
                class={`
          shadow appearance-none border rounded w-full py-2 px-3 
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${field.isValid && field.isDirty ? 'border-green-500' : ''}
          ${!field.isValid && field.isDirty ? 'border-red-500' : ''}
        `}
            />
        </div>
    )
}
```

---

### **2. Checkbox Input (CheckBoxBaseInput)**

**Types:** `checkbox`, `toggle`

```tsx
// Standard Checkbox
const CheckboxInput = ({ field }) => {
    return (
        <div class="checkbox-group">
            <label class="checkbox-label">
                <input
                    {...field.register()}
                    ref={field.ref()}
                    type="checkbox"
                    checked={field.checked} // ← Checkbox-specific property
                />
                <span>{field.label}</span>
            </label>
        </div>
    )
}

// Toggle Switch Style
const ToggleInput = ({ field }) => {
    return (
        <label class="toggle-switch">
            <input
                {...field.register()}
                ref={field.ref()}
                type="checkbox"
                checked={field.checked}
                class="toggle-input"
            />
            <span class="toggle-slider"></span>
            <span class="toggle-label">{field.label}</span>
        </label>
    )
}
```

**CSS for Toggle:**

```css
.toggle-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.toggle-input {
    display: none;
}

.toggle-slider {
    width: 48px;
    height: 24px;
    background: #ccc;
    border-radius: 24px;
    position: relative;
    transition: 0.3s;
    cursor: pointer;
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: 0.3s;
}

.toggle-input:checked + .toggle-slider {
    background: #4caf50;
}

.toggle-input:checked + .toggle-slider::before {
    transform: translateX(24px);
}
```

---

### **3. Select Input (SelectBaseInput)**

**Types:** `select`, `dropdown`

```tsx
// Standard Select
const SelectInput = ({ field }) => {
    return (
        <div class="select-group">
            <label for={field.name}>{field.label}</label>
            <select {...field.register()} ref={field.ref()} id={field.name}>
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

// Custom Dropdown (styled)
const CustomSelect = ({ field }) => {
    const [isOpen, setIsOpen] = createSignal(false)

    return (
        <div class="custom-select">
            <label>{field.label}</label>
            <button class="select-trigger" onClick={() => setIsOpen(!isOpen())}>
                {field.value || 'Select...'}
                <span class="arrow">▼</span>
            </button>

            {isOpen() && (
                <ul class="select-dropdown">
                    {field.options.map((option) => (
                        <li
                            key={option.id}
                            class={field.value === option.value ? 'selected' : ''}
                            onClick={() => {
                                field.setValue(option.value)
                                field.handleOnSelected({ value: option.value })
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
```

---

### **4. Radio Input (RadioBaseInput)**

**Types:** `radio`

```tsx
// Radio Group
const RadioInput = ({ field }) => {
    return (
        <div class="radio-group">
            <label class="group-label">{field.label}</label>
            {field.options.map((option) => (
                <label key={option.id} class="radio-label">
                    <input
                        {...field.register()}
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={field.value === option.value}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    )
}

// Card-style Radio Buttons
const RadioCards = ({ field }) => {
    return (
        <div class="radio-cards">
            <label class="group-label">{field.label}</label>
            <div class="cards-container">
                {field.options.map((option) => (
                    <label
                        key={option.id}
                        class={`radio-card ${field.value === option.value ? 'selected' : ''}`}
                    >
                        <input
                            {...field.register()}
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={field.value === option.value}
                        />
                        <div class="card-content">
                            <h4>{option.label}</h4>
                            {option.description && <p>{option.description}</p>}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
}
```

---

### **5. Masked Input (IMaskedBaseInput)**

**Types:** `date`, `phone`, `currency`, `ssn`, etc.

```tsx
// Masked Input (extends TextBaseInput)
const MaskedInput = ({ field }) => {
    return (
        <div class="field-group">
            <label for={field.name}>{field.label}</label>
            <input
                {...field.register()}
                ref={field.ref()}
                type="text"
                placeholder={field.mask} // Show mask as placeholder
                // Mask format examples:
                // Phone: "(###) ###-####"
                // Date: "##/##/####"
                // SSN: "###-##-####"
            />
            <span class="mask-guide">Format: {field.mask}</span>
        </div>
    )
}
```

---

### **6. Drawer Input (IDrawerBaseInput)**

**Types:** `date-picker`, `color-picker`, `time-picker`

```tsx
// Date Picker with Drawer
const DatePickerInput = ({ field }) => {
    const [showDrawer, setShowDrawer] = createSignal(false)

    return (
        <div class="datepicker-group">
            <label>{field.label}</label>
            <input
                {...field.register()}
                ref={field.ref()}
                type="text"
                value={field.value}
                onClick={() => setShowDrawer(true)}
                readonly
            />

            {showDrawer() && field.drawer && (
                <div class="drawer-overlay" onClick={() => setShowDrawer(false)}>
                    <div class="drawer-content" onClick={(e) => e.stopPropagation()}>
                        {/* Drawer component (calendar, color palette, etc.) */}
                        <DatePickerCalendar
                            value={field.value}
                            onChange={(date) => {
                                field.setValue(date)
                                setShowDrawer(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
```

---

## 📦 Complete UI Component Library Structure

```
pulsar-formular-ui/
├── components/
│   ├── inputs/
│   │   ├── TextInput.tsx          # text, email, password, etc.
│   │   ├── CheckboxInput.tsx      # checkbox
│   │   ├── ToggleInput.tsx        # toggle switch
│   │   ├── SelectInput.tsx        # select dropdown
│   │   ├── RadioInput.tsx         # radio buttons
│   │   ├── RadioCards.tsx         # card-style radio
│   │   ├── MaskedInput.tsx        # masked inputs
│   │   ├── DatePickerInput.tsx    # date picker with drawer
│   │   └── ColorPickerInput.tsx   # color picker
│   │
│   ├── field-wrapper/
│   │   ├── FieldWrapper.tsx       # Common wrapper for all fields
│   │   ├── FieldLabel.tsx         # Label component
│   │   ├── FieldError.tsx         # Error message
│   │   └── FieldGuide.tsx         # Help text
│   │
│   └── form/
│       ├── Form.tsx               # Form container
│       ├── FormProvider.tsx       # Context provider
│       └── FormButtons.tsx        # Submit, reset buttons
│
├── hooks/
│   ├── useFormular.ts            # Main hook for form access
│   ├── useField.ts               # Hook for individual field
│   └── useFieldDescriptors.ts   # Hook to create fields
│
└── styles/
    ├── base.css                  # Base styles
    ├── themes/
    │   ├── material.css          # Material Design theme
    │   ├── tailwind.css          # Tailwind-inspired theme
    │   └── default.css           # Default theme
    └── components/
        ├── inputs.css
        ├── forms.css
        └── drawers.css
```

---

## 🎯 Universal Field Wrapper Pattern

```tsx
// This works for ALL field types because they all extend IInputBase
const UniversalFieldWrapper = ({ field }) => {
    // Determine which specific component to render
    const InputComponent = getComponentForType(field.type)

    return (
        <div class={`field-wrapper ${field.isDirty ? 'dirty' : 'pristine'}`}>
            {/* Label - all fields have this */}
            <label for={field.name}>
                {field.label}
                {field.validationOptions?.required?.value && <span>*</span>}
            </label>

            {/* The actual input (type-specific) */}
            <InputComponent field={field} />

            {/* Error - all fields can have this */}
            {field.errors.length > 0 && (
                <span class="error-message">{field.errors[0].message}</span>
            )}

            {/* Guide - all fields can have this */}
            {field.guides.length > 0 && (
                <span class="guide-message">{field.guides[0].message}</span>
            )}

            {/* Meta info - all fields have this */}
            <div class="field-meta">
                <span class={field.isDirty ? 'active' : ''}>Dirty</span>
                <span class={field.isValid ? 'active' : ''}>Valid</span>
            </div>
        </div>
    )
}

// Map field types to components
const getComponentForType = (type: string) => {
    const componentMap = {
        text: TextInput,
        email: TextInput,
        password: TextInput,
        number: TextInput,
        checkbox: CheckboxInput,
        toggle: ToggleInput,
        select: SelectInput,
        radio: RadioInput,
        date: DatePickerInput,
        color: ColorPickerInput
    }
    return componentMap[type] || TextInput
}
```

---

## ✅ Summary

**YES, each field type inherits from IInputBase and adds specific behavior:**

| Field Type        | Extends       | Adds                           |
| ----------------- | ------------- | ------------------------------ |
| TextBaseInput     | IInputBase    | handleOnChanged, handleOnClear |
| CheckBoxBaseInput | IInputBase    | checked: boolean               |
| SelectBaseInput   | IInputBase    | options, handleOnSelected      |
| RadioBaseInput    | IInputBase    | options, group behavior        |
| MaskedBaseInput   | TextBaseInput | mask, handleMasking            |
| DrawerBaseInput   | IInputBase    | drawer component, open/close   |

**All fields share:**

- ✅ Core data (value, originalValue)
- ✅ Core state (isValid, isDirty, isPristine)
- ✅ Core managers (DOM, Validation, Notification, etc.)
- ✅ Core methods (register, ref, setValue, getValue)

**Your UI components just need to:**

1. Call `{...field.register()}` for event handlers
2. Call `field.ref()` to give Formular DOM access
3. Render field-specific UI based on field.type
4. All the validation, state management, DOM updates are handled by the field instance itself!
