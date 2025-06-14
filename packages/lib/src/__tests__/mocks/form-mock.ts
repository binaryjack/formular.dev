import { EventsType } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { LoadingStatus } from '@core/status'

// Simple mock field implementation focused on testing needs
export class MockField {
    name: string
    private _value: any

    constructor(descriptor: IFieldDescriptor) {
        this.name = descriptor.name
        this._value = descriptor.value || descriptor.defaultValue || ''
    }

    setValue(value: any): void {
        this._value = value
    }

    getValue(): any {
        return this._value
    }

    validate(): boolean {
        return true // Always valid for simple mock
    }

    reset(): void {
        this._value = ''
    }
}

// Mock form instance with minimal IFormular implementation
export class MockFormular {
    fields: MockField[] = []
    originFields: MockField[] = []
    submitCount: number = 0
    validateOnFirstSubmit: boolean = false
    isFormularBinded: boolean = false
    readonly id: string = 'mock-formular'
    readonly manager: any = {
        notificationManager: null
    }
    readonly notificationManager: any = null
    triggerKeyWordType: EventsType[] = []
    isBusy: LoadingStatus = LoadingStatus.Loaded
    isDirty: boolean = false
    isValid: boolean = true
    autoTracker: any = null
    private submitCallback?: (data: any) => void

    constructor(fieldDescriptors: IFieldDescriptor[] = []) {
        this.fields = fieldDescriptors.map((descriptor) => new MockField(descriptor))
        this.originFields = [...this.fields]
    }

    // Core methods needed by tests
    async checkAllFieldsAreValid(): Promise<boolean> {
        return true
    }

    addFields(...flds: any[]): void {
        // Mock implementation
    }

    getField(fieldName: string): any {
        return this.fields.find((field) => field.name === fieldName)
    }

    checkChanges(): void {
        // Mock implementation
    }

    async submit(): Promise<Record<string, any>> {
        this.submitCount++
        const data: Record<string, any> = {}
        this.fields.forEach((field) => {
            data[field.name] = field.getValue()
        })

        if (this.submitCallback) {
            this.submitCallback(data)
        }

        return Promise.resolve(data)
    }

    setIsBusy(status: LoadingStatus): void {
        this.isBusy = status
    }

    hasChanges(callback: () => void): void {
        if (this.isDirty) {
            callback()
        }
    }

    getFormFlags() {
        return {
            isBusy: this.isBusy,
            isDirty: this.isDirty,
            isValid: this.isValid,
            setIsBusy: this.setIsBusy.bind(this)
        }
    }

    getData(): Record<string, any> {
        const data: Record<string, any> = {}
        this.fields.forEach((field) => {
            data[field.name] = field.getValue()
        })
        return data
    }

    setTriggerKeyWord(mode: EventsType[]): void {
        this.triggerKeyWordType = mode
        this.validateOnFirstSubmit = mode.includes('validateOnFormFirstSubmit' as EventsType)
    }

    // Validation methods
    validate(field: any, reset?: boolean): any[] {
        return [] // Always valid for mock
    }

    async validateAsync(field: any, reset?: boolean): Promise<any[]> {
        return Promise.resolve([])
    }

    // Test helper methods
    setFieldValue(fieldName: string, value: any): void {
        const field = this.getField(fieldName)
        if (field) {
            field.setValue(value)
        }
    }

    getFieldValue(fieldName: string): any {
        const field = this.getField(fieldName)
        return field ? field.getValue() : undefined
    }

    reset(): void {
        this.fields.forEach((field) => field.reset())
        this.isDirty = false
        this.submitCount = 0
    }

    onSubmit(callback: (data: any) => void): void {
        this.submitCallback = callback
    }

    addField(descriptor: IFieldDescriptor): void {
        const field = new MockField(descriptor)
        this.fields.push(field)
        this.originFields.push(field)
    }
}

/**
 * Create a mock form instance with predefined fields
 */
export function createMockFormular(fieldDescriptors: IFieldDescriptor[] = []): MockFormular {
    return new MockFormular(fieldDescriptors)
}

/**
 * Create a simple text field descriptor for testing
 */
export function createMockTextFieldDescriptor(
    name: string,
    overrides: Partial<IFieldDescriptor> = {}
): IFieldDescriptor {
    return {
        id: Math.floor(Math.random() * 1000),
        name,
        label: overrides.label || name.charAt(0).toUpperCase() + name.slice(1),
        value: '',
        defaultValue: '',
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        objectValue: null,
        type: 'text',
        errors: [],
        guides: [],
        validationOptions: {},
        options: [],
        shouldValidate: overrides.shouldValidate ?? true,
        ...overrides
    }
}
