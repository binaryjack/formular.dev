import { InputTypeNames } from '@core/framework/common/common.input.types'
import { EventsType } from '@core/framework/events/events.types'
import { FieldSchemaBuilder } from './field-schema-builder'

describe('FieldSchemaBuilder', () => {
    it('should set id, name, type, and build correctly', () => {
        const builder = new (FieldSchemaBuilder as any)()
            .setId(1)
            .setName('testField')
            .setTypeInput('text' as InputTypeNames)
        const schema = builder.build()
        expect(schema.id).toBe(1)
        expect(schema.name).toBe('testField')
        expect(schema.type).toBe('text' as InputTypeNames)
    })

    it('should set validation data', () => {
        const builder = new (FieldSchemaBuilder as any)().setValidationData(true, {
            minLength: 2,
            maxLength: 5
        })
        const schema = builder.build()
        expect(schema.shouldValidate).toBe(true)
        expect(schema.minLength).toBe(2)
        expect(schema.maxLength).toBe(5)
    })

    it('should set mask', () => {
        const builder = new (FieldSchemaBuilder as any)().setMask('##/##/####')
        const schema = builder.build()
        expect(schema.mask).toBe('##/##/####')
    })

    it('should set option data', () => {
        const options = [{ label: 'A', value: 1 }]
        const builder = new (FieldSchemaBuilder as any)().setOptionData('target', options)
        const schema = builder.build()
        expect(schema.target).toBe('target')
        expect(schema.options).toEqual(options)
    })

    it('should set expected and default values', () => {
        const builder = new (FieldSchemaBuilder as any)()
            .setExpectedValue('expected')
            .setDefaultValue('default')
        const schema = builder.build()
        expect(schema.expectedValue).toBe('expected')
        expect(schema.defaultValue).toBe('default')
    })

    it('should set trigger keywords', () => {
        const onChange = 'onChange' as EventsType
        const OnBlur = 'OnBlur' as EventsType
        const triggers = [onChange, OnBlur]
        const builder = new (FieldSchemaBuilder as any)().setTriggerKeyWord(triggers)
        const schema = builder.build()
        expect(schema.triggerKeyWord).toEqual(triggers)
    })

    it('should clone the builder', () => {
        const builder = new (FieldSchemaBuilder as any)().setId(2).setName('cloneTest')
        const clone = builder.clone()
        expect(clone.id).toBe(2)
        expect(clone.name).toBe('cloneTest')
        expect(clone).not.toBe(builder)
    })
})
