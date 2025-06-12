# FORMULAR Custom Component Development Guide

## Overview

This guide demonstrates how to create custom input components that integrate seamlessly with the FORMULAR form management system. By following these patterns, you can build specialized components while maintaining consistency with the FORMULAR architecture.

## Table of Contents

- [Basic Component Structure](#basic-component-structure)
- [Field Integration Patterns](#field-integration-patterns)
- [Custom Input Types](#custom-input-types)
- [Advanced Component Features](#advanced-component-features)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Basic Component Structure

### Minimal Custom Component

```tsx
import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import { conventions, MissingPropEnum } from '@components/context/conventions/conventions'
import FieldSet from '@components/field-set/field-set'
import useFormularContext from '@components/formular-form/formular-form.context'
import ValidationResultComponent from '@components/validation-result/validation-result'

interface ICustomInputProps {
    fieldName: string
}

/**
 * A custom input component that integrates with FORMULAR.
 */
const CustomInput = ({ fieldName }: ICustomInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    useFieldDefaultValue(instance)

    return (
        <FieldSet
            inputId={
                instance?.input?.name ?? conventions.IsMissing(MissingPropEnum.ID, CustomInput.name)
            }
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => instance?.input?.focus()}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            {/* Your custom input element here */}
            <input
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                // Add your custom props and event handlers
            />
        </FieldSet>
    )
}

export default CustomInput
```

## Field Integration Patterns

### 1. State Management Integration

```tsx
const CustomToggleInput = ({ fieldName }: ICustomInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [internalState, setInternalState] = useState(false)

    // Sync with field value
    useFieldDefaultValue(instance, (value) => {
        setInternalState(Boolean(value))
    })

    const handleChange = (newValue: boolean) => {
        setInternalState(newValue)
        instance?.input?.valueManager?.setValue(instance, newValue)
    }

    return (
        <FieldSet
            inputId={instance?.input?.name ?? 'custom-toggle'}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClear={() => {
                setInternalState(false)
                instance?.input?.clear()
            }}
        >
            <button
                type="button"
                onClick={() => handleChange(!internalState)}
                className={`toggle-button ${internalState ? 'active' : ''}`}
                aria-pressed={internalState}
            >
                {internalState ? 'ON' : 'OFF'}
            </button>
        </FieldSet>
    )
}
```

### 2. Complex Input Components

```tsx
interface ICustomRatingProps {
    fieldName: string
    maxRating?: number
    starIcon?: React.ReactNode
    emptyIcon?: React.ReactNode
}

const CustomRating = ({
    fieldName,
    maxRating = 5,
    starIcon = '★',
    emptyIcon = '☆'
}: ICustomRatingProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const currentValue = Number(instance?.input?.value) || 0

    const handleRatingClick = (rating: number) => {
        instance?.input?.valueManager?.setValue(instance, rating)
        instance?.input?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const key = e.key
        if (key >= '1' && key <= maxRating.toString()) {
            handleRatingClick(Number(key))
        } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
            e.preventDefault()
            const newValue = Math.max(1, currentValue - 1)
            handleRatingClick(newValue)
        } else if (key === 'ArrowRight' || key === 'ArrowUp') {
            e.preventDefault()
            const newValue = Math.min(maxRating, currentValue + 1)
            handleRatingClick(newValue)
        }
    }

    return (
        <FieldSet
            inputId={instance?.input?.name ?? 'custom-rating'}
            label={instance?.input?.label}
            type="rating"
            flags={flags}
            onClear={() => instance?.input?.clear()}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
        >
            <div
                className="rating-container"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="slider"
                aria-valuemin={1}
                aria-valuemax={maxRating}
                aria-valuenow={currentValue}
                aria-label={instance?.input?.label || 'Rating'}
            >
                {Array.from({ length: maxRating }, (_, index) => {
                    const ratingValue = index + 1
                    const isActive = ratingValue <= (hoverValue ?? currentValue)

                    return (
                        <button
                            key={ratingValue}
                            type="button"
                            className={`rating-star ${isActive ? 'active' : ''}`}
                            onClick={() => handleRatingClick(ratingValue)}
                            onMouseEnter={() => setHoverValue(ratingValue)}
                            onMouseLeave={() => setHoverValue(null)}
                            aria-label={`${ratingValue} star${ratingValue !== 1 ? 's' : ''}`}
                        >
                            {isActive ? starIcon : emptyIcon}
                        </button>
                    )
                })}
            </div>

            {/* Hidden input for form compatibility */}
            <input type="hidden" {...instance?.register()} value={currentValue} />
        </FieldSet>
    )
}
```

### 3. File Upload Component

```tsx
interface ICustomFileUploadProps {
    fieldName: string
    accept?: string
    multiple?: boolean
    maxSize?: number // in bytes
}

const CustomFileUpload = ({
    fieldName,
    accept = '*/*',
    multiple = false,
    maxSize = 5 * 1024 * 1024 // 5MB
}: ICustomFileUploadProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [files, setFiles] = useState<File[]>([])
    const [dragActive, setDragActive] = useState(false)

    const handleFileChange = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return

        const fileArray = Array.from(selectedFiles)
        const validFiles = fileArray.filter((file) => {
            if (file.size > maxSize) {
                console.warn(`File ${file.name} exceeds maximum size`)
                return false
            }
            return true
        })

        setFiles(multiple ? [...files, ...validFiles] : validFiles)
        instance?.input?.valueManager?.setValue(instance, validFiles)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
        handleFileChange(e.dataTransfer.files)
    }

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles)
        instance?.input?.valueManager?.setValue(instance, newFiles)
    }

    return (
        <FieldSet
            inputId={instance?.input?.name ?? 'custom-file-upload'}
            label={instance?.input?.label}
            type="file"
            flags={flags}
            onClear={() => {
                setFiles([])
                instance?.input?.clear()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
        >
            <div
                className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="file-input-hidden"
                    ref={(r) => instance?.ref(r)}
                />

                <div className="upload-content">
                    <div className="upload-icon">📁</div>
                    <p>Drop files here or click to browse</p>
                    {maxSize && (
                        <small>Maximum file size: {(maxSize / 1024 / 1024).toFixed(1)}MB</small>
                    )}
                </div>

                {files.length > 0 && (
                    <div className="file-list">
                        {files.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="file-item">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{(file.size / 1024).toFixed(1)}KB</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="remove-file"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </FieldSet>
    )
}
```

## Custom Input Types

### Registering Custom Input Types

To create completely custom input types, you need to extend the FORMULAR type system:

```typescript
// 1. Extend the input types enum
export enum CustomInputTypesEnum {
    rating = 'rating',
    fileUpload = 'fileUpload',
    colorPicker = 'colorPicker',
    signature = 'signature'
}

// 2. Create builders for your custom types
export class RatingBuilder extends FieldSchemaBuilder {
    setMaxRating(max: number) {
        this.descriptor.customProperties = {
            ...this.descriptor.customProperties,
            maxRating: max
        }
        return this
    }

    setStarStyle(style: 'solid' | 'outline') {
        this.descriptor.customProperties = {
            ...this.descriptor.customProperties,
            starStyle: style
        }
        return this
    }

    build(): IFieldDescriptor {
        this.descriptor.type = CustomInputTypesEnum.rating
        return super.build()
    }
}

// 3. Use in schema definition
const formSchema = {
    properties: [
        RatingBuilder.setId(1)
            .setName('serviceRating')
            .setLabel('Rate our service')
            .setMaxRating(5)
            .setStarStyle('solid')
            .setValidationData(true, Validators.required('Please provide a rating').build())
            .build()
    ]
}
```

## Advanced Component Features

### 1. Drawer Integration

For components that need dropdown/drawer functionality:

```tsx
import { Toggleable } from '@components/toggleable/toggleable'
import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'

const CustomSelectComponent = ({ fieldName }: ICustomInputProps) => {
    return (
        <Toggleable>
            <CustomSelectSF fieldName={fieldName} />
        </Toggleable>
    )
}

const CustomSelectSF = ({ fieldName }: ICustomInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const { setToggleState } = useToggleableContext()

    return (
        <FieldSet
            inputId={instance?.input?.name ?? 'custom-select'}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => setToggleState('open')}
            itemsChildren={<CustomDropdownContent />}
            itemsDrawerWidth="300px"
            itemsDrawerHeight="400px"
        >
            <input {...instance?.register()} readOnly placeholder="Select an option..." />
        </FieldSet>
    )
}
```

### 2. Keyboard Navigation

```tsx
const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                instance?.input?.blur()
                break
            case 'Enter':
                e.preventDefault()
                handleSubmit()
                break
            case 'ArrowDown':
                e.preventDefault()
                if (hasOptions) {
                    setToggleState('open')
                }
                break
            case 'Delete':
                instance?.input?.clear()
                break
            default:
                break
        }
    },
    [instance, setToggleState]
)
```

### 3. Custom Validation

```tsx
// Custom validation for your component
const validateCustomInput = (value: any, field: IExtendedInput): IValidationResult => {
    const errors: string[] = []

    if (field.validationOptions?.required?.value && !value) {
        errors.push('This field is required')
    }

    // Add your custom validation logic
    if (field.type === 'rating' && value > 5) {
        errors.push('Rating cannot exceed 5 stars')
    }

    return {
        isValid: errors.length === 0,
        errors,
        fieldName: field.name
    }
}
```

## Best Practices

### 1. Component Structure

- Always use the `FieldSet` component as the wrapper
- Implement proper TypeScript interfaces for props
- Use the `useField` hook for field integration
- Include comprehensive JSDoc documentation

### 2. State Management

- Use `useFieldDefaultValue` for initial values
- Sync internal state with field state via `valueManager`
- Handle clearing and resetting properly

### 3. Accessibility

- Implement proper ARIA attributes
- Support keyboard navigation
- Provide screen reader friendly labels
- Use semantic HTML elements

### 4. Performance

- Use `useCallback` and `useMemo` for expensive operations
- Minimize re-renders with proper dependency arrays
- Lazy load complex components when possible

### 5. Error Handling

- Always validate inputs before processing
- Provide clear error messages
- Handle edge cases gracefully
- Use the FORMULAR validation system

## CSS Styling

Create consistent styling that integrates with FORMULAR's style system:

```css
/* Component-specific styles */
.custom-input {
    @apply relative w-full;
}

.custom-input.error {
    @apply border-red-500;
}

.custom-input.focus {
    @apply ring-2 ring-blue-500;
}

.custom-input.disabled {
    @apply opacity-50 cursor-not-allowed;
}

/* Use FORMULAR's style flags */
.custom-input.dirty {
    @apply border-yellow-400;
}

.custom-input.valid {
    @apply border-green-500;
}
```

## Testing Custom Components

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { FormularForm } from '@components/formular-form/formular-form'
import CustomInput from './custom-input'

describe('CustomInput', () => {
    let mockFormInstance: IFormular<any>

    beforeEach(() => {
        // Set up mock form instance
        mockFormInstance = createMockForm()
    })

    it('should render with proper label', () => {
        render(
            <FormularForm formular={mockFormInstance}>
                <CustomInput fieldName="testField" />
            </FormularForm>
        )

        expect(screen.getByLabelText('Test Field')).toBeInTheDocument()
    })

    it('should handle value changes', () => {
        render(
            <FormularForm formular={mockFormInstance}>
                <CustomInput fieldName="testField" />
            </FormularForm>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test value' } })

        expect(input).toHaveValue('test value')
    })

    it('should display validation errors', () => {
        // Set up invalid field state
        mockFormInstance.getField('testField').validationResults = [
            { isValid: false, errors: ['This field is required'] }
        ]

        render(
            <FormularForm formular={mockFormInstance}>
                <CustomInput fieldName="testField" />
            </FormularForm>
        )

        expect(screen.getByText('This field is required')).toBeInTheDocument()
    })
})
```

## Examples Repository

For complete working examples of custom components, see:

- `src/components/` - Built-in FORMULAR components
- `src/demo/custom-components/` - Example custom implementations
- `docs/examples/` - Step-by-step tutorials

## Conclusion

Creating custom components for FORMULAR follows a consistent pattern that ensures:

- Seamless integration with form state management
- Consistent validation and error handling
- Proper accessibility and keyboard navigation
- Performance optimization through efficient re-rendering
- Type safety with comprehensive TypeScript support

By following these patterns, you can create powerful, reusable components that feel native to the FORMULAR ecosystem while providing unique functionality for your specific use cases.
