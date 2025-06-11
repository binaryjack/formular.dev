# Field Schema Builder - Fluent API for Form Creation

The `FieldSchemaBuilder` provides a fluent API for creating form field schemas in a declarative and readable manner. This builder pattern allows you to construct complex field definitions with validation rules, options, and formatting in a chainable, intuitive way.

## Understanding FieldSchemaBuilder

The `FieldSchemaBuilder` implements the `IFieldSchemaBuilder` interface and provides a fluent API for creating `IFieldSchema` objects. These schemas are then converted to `IFieldDescriptor` objects using the `mapSchemaToFieldDescriptor` function.

### Basic Usage

```typescript
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'

// Create a simple text field
const usernameField = new FieldSchemaBuilder()
    .setId(1)
    .setName('username')
    .setTypeInput('text')
    .setDefaultValue('Enter your username')
    .setValidationData(true, {
        required: { value: true },
        minLength: { value: 3 },
        maxLength: { value: 20 }
    })
    .build()
```

## Available Methods

### Core Field Configuration

#### `setId(id: number)`

Sets a unique identifier for the field.

```typescript
const field = new FieldSchemaBuilder()
    .setId(1)
    // ... other configurations
    .build()
```

#### `setName(name: string)`

Sets the field name (used as the property name in data objects).

```typescript
const field = new FieldSchemaBuilder()
    .setName('email')
    // ... other configurations
    .build()
```

#### `setTypeInput(type: InputDataTypes)`

Defines the input type. Available types include:

- `'text'` - Text input
- `'email'` - Email input
- `'password'` - Password input
- `'number'` - Numeric input
- `'date'` - Date picker
- `'select'` - Dropdown selection
- `'radio'` - Radio buttons
- `'checkbox'` - Checkbox
- `'range'` - Range slider
- `'richtext'` - Rich text editor

```typescript
const emailField = new FieldSchemaBuilder().setTypeInput('email').build()

const dateField = new FieldSchemaBuilder().setTypeInput('date').build()
```

### Value Configuration

#### `setDefaultValue(defaultValue: any)`

Sets the initial value for the field.

```typescript
const field = new FieldSchemaBuilder().setDefaultValue('Default text').build()

const numberField = new FieldSchemaBuilder().setTypeInput('number').setDefaultValue(42).build()
```

#### `setExpectedValue(expectedValue: any)`

Sets an expected value for testing or comparison purposes.

```typescript
const field = new FieldSchemaBuilder().setExpectedValue('expected result').build()
```

### Input Formatting

#### `setMask(mask: string)`

Applies input masking for formatted input. Use `#` as numeric placeholder.

```typescript
// Date mask: DD/MM/YYYY
const dateField = new FieldSchemaBuilder().setTypeInput('date').setMask('##/##/####').build()

// Phone mask: +41 XX XXX XX XX
const phoneField = new FieldSchemaBuilder().setTypeInput('text').setMask('+41 ## ### ## ##').build()

// Credit card mask: XXXX XXXX XXXX XXXX
const cardField = new FieldSchemaBuilder()
    .setTypeInput('text')
    .setMask('#### #### #### ####')
    .build()
```

### Options for Select/Radio Fields

#### `setOptionData(target: string | null, options?: IOptionItem[])`

Configures options for select, radio, or checkbox fields.

```typescript
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'

const countryOptions: IOptionItem[] = [
    { sequenceId: 0, name: 'switzerland', value: 'CH', label: 'Switzerland' },
    { sequenceId: 1, name: 'france', value: 'FR', label: 'France' },
    { sequenceId: 2, name: 'germany', value: 'DE', label: 'Germany' }
]

const countryField = new FieldSchemaBuilder()
    .setTypeInput('select')
    .setOptionData('countries', countryOptions)
    .build()

// Radio buttons
const genderField = new FieldSchemaBuilder()
    .setTypeInput('radio')
    .setOptionData('gender', [
        { sequenceId: 0, name: 'male', value: 'M', label: 'Male' },
        { sequenceId: 1, name: 'female', value: 'F', label: 'Female' },
        { sequenceId: 2, name: 'other', value: 'O', label: 'Other' }
    ])
    .build()
```

### Validation Configuration

#### `setValidationData(shouldValidate: boolean, validationData?: IValidationOptions)`

Configures field validation rules.

```typescript
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Basic validation
const emailField = new FieldSchemaBuilder()
    .setTypeInput('email')
    .setValidationData(true, {
        required: { value: true },
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    })
    .build()

// Using validators helper
const usernameField = new FieldSchemaBuilder()
    .setTypeInput('text')
    .setValidationData(true, Validators.username('username', true).build())
    .build()

// Complex validation
const passwordField = new FieldSchemaBuilder()
    .setTypeInput('password')
    .setValidationData(true, {
        required: { value: true },
        minLength: { value: 8 },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            error: {
                message: 'Password must contain uppercase, lowercase, number and special character',
                code: 'pattern',
                name: 'password'
            }
        }
    })
    .build()
```

### Event Configuration

#### `setTriggerKeyWord(triggerKeyWord: EventsType[])`

Sets which events should trigger field processing.

```typescript
const field = new FieldSchemaBuilder().setTriggerKeyWord(['blur', 'keyup', 'change']).build()
```

## Using Preconfigured Builders (Presets)

FORMULAR provides preconfigured builders for common field types in the `builders-preset` folder. These presets save time and ensure consistency across your forms.

### Available Presets

Located in `src/demo/form-demo/field-schema-builder/builders-preset/`:

#### Text Input Builder

```typescript
import { InputTextBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/input-text-builder'

const customTextField = InputTextBuilder.setId(1)
    .setName('description')
    .setValidationData(true, { required: { value: true } })
    .build()
```

#### Date Builder

```typescript
import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'

const birthDateField = DateBuilder.setId(2)
    .setName('birthDate')
    .setValidationData(true, Validators.date('birthDate', true).build())
    .build()
```

#### Select Builder

```typescript
import { SelectIdBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/select-options-id-builder'

const categoryField = SelectIdBuilder.setId(3)
    .setName('category')
    .setOptionData('categories', [
        { sequenceId: 0, name: 'tech', value: 'technology', label: 'Technology' },
        { sequenceId: 1, name: 'business', value: 'business', label: 'Business' }
    ])
    .build()
```

#### Checkbox Builder

```typescript
import { CheckBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/true-false-value-builder'

const agreeField = CheckBuilder.setId(4).setName('agreeToTerms').build()
```

#### Password Builder

```typescript
import { PasswordBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/password-builder'

const passwordField = PasswordBuilder.setId(5)
    .setName('password')
    .setValidationData(true, Validators.password('password', true).build())
    .build()
```

#### Radio Builder

```typescript
import { RadioBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/selected-radio-id-builder'

const priorityField = RadioBuilder.setId(6)
    .setName('priority')
    .setOptionData('priority', [
        { sequenceId: 0, name: 'low', value: 'low', label: 'Low' },
        { sequenceId: 1, name: 'medium', value: 'medium', label: 'Medium' },
        { sequenceId: 2, name: 'high', value: 'high', label: 'High' }
    ])
    .build()
```

#### Range Slider Builder

```typescript
import { RangeBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/range-slider-builder'

const ageField = RangeBuilder.setId(7)
    .setName('age')
    .setValidationData(true, {
        min: { value: 18 },
        max: { value: 100 }
    })
    .build()
```

#### Rich Text Editor Builder

```typescript
import { RteBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/rich-text-field-builder'

const contentField = RteBuilder.setId(8)
    .setName('content')
    .setValidationData(true, { required: { value: true } })
    .build()
```

## Creating Entity Schemas

Combine multiple field builders to create complete entity schemas:

```typescript
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// User registration schema
export const userRegistrationSchema: IEntityScheme = {
    name: 'userRegistration',
    properties: [
        // First Name
        new FieldSchemaBuilder()
            .setId(1)
            .setName('firstName')
            .setTypeInput('text')
            .setValidationData(true, Validators.firstNameValidator('firstName', true).build())
            .build(),

        // Last Name
        new FieldSchemaBuilder()
            .setId(2)
            .setName('lastName')
            .setTypeInput('text')
            .setValidationData(true, Validators.lastNameValidator('lastName', true).build())
            .build(),

        // Email
        new FieldSchemaBuilder()
            .setId(3)
            .setName('email')
            .setTypeInput('email')
            .setValidationData(true, Validators.email('email', true).build())
            .build(),

        // Password
        PasswordBuilder.setId(4)
            .setName('password')
            .setValidationData(true, Validators.password('password', true).build())
            .build(),

        // Country
        SelectIdBuilder.setId(5)
            .setName('country')
            .setOptionData('countries', [
                { sequenceId: 0, name: 'ch', value: 'CH', label: 'Switzerland' },
                { sequenceId: 1, name: 'fr', value: 'FR', label: 'France' },
                { sequenceId: 2, name: 'de', value: 'DE', label: 'Germany' }
            ])
            .setValidationData(true, { required: { value: true } })
            .build(),

        // Terms Agreement
        CheckBuilder.setId(6)
            .setName('agreeToTerms')
            .setValidationData(true, { required: { value: true } })
            .build()
    ]
}
```

## Advanced Patterns

### Conditional Field Building

```typescript
function createUserField(userType: 'admin' | 'user'): IFieldSchema {
    const builder = new FieldSchemaBuilder().setId(1).setName('username').setTypeInput('text')

    if (userType === 'admin') {
        return builder
            .setValidationData(true, {
                required: { value: true },
                minLength: { value: 8 }, // Stricter for admins
                pattern: { value: /^[a-zA-Z0-9_]+$/ }
            })
            .build()
    }

    return builder
        .setValidationData(true, {
            required: { value: true },
            minLength: { value: 3 }
        })
        .build()
}
```

### Dynamic Options Loading

```typescript
async function createCountryField(regionCode: string): Promise<IFieldSchema> {
    const countries = await loadCountriesForRegion(regionCode)

    const options: IOptionItem[] = countries.map((country, index) => ({
        sequenceId: index,
        name: country.code.toLowerCase(),
        value: country.code,
        label: country.name
    }))

    return new FieldSchemaBuilder()
        .setId(1)
        .setName('country')
        .setTypeInput('select')
        .setOptionData('countries', options)
        .setValidationData(true, { required: { value: true } })
        .build()
}
```

### Builder Extension

```typescript
// Create a custom builder for specific domain needs
class SwissAddressFieldBuilder extends FieldSchemaBuilder {
    createNPAField(id: number): IFieldSchema {
        return this.setId(id)
            .setName('npa')
            .setTypeInput('text')
            .setMask('####')
            .setValidationData(true, Validators.swissNPA('npa', true).build())
            .build()
    }

    createAHVField(id: number): IFieldSchema {
        return this.setId(id)
            .setName('ahv')
            .setTypeInput('text')
            .setMask('###.####.####.##')
            .setValidationData(true, Validators.swissAHV('ahv', true).build())
            .build()
    }
}
```

## Best Practices

1. **Use Presets**: Leverage existing presets for common field types
2. **Set Unique IDs**: Always assign unique IDs to avoid conflicts
3. **Chain Methods**: Take advantage of the fluent interface for readability
4. **Validate Early**: Set validation rules during schema creation
5. **Group Related Fields**: Organize fields logically within entity schemas
6. **Use Meaningful Names**: Choose descriptive names for fields and targets
7. **Document Complex Schemas**: Add comments for complex validation rules
8. **Reuse Patterns**: Create custom builders for repeated field patterns

The `FieldSchemaBuilder` provides a powerful and flexible way to create form schemas that can be easily maintained, tested, and extended. Combined with the preset builders, it offers both convenience and customization for any form requirement.
