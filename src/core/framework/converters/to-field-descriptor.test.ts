import { mapSchemaToFieldDescriptor } from './to-field-descriptor'

describe('mapSchemaToFieldDescriptor', () => {
    it('should map IEntityScheme to IFieldDescriptor[]', () => {
        const scheme = {
            properties: [
                {
                    id: 1,
                    name: 'foo',
                    type: 'text',
                    required: { value: true },
                    max: undefined,
                    min: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                    pattern: undefined,
                    options: [],
                    shouldValidate: true,
                    expectedValue: undefined,
                    target: undefined,
                    defaultValue: undefined
                },
                {
                    id: 2,
                    name: 'bar',
                    type: 'number',
                    required: { value: false },
                    max: 10,
                    min: 1,
                    maxLength: undefined,
                    minLength: undefined,
                    pattern: undefined,
                    options: [],
                    shouldValidate: false,
                    expectedValue: undefined,
                    target: undefined,
                    defaultValue: undefined
                }
            ]
        }
        const result = mapSchemaToFieldDescriptor(scheme as any)
        expect(result.length).toBe(2)
        expect(result[0].name).toBe('foo')
        expect(result[1].name).toBe('bar')
        expect(result[0].validationOptions?.required).toEqual({ value: true })
        expect(result[1].validationOptions?.max).toBe(10)
    })
})
