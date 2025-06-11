# Value Parsing Strategies - Developer Guide

FORMULAR's Value Management system uses a sophisticated strategy pattern to handle different data types and transformations. This guide explains how developers can create, add, and use value parsing strategies with concrete examples.

## Overview

The Value Management system is responsible for converting between different data representations (DOM values, JavaScript objects, formatted strings) and ensuring type-safe value handling across different input types. It uses the strategy pattern to provide specialized parsing logic for each data type.

## Architecture Components

### 1. Core Objects and Initialization Order

Value parsing strategies are initialized as part of the base field configuration setup:

```typescript
// Initialization sequence for value strategies
export const setupBaseFieldsConfiguration = function (sm: IServiceManager) {
    const valueStrategyService = sm.lazy<IValueStrategyService>(SValueStrategyService)?.()

    // Register built-in parsing strategies
    valueStrategyService.add(
        booleanParserStrategy, // For checkbox/toggle inputs
        stringParserStrategy, // For text-based inputs
        numericParserStrategy, // For number inputs
        dateParserStrategy, // For date/time inputs
        numericOptionParserStrategy, // For numeric-based select options
        selectOptionParserStrategy // For string-based select options
    )
}
```

### 2. Parser Strategy Interface

All value parsing strategies implement the `IParserStrategy` interface:

```typescript
interface IParserStrategy<T extends Partial<InputDataTypes> | null> {
    id: string // Unique identifier
    concernedTypes: string[] // Input types this strategy handles
    fieldValueProperty: FieldValuePropertyType // Which field property to use
    setter: TSetter<T> // Function to set values
    getter: TGetter<T> // Function to get values
}

// Type definitions for setters and getters
type TSetter<T> = (field: IExtendedInput, value: T) => void
type TGetter<T> = (field: IExtendedInput) => T

// Supported field value properties
type FieldValuePropertyType = 'value' | 'id' | 'selectedOptionId' | 'checked' | 'objectValue'
```

### 3. Value Manager Integration

The `ValueManager` orchestrates value parsing strategies:

```typescript
export interface IValueManager {
    valueStrategies: IParserStrategy<InputDataTypes>[]

    // Core methods
    setValue: (field: IExtendedInput, value: Partial<InputDataTypes> | null) => void
    getValue: (field: IExtendedInput, purpose?: OutputPurposeType) => Partial<InputDataTypes> | null
    getAsString: (field: IExtendedInput) => string | null
    clear: (field: IExtendedInput | IInput) => void

    // Strategy management
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void
}
```

## Built-in Parsing Strategies

### 1. String Parser Strategy

Handles text-based input types:

```typescript
// String input/output operations
export const stringGetter: TGetter<string | null> = (exfield: IExtendedInput): string | null => {
    if (exfield.input.value !== null && !isString(exfield.input.value)) {
        throw new Error(
            `Cannot get value as string, incompatible type: ${typeof exfield.input.value}`
        )
    }
    return exfield.input.value as string | null
}

export const stringSetter: TSetter<string | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    if (value !== null && !isString(value)) {
        throw new Error(`Cannot set value as string, incompatible type: ${typeof value}`)
    }

    // Update DOM and internal value
    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value as string | null)
    exfield.input.value = value
}

// Strategy configuration
export const stringParserStrategy = setParserStrategy(
    'StringParserStrategy', // Unique ID
    stringTypes, // ['text', 'email', 'password', 'url', 'tel']
    'value', // Field property to use
    stringSetter, // Setter function
    stringGetter // Getter function
)
```

### 2. Numeric Parser Strategy

Handles numeric input types:

```typescript
export const numericGetter: TGetter<number | null> = (exfield: IExtendedInput): number | null => {
    const value = exfield.input.value
    if (value === null || value === undefined || value === '') {
        return null
    }

    const numericValue = Number(value)
    return isNaN(numericValue) ? null : numericValue
}

export const numericSetter: TSetter<number | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let processedValue: string | null = null

    if (value !== null && value !== undefined) {
        processedValue = String(value)
    }

    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), processedValue)
    exfield.input.value = processedValue
}

export const numericParserStrategy = setParserStrategy(
    'NumericParserStrategy',
    numberTypes, // ['number', 'range']
    'value',
    numericSetter,
    numericGetter
)
```

### 3. Boolean Parser Strategy

Handles checkbox and toggle inputs:

```typescript
export const booleanGetter: TGetter<boolean | null> = (exfield: IExtendedInput): boolean | null => {
    const value = exfield.input.checked
    return value ?? false
}

export const booleanSetter: TSetter<boolean | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    const booleanValue = Boolean(value)

    exfield.input.domManager.dmSetChecked(exfield.input.id.toString(), booleanValue)
    exfield.input.checked = booleanValue
}

export const booleanParserStrategy = setParserStrategy(
    'BooleanParserStrategy',
    booleanTypes, // ['checkbox', 'switch', 'toggle']
    'checked',
    booleanSetter,
    booleanGetter
)
```

### 4. Date Parser Strategy

Handles date and time inputs with complex object management:

```typescript
export const dateGetter: TGetter<string | null> = (exfield: IExtendedInput): string | null => {
    // Check if we have a structured date object
    if (!isNullEmptyOrUndefined(exfield.input.objectValue)) {
        if (isNDate(exfield.input.objectValue)) {
            const value = tryConvertINDateToDateObject(exfield.input.objectValue)

            if (value instanceof DateObject) {
                return value.toString?.(conventions.dataTypes.date.formatDisplay) ?? null
            }
        }
    }
    return exfield.input.value as string | null
}

export const dateSetter: TSetter<Date | IDateObject | INDate | string | null> = function (
    exfield: IExtendedInput,
    value: any
) {
    try {
        // Handle string input (convert to DateObject)
        if (typeof value === 'string' && value.length === 10) {
            value = tryConvertStringToDateObject(value)
        }

        // Handle INDate input
        if (isNDate(value)) {
            value = tryConvertINDateToDateObject(value)
        }

        // Handle DateObject
        if (value instanceof DateObject) {
            const dateString = value.toString?.(conventions.dataTypes.date.formatDisplay) ?? null

            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), dateString)
            exfield.input.value = dateString
            exfield.input.objectValue = value?.toINDate?.() ?? null
        } else {
            // Handle other types or clear
            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value)
            exfield.input.value = value
            exfield.input.objectValue = null
        }
    } catch (e: any) {
        logManager(
            undefined,
            'error',
            `Error setting date value for field ${exfield.input.name}: ${e.message}`,
            'dateSetter'
        )
        exfield.input.value = null
        exfield.input.objectValue = null
    }
}

export const dateParserStrategy = setParserStrategy(
    'DateParserStrategy',
    dateTypes, // ['date', 'datetime-local', 'time']
    'objectValue', // Uses objectValue for complex date handling
    dateSetter,
    dateGetter
)
```

### 5. Select Option Parser Strategy

Handles select dropdown inputs with option management:

```typescript
export const selectGetter: TGetter<IOptionItem | null> = (
    field: IExtendedInput
): IOptionItem | null => {
    const optionItem = field?.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
        field.optionBase.selectedOptionId ?? 0,
        field.input.value as string,
        field.input.value as string
    )

    if (!optionItem) {
        field.input.message(
            'info',
            'selectGetter',
            `Unable to find option for field: ${field.input.name}`
        )
        return null
    }

    return optionItem
}

export const selectSetter: TSetter<IOptionItem | null> = (
    field: IExtendedInput,
    value: any
): void => {
    if (value === null || value === undefined) {
        field.optionBase.selectedOptionId = null
        field.input.value = null
        field.input.domManager.dmSetValue(field.input.id.toString(), null)
        return
    }

    const optionItem = field?.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
        Number(value),
        value as string,
        value as string
    )

    if (!optionItem) {
        field.input.message('error', 'selectSetter', `Unable to find option: ${value as string}`)
        return
    }

    field.optionBase.selectedOptionId = Number(optionItem.id)
    field.input.value = optionItem.value
    field.input.domManager.dmSetValue(field.input.id.toString(), optionItem.value ?? '')
}

export const selectOptionParserStrategy = setParserStrategy(
    'SelectOptionParserStrategy',
    optionBasedTypes, // ['select', 'radio']
    'selectedOptionId',
    selectSetter,
    selectGetter
)
```

## Creating Custom Parsing Strategies

### 1. Example: JSON Object Parser Strategy

For fields that need to handle complex JSON data:

```typescript
// JSON object getter/setter
export const jsonObjectGetter: TGetter<object | null> = (
    exfield: IExtendedInput
): object | null => {
    const value = exfield.input.value

    if (!value || typeof value !== 'string') {
        return null
    }

    try {
        return JSON.parse(value)
    } catch (e) {
        console.warn(`Invalid JSON in field ${exfield.input.name}:`, value)
        return null
    }
}

export const jsonObjectSetter: TSetter<object | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let stringValue: string | null = null

    if (value !== null && value !== undefined) {
        try {
            stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
        } catch (e) {
            console.error(`Cannot serialize object for field ${exfield.input.name}:`, value)
            stringValue = null
        }
    }

    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), stringValue)
    exfield.input.value = stringValue
}

// Create the strategy
export const jsonObjectParserStrategy = setParserStrategy(
    'JsonObjectParserStrategy',
    ['json', 'object'], // Custom input types
    'value',
    jsonObjectSetter,
    jsonObjectGetter
)
```

### 2. Example: Currency Parser Strategy

For handling monetary values with formatting:

```typescript
export const currencyGetter: TGetter<number | null> = (exfield: IExtendedInput): number | null => {
    const value = exfield.input.value as string

    if (!value) return null

    // Remove currency symbols and formatting
    const cleanValue = value.replace(/[^0-9.-]/g, '')
    const numericValue = parseFloat(cleanValue)

    return isNaN(numericValue) ? null : numericValue
}

export const currencySetter: TSetter<number | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let formattedValue: string | null = null

    if (value !== null && value !== undefined) {
        const numericValue = Number(value)

        if (!isNaN(numericValue)) {
            // Format as currency (customize as needed)
            formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(numericValue)
        }
    }

    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), formattedValue)
    exfield.input.value = formattedValue
}

export const currencyParserStrategy = setParserStrategy(
    'CurrencyParserStrategy',
    ['currency', 'money'], // Custom currency input types
    'value',
    currencySetter,
    currencyGetter
)
```

### 3. Example: File Upload Parser Strategy

For handling file inputs:

```typescript
interface IFileData {
    name: string
    size: number
    type: string
    lastModified: number
    data?: ArrayBuffer | string // File content if needed
}

export const fileGetter: TGetter<IFileData[] | null> = (
    exfield: IExtendedInput
): IFileData[] | null => {
    const fileList = exfield.input.files

    if (!fileList || fileList.length === 0) {
        return null
    }

    // Convert FileList to our custom format
    return Array.from(fileList).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    }))
}

export const fileSetter: TSetter<IFileData[] | File[] | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    // File inputs are read-only from the value setting perspective
    // But we can clear them or handle the file list change

    if (value === null || value === undefined) {
        // Clear file input
        const inputElement = exfield.input.domManager.dmGetElement(exfield.input.id.toString())
        if (inputElement && 'value' in inputElement) {
            inputElement.value = ''
        }
        exfield.input.files = null
    } else {
        // Store file information for processing
        exfield.input.files = value
    }
}

export const fileParserStrategy = setParserStrategy(
    'FileParserStrategy',
    ['file'], // File input type
    'files', // Custom property for files
    fileSetter,
    fileGetter
)
```

## Adding Value Parsing Strategies to the System

### 1. Using the Value Strategy Service

```typescript
// In your setup file (e.g., setup-custom-parsers.ts)
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValueStrategyService,
    SValueStrategyService
} from '@project/services/value-strategy-service'
import {
    jsonObjectParserStrategy,
    currencyParserStrategy,
    fileParserStrategy
} from './custom-parsers'

export const setupCustomParsers = function (sm: IServiceManager) {
    const valueService = sm.lazy<IValueStrategyService>(SValueStrategyService)?.()

    if (valueService) {
        // Add your custom parsing strategies
        valueService.add(jsonObjectParserStrategy, currencyParserStrategy, fileParserStrategy)
    }
}
```

### 2. Integration in Application Lifecycle

```typescript
// In app-lifecycle-instances.ts
import { setupCustomParsers } from './setup-custom-parsers'

export const initializeApplication = () => {
    const serviceManager = new ServiceManager()

    // Standard setup
    setupManagers(serviceManager)
    setupFormularManager(serviceManager)
    setupBaseInputClasses(serviceManager)
    setupInputsRegistry(serviceManager)
    setupInputsFactory(serviceManager)
    setupBaseFieldsConfiguration(serviceManager) // Built-in parsers

    // Add your custom parsers
    setupCustomParsers(serviceManager)

    return serviceManager
}
```

## Output Purpose Types

The Value Manager supports different output purposes for the same field value:

```typescript
type OutputPurposeType = 'validation' | 'display' | 'submission' | 'all'

// Example usage
const field = formInstance.getField('birthDate')

// Get value for validation (may return timestamp)
const validationValue = field.input.valueManager.getValue(field, 'validation')

// Get value for display (formatted string)
const displayValue = field.input.valueManager.getValue(field, 'display')

// Get value for form submission (ISO string)
const submissionValue = field.input.valueManager.getValue(field, 'submission')
```

### Custom Purpose Handling

```typescript
export const customDateGetter: TGetter<string | number | null> = (
    exfield: IExtendedInput,
    purpose?: OutputPurposeType
): string | number | null => {
    const dateObject = exfield.input.objectValue as DateObject

    if (!dateObject) return null

    switch (purpose) {
        case 'validation':
            // Return timestamp for validation
            return dateObject.toDate?.().getTime() ?? null

        case 'display':
            // Return formatted string for display
            return dateObject.toString?.(conventions.dataTypes.date.formatDisplay) ?? null

        case 'submission':
            // Return ISO string for submission
            return dateObject.toDate?.().toISOString() ?? null

        default:
            // Default behavior
            return dateObject.toString?.(conventions.dataTypes.date.formatDisplay) ?? null
    }
}
```

## Advanced Scenarios

### 1. Multi-Format Parser Strategy

For fields that can accept multiple input formats:

```typescript
export const multiFormatDateSetter: TSetter<string | Date | number | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let dateObject: DateObject | null = null

    try {
        if (value === null || value === undefined) {
            dateObject = null
        } else if (value instanceof Date) {
            dateObject = DateObject.fromDate(value)
        } else if (typeof value === 'number') {
            dateObject = DateObject.fromTimestamp(value)
        } else if (typeof value === 'string') {
            // Try multiple date formats
            dateObject = tryParseDateString(value)
        }

        if (dateObject) {
            const formattedString = dateObject.toString(conventions.dataTypes.date.formatDisplay)
            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), formattedString)
            exfield.input.value = formattedString
            exfield.input.objectValue = dateObject.toINDate()
        } else {
            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), null)
            exfield.input.value = null
            exfield.input.objectValue = null
        }
    } catch (e) {
        console.error(`Error parsing date value:`, e)
        exfield.input.value = null
        exfield.input.objectValue = null
    }
}
```

### 2. Async Value Parser Strategy

For values that require async processing:

```typescript
export const asyncImageParserStrategy = setParserStrategy(
    'AsyncImageParserStrategy',
    ['image'],
    'value',
    async function (exfield: IExtendedInput, value: File | string | null) {
        if (!value) {
            exfield.input.value = null
            return
        }

        try {
            let imageData: string

            if (value instanceof File) {
                // Convert file to base64
                imageData = await fileToBase64(value)
            } else {
                imageData = value
            }

            // Validate image and possibly resize
            const processedImage = await processImage(imageData)

            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), processedImage)
            exfield.input.value = processedImage
        } catch (error) {
            console.error('Error processing image:', error)
            exfield.input.value = null
        }
    },
    function (exfield: IExtendedInput) {
        return exfield.input.value as string | null
    }
)

// Helper functions
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const processImage = async (imageData: string): Promise<string> => {
    // Image processing logic (resize, compress, etc.)
    return imageData
}
```

## Trigger Keywords for Value Changes

Value parsing strategies can also respond to trigger keywords to optimize when parsing occurs:

### 1. Conditional Parsing Based on Triggers

```typescript
export const smartParsingStrategy = setParserStrategy(
    'SmartParsingStrategy',
    ['smart-text'],
    'value',
    function (exfield: IExtendedInput, value: any) {
        const triggers = exfield.input.validationManager.triggerKeyWordType

        // Only perform expensive parsing on specific triggers
        if (triggers.includes('onBlur') || triggers.includes('onSubmit')) {
            // Expensive parsing operation
            const processedValue = performComplexProcessing(value)
            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), processedValue)
            exfield.input.value = processedValue
        } else {
            // Simple assignment for real-time triggers
            exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value)
            exfield.input.value = value
        }
    },
    function (exfield: IExtendedInput) {
        return exfield.input.value
    }
)
```

### 2. Debounced Value Processing

```typescript
const debouncedProcessors = new Map<string, NodeJS.Timeout>()

export const debouncedParsingStrategy = setParserStrategy(
    'DebouncedParsingStrategy',
    ['debounced-text'],
    'value',
    function (exfield: IExtendedInput, value: any) {
        // Clear existing timeout
        const existingTimeout = debouncedProcessors.get(exfield.input.name)
        if (existingTimeout) {
            clearTimeout(existingTimeout)
        }

        // Set immediate value for UI responsiveness
        exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value)
        exfield.input.value = value

        // Debounce expensive processing
        const timeout = setTimeout(() => {
            const processedValue = performExpensiveProcessing(value)
            exfield.input.value = processedValue
            debouncedProcessors.delete(exfield.input.name)
        }, 500)

        debouncedProcessors.set(exfield.input.name, timeout)
    },
    function (exfield: IExtendedInput) {
        return exfield.input.value
    }
)
```

## Practical Examples

### 1. Complete Custom Address Parser

```typescript
interface IAddress {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

export const addressGetter: TGetter<IAddress | null> = (
    exfield: IExtendedInput
): IAddress | null => {
    const value = exfield.input.value as string

    if (!value) return null

    try {
        // Parse address string into components
        return parseAddressString(value)
    } catch (e) {
        return null
    }
}

export const addressSetter: TSetter<IAddress | string | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let addressString: string | null = null

    if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
            addressString = value
        } else if (typeof value === 'object') {
            // Convert address object to formatted string
            addressString = formatAddressObject(value as IAddress)
        }
    }

    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), addressString)
    exfield.input.value = addressString
}

export const addressParserStrategy = setParserStrategy(
    'AddressParserStrategy',
    ['address'],
    'value',
    addressSetter,
    addressGetter
)

// Helper functions
const parseAddressString = (address: string): IAddress => {
    // Implementation depends on address format
    // This is a simplified example
    const parts = address.split(',').map((p) => p.trim())

    return {
        street: parts[0] || '',
        city: parts[1] || '',
        state: parts[2] || '',
        zipCode: parts[3] || '',
        country: parts[4] || 'US'
    }
}

const formatAddressObject = (address: IAddress): string => {
    return [address.street, address.city, address.state, address.zipCode, address.country]
        .filter(Boolean)
        .join(', ')
}
```

### 2. Rich Text Editor Value Strategy

```typescript
interface IRichTextContent {
    html: string
    text: string
    delta?: any // Quill Delta format
    length: number
}

export const richTextGetter: TGetter<IRichTextContent | null> = (
    exfield: IExtendedInput
): IRichTextContent | null => {
    const content = exfield.input.objectValue as IRichTextContent
    return content || null
}

export const richTextSetter: TSetter<IRichTextContent | string | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    let content: IRichTextContent | null = null

    if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
            // Convert HTML string to rich content
            content = {
                html: value,
                text: stripHtmlTags(value),
                length: stripHtmlTags(value).length
            }
        } else if (typeof value === 'object' && 'html' in value) {
            content = value as IRichTextContent
        }
    }

    if (content) {
        // Set display value (HTML for rich text editor)
        exfield.input.domManager.dmSetValue(exfield.input.id.toString(), content.html)
        exfield.input.value = content.html
        exfield.input.objectValue = content
    } else {
        exfield.input.domManager.dmSetValue(exfield.input.id.toString(), null)
        exfield.input.value = null
        exfield.input.objectValue = null
    }
}

export const richTextParserStrategy = setParserStrategy(
    'RichTextParserStrategy',
    ['rich-text', 'html-editor'],
    'objectValue',
    richTextSetter,
    richTextGetter
)

const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
}
```

## Best Practices

### 1. Parser Strategy Design

- **Type Safety**: Always validate input types and handle conversion errors gracefully
- **Performance**: Keep parsing operations lightweight; use debouncing for expensive operations
- **Consistency**: Maintain consistent data formats within your application
- **Error Handling**: Provide meaningful error messages and fallback values
- **Reversibility**: Ensure that set/get operations are reversible where possible

### 2. Data Type Management

- **Purpose-driven Output**: Use output purposes to provide different representations of the same data
- **Immutability**: Don't mutate input objects; create new instances
- **Validation Integration**: Consider how parsed values will be validated
- **Format Standards**: Use standard formats (ISO dates, standard currency formats, etc.)

### 3. Integration Patterns

- **Service Registration**: Always register strategies through the IoC container
- **Initialization Order**: Register parsers after base configuration but before form creation
- **Testing**: Test parsers with various input types and edge cases
- **Documentation**: Document expected input/output formats clearly

## Debugging and Troubleshooting

### 1. Common Issues

**Parser Not Selected**

```typescript
// Check which parser is being used
const strategy = valueManager.valueStrategies.find((s) =>
    s.concernedTypes.includes(field.input.type)
)
console.log('Active parser strategy:', strategy?.id)
```

**Type Conversion Errors**

```typescript
// Add error logging to custom parsers
export const debugParserStrategy = setParserStrategy(
    'DebugParserStrategy',
    ['debug'],
    'value',
    function (exfield: IExtendedInput, value: any) {
        console.log(`Setting value for ${exfield.input.name}:`, value, typeof value)
        try {
            // Your parsing logic
            exfield.input.value = value
        } catch (error) {
            console.error(`Parsing error in ${exfield.input.name}:`, error)
            exfield.input.value = null
        }
    },
    function (exfield: IExtendedInput) {
        const value = exfield.input.value
        console.log(`Getting value for ${exfield.input.name}:`, value, typeof value)
        return value
    }
)
```

### 2. Value Tracking

```typescript
// Track value changes for debugging
const createValueTracker = (fieldName: string) => {
    const originalSetter = someParserStrategy.setter
    const originalGetter = someParserStrategy.getter

    someParserStrategy.setter = function (field, value) {
        console.log(`[${fieldName}] Setting:`, value)
        return originalSetter.call(this, field, value)
    }

    someParserStrategy.getter = function (field) {
        const result = originalGetter.call(this, field)
        console.log(`[${fieldName}] Getting:`, result)
        return result
    }
}
```

This comprehensive guide provides developers with the knowledge and tools needed to create sophisticated value parsing strategies that integrate seamlessly with FORMULAR's architecture while maintaining type safety and performance.

---

## Related Documentation

- **[INPUT_ENGINE_VARIANTS.md](./INPUT_ENGINE_VARIANTS.md)** - Complete guide on validation strategies, input variants, and trigger keyword management
- **[README.md](./README.MD)** - Main project documentation and architecture overview
- **[LAUNCH_SCRIPTS.md](./LAUNCH_SCRIPTS.md)** - Development environment setup and build configurations

---

_For more information about FORMULAR, visit [https://formular.dev/](https://formular.dev/)._
