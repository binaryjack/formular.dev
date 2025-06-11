# Field Descriptor - The Foundation of FORMULAR

The `IFieldDescriptor` interface is the cornerstone of the FORMULAR library. It represents the complete definition of a form field, including its data, validation rules, state, and behavior. Understanding how to create and use field descriptors is essential for leveraging the full power of FORMULAR.

## What is IFieldDescriptor?

`IFieldDescriptor` is a comprehensive interface that defines all aspects of a form field:

```typescript
export interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: InputDataTypes
    objectValue: INDate | null
    defaultValue: InputDataTypes
    type: InputTypeNames
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: InputDataTypes
    loaded?: boolean
    changed?: boolean
    shouldValidate: boolean
    mask?: string
}
```

## Creating IFieldDescriptor Objects

There are several ways to create `IFieldDescriptor` objects, each suited for different use cases:

### 1. Hand-Crafted for Small and Isolated Needs

For simple, one-off fields or when you need precise control, you can create field descriptors manually:

```typescript
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

// Simple text field
const usernameField: IFieldDescriptor = {
    id: 1,
    name: 'username',
    label: 'Username',
    value: '',
    defaultValue: '',
    type: 'text',
    errors: [],
    guides: [],
    validationOptions: {
        required: {
            value: true,
            error: { message: 'Username is required', code: 'required', name: 'username' }
        },
        minLength: {
            value: 3,
            error: {
                message: 'Username must be at least 3 characters',
                code: 'minLength',
                name: 'username'
            }
        }
    },
    target: undefined,
    options: [],
    isValid: false,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    shouldValidate: true,
    objectValue: null
}

// Date field with mask
const birthDateField: IFieldDescriptor = {
    id: 2,
    name: 'birthDate',
    label: 'Birth Date',
    value: '',
    defaultValue: '',
    type: 'date',
    mask: '##/##/####', // DD/MM/YYYY format
    errors: [],
    guides: [],
    validationOptions: {
        required: {
            value: true,
            error: { message: 'Birth date is required', code: 'required', name: 'birthDate' }
        }
    },
    target: undefined,
    options: [],
    isValid: false,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    shouldValidate: true,
    objectValue: null
}

// Select field with options
const countryField: IFieldDescriptor = {
    id: 3,
    name: 'country',
    label: 'Country',
    value: '',
    defaultValue: '',
    type: 'select',
    errors: [],
    guides: [],
    validationOptions: {
        required: {
            value: true,
            error: { message: 'Please select a country', code: 'required', name: 'country' }
        }
    },
    target: 'countries',
    options: [
        { sequenceId: 0, name: 'switzerland', value: 'CH', label: 'Switzerland' },
        { sequenceId: 1, name: 'france', value: 'FR', label: 'France' },
        { sequenceId: 2, name: 'germany', value: 'DE', label: 'Germany' }
    ],
    isValid: false,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    shouldValidate: true,
    objectValue: null
}
```

### 2. Hand-Crafted for Tests

In testing scenarios, you often need specific field configurations. Here are examples for test fixtures:

```typescript
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

// Test field with validation errors
const testFieldWithErrors: IFieldDescriptor = {
    id: 99,
    name: 'testField',
    label: 'Test Field',
    value: 'ab', // Too short to pass validation
    defaultValue: '',
    type: 'text',
    errors: [
        {
            message: 'Value is too short',
            code: 'minLength',
            name: 'testField'
        }
    ],
    guides: [],
    validationOptions: {
        required: { value: true },
        minLength: { value: 3 }
    },
    target: undefined,
    options: [],
    isValid: false,
    isDirty: true,
    isPristine: false,
    isFocus: false,
    shouldValidate: true,
    objectValue: null
}

// Mock field for integration tests
const mockEmailField: IFieldDescriptor = {
    id: 100,
    name: 'email',
    label: 'Email Address',
    value: 'test@example.com',
    defaultValue: '',
    type: 'email',
    errors: [],
    guides: [],
    validationOptions: {
        required: { value: true },
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            error: { message: 'Invalid email format', code: 'pattern', name: 'email' }
        }
    },
    target: undefined,
    options: [],
    isValid: true,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    shouldValidate: true,
    objectValue: null
}
```

### 3. From Backend (C# and Node.js Examples)

#### C# Backend Example

```csharp
// C# DTO for field definition
public class FieldDescriptorDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public object Value { get; set; }
    public object DefaultValue { get; set; }
    public string Type { get; set; }
    public ValidationOptionsDto ValidationOptions { get; set; }
    public string Target { get; set; }
    public List<OptionItemDto> Options { get; set; }
    public bool ShouldValidate { get; set; }
    public string Mask { get; set; }
}

public class ValidationOptionsDto
{
    public RequiredValidationDto Required { get; set; }
    public MinLengthValidationDto MinLength { get; set; }
    public MaxLengthValidationDto MaxLength { get; set; }
    public PatternValidationDto Pattern { get; set; }
}

// API Controller
[ApiController]
[Route("api/[controller]")]
public class FormSchemaController : ControllerBase
{
    [HttpGet("user-registration")]
    public IActionResult GetUserRegistrationSchema()
    {
        var schema = new
        {
            name = "userRegistration",
            properties = new List<FieldDescriptorDto>
            {
                new FieldDescriptorDto
                {
                    Id = 1,
                    Name = "firstName",
                    Label = "First Name",
                    Type = "text",
                    ShouldValidate = true,
                    ValidationOptions = new ValidationOptionsDto
                    {
                        Required = new RequiredValidationDto { Value = true },
                        MinLength = new MinLengthValidationDto { Value = 2 }
                    }
                },
                new FieldDescriptorDto
                {
                    Id = 2,
                    Name = "email",
                    Label = "Email Address",
                    Type = "email",
                    ShouldValidate = true,
                    ValidationOptions = new ValidationOptionsDto
                    {
                        Required = new RequiredValidationDto { Value = true },
                        Pattern = new PatternValidationDto
                        {
                            Value = @"^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        }
                    }
                }
            }
        };

        return Ok(schema);
    }
}
```

#### Node.js Backend Example

```javascript
// Node.js/Express API endpoint
const express = require('express')
const router = express.Router()

// GET /api/form-schema/user-profile
router.get('/user-profile', (req, res) => {
    const schema = {
        name: 'userProfile',
        properties: [
            {
                id: 1,
                name: 'username',
                label: 'Username',
                value: null,
                defaultValue: '',
                type: 'text',
                validationOptions: {
                    required: { value: true },
                    minLength: { value: 3 },
                    maxLength: { value: 20 }
                },
                shouldValidate: true,
                options: []
            },
            {
                id: 2,
                name: 'birthDate',
                label: 'Date of Birth',
                value: null,
                defaultValue: '',
                type: 'date',
                mask: '##/##/####',
                validationOptions: {
                    required: { value: true }
                },
                shouldValidate: true,
                options: []
            },
            {
                id: 3,
                name: 'country',
                label: 'Country',
                value: null,
                defaultValue: '',
                type: 'select',
                target: 'countries',
                validationOptions: {
                    required: { value: true }
                },
                shouldValidate: true,
                options: [
                    { sequenceId: 0, name: 'ch', value: 'CH', label: 'Switzerland' },
                    { sequenceId: 1, name: 'fr', value: 'FR', label: 'France' },
                    { sequenceId: 2, name: 'de', value: 'DE', label: 'Germany' }
                ]
            }
        ]
    }

    res.json(schema)
})

// Frontend usage
async function loadFormSchema() {
    const response = await fetch('/api/form-schema/user-profile')
    const schema = await response.json()

    // Convert schema to field descriptors
    const descriptors = mapSchemaToFieldDescriptor(schema)
    return descriptors
}
```

### 4. Using Fluent API with FieldSchemaBuilder

For complex forms, use the fluent API provided by `FieldSchemaBuilder`. The schema is then converted using `mapSchemaToFieldDescriptor` from `to-field-descriptor.ts`:

```typescript
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

// Create schema using fluent API
const userSchema: IEntityScheme = {
    name: 'userForm',
    properties: [
        new FieldSchemaBuilder()
            .setId(1)
            .setName('username')
            .setTypeInput('text')
            .setDefaultValue('Enter username')
            .setValidationData(true, {
                required: { value: true },
                minLength: { value: 3 }
            })
            .build(),

        new FieldSchemaBuilder()
            .setId(2)
            .setName('email')
            .setTypeInput('email')
            .setValidationData(true, {
                required: { value: true },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
            })
            .build()
    ]
}

// Convert schema to field descriptors
const fieldDescriptors = mapSchemaToFieldDescriptor(userSchema)
```

See [field-schema-builder.md](./field-schema-builder.md) for detailed information about the fluent API.

### 5. Converting Objects to IFieldDescriptors

Use the `mapObjectToFields` function from `object-to-field-converter.ts` to populate field descriptors with existing data:

```typescript
import { mapObjectToFields } from '@core/framework/converters/object-to-field-converter'

// Existing user data
const userData = {
    username: 'john_doe',
    email: 'john@example.com',
    birthDate: '1990-01-15',
    country: 'CH'
}

// Base field descriptors (from schema or hand-crafted)
const baseDescriptors: IFieldDescriptor[] = [
    // ... your field descriptors
]

// Populate descriptors with data
const populatedDescriptors = mapObjectToFields(
    baseDescriptors,
    userData,
    true // forceShouldValidate
)

// The result will have field descriptors with:
// - Values populated from userData
// - loaded: true
// - isDirty: false (since this is initial data)
// - Validation will be triggered if forceShouldValidate is true
```

## Key Concepts

### Field State Management

Each `IFieldDescriptor` maintains several state properties:

- **`isValid`**: Whether the field passes validation
- **`isDirty`**: Whether the field value has been modified
- **`isPristine`**: Whether the field is in its original state
- **`isFocus`**: Whether the field currently has focus
- **`loaded`**: Whether the field has been populated with data
- **`changed`**: Whether the field value has changed

### Validation Integration

The `validationOptions` property integrates seamlessly with FORMULAR's validation system:

```typescript
validationOptions: {
    required: {
        value: true,
        error: { message: 'This field is required', code: 'required', name: 'fieldName' }
    },
    minLength: {
        value: 3,
        error: { message: 'Minimum 3 characters', code: 'minLength', name: 'fieldName' }
    }
}
```

### Options for Select Fields

For select, radio, and checkbox fields, use the `options` array:

```typescript
options: [
    { sequenceId: 0, name: 'option1', value: 'val1', label: 'Option 1' },
    { sequenceId: 1, name: 'option2', value: 'val2', label: 'Option 2' }
]
```

## Best Practices

1. **Always set unique IDs**: Ensure each field has a unique `id` within the form
2. **Use meaningful names**: Field `name` should match your data model
3. **Provide clear labels**: Use descriptive `label` text for users
4. **Set appropriate types**: Choose the correct `type` for your field (`text`, `email`, `date`, etc.)
5. **Define validation upfront**: Set `validationOptions` when creating the descriptor
6. **Use masks for formatted input**: Apply `mask` property for consistent formatting
7. **Initialize state properly**: Set correct initial values for state properties

The `IFieldDescriptor` is your entry point to the full power of FORMULAR. Whether you create them manually, load them from APIs, or use the fluent builder pattern, understanding this interface is crucial for effective form development.
