# FieldInput Usage Guide

The `FieldInput` object is a core component in the `SignalsPatternsReact` project. It provides a robust API for managing form fields, including validation, state management, and interaction handling. Below is a guide on how to use the `FieldInput` object effectively.

---

## 1. **Creating a FieldInput Instance**

To create a `FieldInput` instance, use the `FieldInputCreator` utility. This ensures the proper setup of the field with all required configurations.

```tsx
import { FieldInputCreator } from './FieldInput.creator';
import { IFieldSchemaBuilder } from '../../../dependency/schema/fieldSchema/field.schema.types';

// Example: Creating a new field from a schema builder
const fieldSchemaBuilder: IFieldSchemaBuilder = /* schema builder setup */;
const field = FieldInputCreator.newFieldFromBuilder(
    fieldSchemaBuilder,
    objectConverterFunction,
    schemaToDescriptorConverterFunction
);
```

---

## 2. **Registering Field Events**

The `FieldInput` object provides a `register` method to bind event handlers for the field. This is typically used in JSX components.

```tsx
import React from 'react'

const MyInputComponent = ({ field }) => {
    return <input {...field.register()} ref={field.ref()} className="my-input" />
}
```

---

## 3. **Handling Field State**

The `FieldInput` object provides methods to manage its state, such as `setFocus`, `clear`, and `setValue`.

### Example: Setting Focus

```tsx
field.setFocus()
```

### Example: Clearing the Field

```tsx
field.clear()
```

### Example: Setting a Value

```tsx
field.setValue('New Value')
```

---

## 4. **Validating a Field**

The `validate` method allows you to validate the field using a custom validator.

```tsx
import validator from '../validatiors/validator.strategy'

const validationResults = field.validate(validator)
console.log(validationResults)
```

---

## 5. **Listening for Changes**

You can subscribe to field changes using the `hasChanges` method.

```tsx
field.hasChanges(() => {
    console.log('Field value changed:', field.get())
})
```

---

## 6. **Using Field Flags**

The `getFlagsObject` method provides an object containing the field's state flags, such as `isDirty`, `isValid`, and `isFocus`.

```tsx
const flags = field.getFlagsObject()
console.log(flags.isDirty, flags.isValid, flags.isFocus)
```

---

## 7. **Example: Full Integration in a Component**

Below is an example of integrating a `FieldInput` into a React component:

```tsx
import React from 'react'
import { FieldInputCreator } from './FieldInput.creator'

const MyFormComponent = () => {
    const field = FieldInputCreator.newFieldFromDescriptor({
        id: 1,
        name: 'exampleField',
        label: 'Example Field',
        type: 'text',
        value: '',
        validationOptions: { required: { required: true } },
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true
    })

    return (
        <div>
            <label htmlFor={field.name}>{field.label}</label>
            <input {...field.register()} ref={field.ref()} className="form-input" />
            <button onClick={() => field.setFocus()}>Focus</button>
            <button onClick={() => field.clear()}>Clear</button>
        </div>
    )
}

export default MyFormComponent
```

---

## 8. **Advanced: Handling Options for Select or Radio Fields**

For fields with options (e.g., `select`, `radio`), use the `registerOption` and `refOption` methods.

```tsx
field.options.forEach((option) => {
    return (
        <div key={option.id}>
            <input
                {...field.registerOption()}
                ref={field.refOption(option.ref)}
                value={option.value}
            />
            <label>{option.text}</label>
        </div>
    )
})
```

---

## 9. **FieldInput Lifecycle**

The `FieldInput` object automatically sets up observers and validation triggers during its lifecycle. Ensure you call `setup` if you manually create a `FieldInput` instance.

```tsx
field.setup()
```

---

## 10. **Debugging FieldInput**

Use the `FormyDebug` component to debug fields in a form.

```tsx
import FormyDebug from '../Formy/Formy.debug'

;<FormyDebug formy={formInstance} />
```

---

This guide provides a comprehensive overview of the `FieldInput` object and its usage. For more advanced use cases, refer to the source code and explore the `FieldInput` API further.
