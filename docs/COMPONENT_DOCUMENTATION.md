# FORMULAR Component Documentation

## Overview

This document provides comprehensive documentation for all React components in the FORMULAR library. These components provide ready-to-use form controls that integrate seamlessly with the FORMULAR form management system.

## Table of Contents

- [Core Form Components](#core-form-components)
- [Input Components](#input-components)
- [Layout Components](#layout-components)
- [Utility Components](#utility-components)
- [Context Providers](#context-providers)
- [Usage Patterns](#usage-patterns)

## Core Form Components

### FormularForm

The main form wrapper component that provides context and manages form submission.

```typescript
interface IFormularProps<T extends object> {
    formular: IFormular<T>
    children: React.ReactNode
    isloading?: boolean
    onSubmit?: (data: Record<string, InputDataTypes>) => void
}
```

**Props:**

- `formular`: The form instance created by FormularManager
- `children`: Form fields and other components
- `isloading`: Optional loading state for the form
- `onSubmit`: Callback function called when form is submitted

**Example:**

```typescript
import FormularForm from '@components/formular-form/formular-form'
import { userFormInstance } from './user-form.instance'

const UserForm = () => {
  const handleSubmit = (data: UserData) => {
    console.log('Form submitted:', data)
    // Handle form submission
  }

  return (
    <FormularForm formular={userFormInstance} onSubmit={handleSubmit}>
      <InputText fieldName="username" />
      <InputText fieldName="email" />
      <button type="submit">Submit</button>
    </FormularForm>
  )
}
```

### FieldSet

Container component that wraps form fields with labels and validation display.

```typescript
interface IFieldSetProps {
    inputId: string
    label?: string
    type?: InputTypeNames
    flags?: IFieldFlags
    children: React.ReactNode
    onClick?: () => void
}
```

**Features:**

- Automatic label association with form controls
- Validation state visualization
- Consistent field styling and layout
- Accessibility support

**Example:**

```typescript
import FieldSet from '@components/field-set/field-set'

<FieldSet
  inputId="username"
  label="Username"
  type="text"
  flags={fieldFlags}
>
  <input {...fieldProps} />
</FieldSet>
```

## Input Components

### InputText

Text input component with full validation and state management.

```typescript
interface IInputTextProps {
    fieldName: string
}
```

**Features:**

- Real-time validation
- Error and guide message display
- Masking support
- Focus and blur state management
- Accessibility attributes

**Example:**

```typescript
import InputText from '@components/input-text/input-text'

// Basic usage
<InputText fieldName="username" />

// With validation schema
const schema = new FieldSchemaBuilder()
  .setName('username')
  .setTypeInput('text')
  .setValidationData(true, Validators.username('username', true).build())
  .build()
```

### Password

Password input with visibility toggle and strength indicators.

```typescript
interface IPasswordProps {
    fieldName: string
}
```

**Features:**

- Password visibility toggle
- Secure input handling
- Validation integration
- Strength indicators (when configured)

**Example:**

```typescript
import Password from '@components/password/password'

<Password fieldName="password" />
```

### Select

Dropdown selection component with option management.

```typescript
interface ISelectProps {
    fieldName: string
}
```

**Features:**

- Dynamic option loading
- Multi-select support (when configured)
- Search and filtering capabilities
- Custom option rendering

**Example:**

```typescript
import Select from '@components/select-input/select-input'

// Options are defined in the field schema
const selectSchema = new FieldSchemaBuilder()
  .setName('country')
  .setTypeInput('select')
  .setOptionData('countries', [
    { id: 'us', label: 'United States', value: 'US' },
    { id: 'ca', label: 'Canada', value: 'CA' }
  ])
  .build()

<Select fieldName="country" />
```

### CheckInput

Checkbox input component for boolean values.

```typescript
interface ICheckInputProps {
    fieldName: string
}
```

**Features:**

- Boolean state management
- Custom styling support
- Validation integration
- Label association

**Example:**

```typescript
import CheckInput from '@components/check-Input/check-Input'

<CheckInput fieldName="agreeToTerms" />
```

### RadioInput

Radio button group component for single selection.

```typescript
interface IRadioInputProps {
    fieldName: string
}
```

**Features:**

- Group management
- Exclusive selection
- Custom styling
- Validation support

**Example:**

```typescript
import RadioInput from '@components/radio-input/radio-input'

// Options defined in schema
<RadioInput fieldName="gender" />
```

### DatePicker

Date selection component with calendar interface.

```typescript
interface IDatePickerProps {
    fieldName: string
    format?: DatePickerFormatsEnum
    onSelectDate?: (startDate?: INDate, endDate?: INDate) => void
}
```

**Features:**

- Calendar popup interface
- Multiple date formats
- Range selection support
- Internationalization
- Validation integration

**Example:**

```typescript
import DatePicker from '@components/date-picker/date-picker'

<DatePicker
  fieldName="birthdate"
  format={DatePickerFormatsEnum.DDMMYYYY}
/>
```

### RangeSlider

Slider component for numeric range selection.

```typescript
interface IRangeSliderProps {
    fieldName: string
}
```

**Features:**

- Visual range selection
- Numeric constraints
- Real-time value updates
- Accessibility support

**Example:**

```typescript
import { RangeSlider } from '@components/range-slider/range-slider'

<RangeSlider fieldName="priceRange" />
```

### RteInputField

Rich text editor component for formatted text input.

```typescript
interface IRteInputFieldProps {
    fieldName: string
}
```

**Features:**

- WYSIWYG editing
- Toolbar customization
- HTML output
- Validation support

**Example:**

```typescript
import RteInputField from '@components/rte-Input/rte-input-field'

<RteInputField fieldName="description" />
```

## Layout Components

### Drawer

Collapsible panel component for additional content.

```typescript
interface IDrawerProps {
    id: string
    children: React.ReactNode
    position: ElementPositionOutputType
    width?: string
    height?: string
}
```

**Features:**

- Multiple positioning options
- Responsive behavior
- Animation support
- Portal rendering

**Example:**

```typescript
import { Drawer } from '@components/drawer/drawer'

<Drawer
  id="settings-drawer"
  position="bottom"
  height="300px"
>
  <SettingsPanel />
</Drawer>
```

### Accordion

Expandable content sections.

```typescript
interface IAccordionProps {
    items: IAccordionItem[]
    multipleExpanded?: boolean
}
```

**Features:**

- Single or multiple expansion
- Custom content support
- Animation transitions
- Keyboard navigation

### SmartTabsContainer

Adaptive tab component that changes layout based on screen size.

```typescript
interface ISmartTabsContainerProps {
    manager: ITabManager
    onSelected: (tab: ITab) => void
}
```

**Features:**

- Responsive layout (horizontal, vertical, dropdown)
- Tab management
- Custom content rendering
- Media query integration

## Utility Components

### Button

Enhanced button component with loading states and variants.

```typescript
interface IButtonProps {
    variant?: VariantNameType
    size?: AppBreakPointSizesType
    disabled?: boolean
    loading?: boolean
    children: React.ReactNode
    onClick?: () => void
}
```

**Features:**

- Multiple variants and sizes
- Loading state management
- Accessibility support
- Custom styling

### ToggleButton

Toggle state button with visual feedback.

```typescript
interface IToggleButtonProps {
    id: string
    name: string
    toggle: boolean
    onToggle: (id: string, newState: boolean) => void
    children: React.ReactNode
}
```

**Features:**

- Toggle state management
- Visual state indicators
- Customizable styling
- Event handling

### Portal / PortalSlot

Components for rendering content outside the normal DOM hierarchy.

```typescript
// Portal - renders children in a specific slot
interface IPortalProps {
    id: string
    slotName: string
    children: React.ReactNode
}

// PortalSlot - creates a target location for portals
interface IPortalSlotProps {
    id: string
    slotName: string
}
```

**Features:**

- DOM hierarchy bypass
- Modal and overlay support
- Event bubbling control
- Multiple slot management

**Example:**

```typescript
import { Portal, PortalSlot } from '@components/portals/portals'

// Create slot
<PortalSlot id="modal-root" slotName="modals" />

// Render into slot
<Portal id="my-modal" slotName="modals">
  <ModalContent />
</Portal>
```

## Context Providers

### AppContextProvider

Main application context provider.

```typescript
interface IAppContext {
    breakpoints?: IMediaBreakpoints
    media?: IMedia
    isMobileDevice: boolean
    debug?: IDebug
    holdScroll: boolean
    setHoldScroll: (hold: boolean) => void
}
```

**Features:**

- Media query management
- Device detection
- Debug information
- Scroll control

### FormularContext

Form-specific context for field management.

```typescript
interface IFormularContext<T extends object> {
    getFields(): IExtendedInput[]
    getFormFlags(): IFormularFlags
    message: string[]
    formInstance: IFormular<T> | undefined
    getField(fieldName: string): IExtendedInput | undefined
}
```

**Features:**

- Form instance access
- Field retrieval
- Form state management
- Message handling

## Usage Patterns

### Basic Form Setup

```typescript
// 1. Define schema
const userSchema: IEntityScheme = {
  name: 'user-form',
  properties: [
    new FieldSchemaBuilder()
      .setName('username')
      .setTypeInput('text')
      .setValidationData(true, Validators.username('username', true).build())
      .build(),
    new FieldSchemaBuilder()
      .setName('email')
      .setTypeInput('email')
      .setValidationData(true, Validators.email('email', true).build())
      .build()
  ]
}

// 2. Create form instance
const userForm = formManager.createFromSchema<UserData>(userSchema)

// 3. Use in component
const UserRegistration = () => (
  <FormularForm formular={userForm} onSubmit={handleSubmit}>
    <InputText fieldName="username" />
    <InputText fieldName="email" />
    <Password fieldName="password" />
    <CheckInput fieldName="agreeToTerms" />
    <button type="submit">Register</button>
  </FormularForm>
)
```

### Custom Validation

```typescript
// Custom validator
const customValidator: IValidationMethodStrategy = {
  name: 'CustomBusinessRule',
  validate: (field) => {
    // Custom logic here
    const isValid = /* your validation logic */
    return newValidationResult(
      isValid,
      field.input.name,
      'CUSTOM_ERROR',
      field.input.validationManager.triggerKeyWordType
    )
  },
  validateAsync: async (field) => {
    // Async validation if needed
    return Promise.resolve(this.validate(field))
  }
}

// Add to field
field.input.validationManager.addValidationStrategy(customValidator)
```

### Dynamic Forms

```typescript
const DynamicForm = () => {
  const [form, setForm] = useState<IFormular<any>>()

  useEffect(() => {
    // Create empty form
    const dynamicForm = formManager.createEmpty('dynamic-form')

    // Add fields based on conditions
    const fields = createFieldsBasedOnConditions()
    dynamicForm.addFields(...fields)

    setForm(dynamicForm)
  }, [])

  return form ? (
    <FormularForm formular={form} onSubmit={handleSubmit}>
      {/* Render fields dynamically */}
      {form.fields.map(field =>
        <FieldRenderer key={field.input.name} field={field} />
      )}
    </FormularForm>
  ) : null
}
```

### Responsive Layout

```typescript
const ResponsiveForm = () => {
  const { media } = useAppContext()

  return (
    <FormularForm formular={form} onSubmit={handleSubmit}>
      <div className={`form-layout ${media?.media === 'xs' ? 'mobile' : 'desktop'}`}>
        <InputText fieldName="username" />
        <InputText fieldName="email" />

        {/* Conditional rendering based on screen size */}
        {['md', 'lg', 'xl'].includes(media?.media || '') ? (
          <div className="side-by-side">
            <InputText fieldName="firstName" />
            <InputText fieldName="lastName" />
          </div>
        ) : (
          <>
            <InputText fieldName="firstName" />
            <InputText fieldName="lastName" />
          </>
        )}
      </div>
    </FormularForm>
  )
}
```

## Best Practices

1. **Component Composition**: Build complex forms by composing simple components
2. **Validation Strategy**: Define validation at the schema level for consistency
3. **Error Handling**: Always handle form submission errors gracefully
4. **Accessibility**: Use proper labels and ARIA attributes
5. **Performance**: Leverage React.memo for complex form components
6. **Testing**: Use the provided field mocks for unit testing
7. **Responsive Design**: Consider mobile-first design principles
8. **User Experience**: Provide clear validation feedback and loading states

For more detailed implementation examples, see the demo files in the `src/demo` directory.
