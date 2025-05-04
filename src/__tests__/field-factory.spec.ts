import { FieldFactory, IFieldFactory } from '../core/factory/field.factory'
import { IFieldDescriptor } from '../core/framework/schema/descriptor/field.descriptor'

describe('FieldFactory', () => {
    let factory: IFieldFactory

    beforeEach(() => {
        factory = new FieldFactory()
    })

    const mockDescriptor: IFieldDescriptor = {
        id: 1,
        name: 'testField',
        label: 'Test Field',
        value: '',
        defaultValue: '',
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        objectValue: null,
        type: undefined,
        errors: [],
        guides: [],
        validationOptions: undefined,
        options: [],
        shouldValidate: false
    }

    it('should create a text field', () => {
        const textField = factory.create('text', mockDescriptor)
        expect(textField).toBeDefined()
        expect(textField.name).toBe('testField')
    })

    it('should create a checkbox field', () => {
        const checkboxField = factory.create('checkbox', mockDescriptor)
        expect(checkboxField).toBeDefined()
        expect(checkboxField.name).toBe('testField')
    })

    it('should create a select field', () => {
        const selectField = factory.create('select', mockDescriptor)
        expect(selectField).toBeDefined()
        expect(selectField.name).toBe('testField')
    })

    it('should create a radio field', () => {
        const radioField = factory.create('radio', mockDescriptor)
        expect(radioField).toBeDefined()
        expect(radioField.name).toBe('testField')
    })

    it('should throw an error for unsupported field types', () => {
        expect(() =>
            factory.create('unsupportedType' as keyof FieldTypeMap, mockDescriptor)
        ).toThrow('Unsupported field type: unsupportedType')
    })

    it('should initialize base input properties correctly', () => {
        const textField = factory.create('text', mockDescriptor)
        expect(textField.id).toBe(mockDescriptor.id)
        expect(textField.name).toBe(mockDescriptor.name)
        expect(textField.label).toBe(mockDescriptor.label)
    })
})
