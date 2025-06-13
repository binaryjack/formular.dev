import { IFieldDescriptor } from '../schema/descriptor/field.descriptor'
import { mapFieldsToObject, mapObjectToFields } from './object-to-field-converter'

describe('mapObjectToFields', () => {
    it('should map dataObject values to schema fields', () => {
        const schema: IFieldDescriptor[] = [
            {
                id: 1,
                name: 'foo',
                type: 'text',
                value: null,
                isDirty: false,
                isFocus: false,
                isPristine: true,
                isValid: false,
                loaded: false,
                label: 'foo',
                target: undefined,
                options: [],
                errors: [],
                guides: [],
                shouldValidate: false,
                expectedValue: undefined,
                validationOptions: {},
                objectValue: null,
                defaultValue: undefined,
                mask: undefined
            },
            {
                id: 2,
                name: 'bar',
                type: 'text',
                value: null,
                isDirty: false,
                isFocus: false,
                isPristine: true,
                isValid: false,
                loaded: false,
                label: 'bar',
                target: undefined,
                options: [],
                errors: [],
                guides: [],
                shouldValidate: false,
                expectedValue: undefined,
                validationOptions: {},
                objectValue: null,
                defaultValue: undefined,
                mask: undefined
            }
        ]
        const data = { foo: 'abc', bar: 123 }
        const result = mapObjectToFields(schema, data)
        expect(result.find((f) => f.name === 'foo')?.value).toBe('abc')
        expect(result.find((f) => f.name === 'bar')?.value).toBe(123)
    })
})

describe('mapFieldsToObject', () => {
    it('should map fields to object', () => {
        const fields: IFieldDescriptor[] = [
            {
                id: 1,
                name: 'foo',
                type: 'text',
                value: 'abc',
                isDirty: false,
                isFocus: false,
                isPristine: true,
                isValid: true,
                loaded: true,
                label: 'foo',
                target: undefined,
                options: [],
                errors: [],
                guides: [],
                shouldValidate: false,
                expectedValue: undefined,
                validationOptions: {},
                objectValue: null,
                defaultValue: undefined,
                mask: undefined
            },
            {
                id: 2,
                name: 'id',
                type: 'number',
                value: 5,
                isDirty: false,
                isFocus: false,
                isPristine: true,
                isValid: true,
                loaded: true,
                label: 'id',
                target: undefined,
                options: [],
                errors: [],
                guides: [],
                shouldValidate: false,
                expectedValue: undefined,
                validationOptions: {},
                objectValue: null,
                defaultValue: undefined,
                mask: undefined
            }
        ]
        const obj = mapFieldsToObject(fields)
        expect(obj).toHaveProperty('foo', '')
        expect(obj).toHaveProperty('id', 5)
    })
})
