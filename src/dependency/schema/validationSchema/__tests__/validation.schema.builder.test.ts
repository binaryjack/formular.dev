import { ValidationSchemaBuilder } from '../validation.schema.builder'
import { ValidationSchemaBuildersEnum } from '../validation.schema.builder.types'
import {
    BaseEmptyBuilder,
    MaxBuilder,
    MinBuilder,
    MinLengthAndMaxLengthBuilder,
    MinLengthBuilder,
    MinMaxBuilder,
    RequiredBuilder
} from '../validation.schema.specific.builders'

describe('ValidationSchemaBuilder Tests', () => {
    it('should create a basic schema builder', () => {
        const builder = new ValidationSchemaBuilder('test')
        expect(builder.name).toBe('test')
        expect(builder.required).toBe(false)
    })

    it('should build with isRequired', () => {
        const schema = new ValidationSchemaBuilder('test').isRequired(true).build()

        expect(schema.required).toBe(true)
        expect(schema.name).toBe('test')
    })

    it('should build with min/max values', () => {
        const schema = new ValidationSchemaBuilder('test').hasMin(5).hasMax(10).build()

        expect(schema.min).toBe(5)
        expect(schema.max).toBe(10)
    })

    it('should build with minLength/maxLength', () => {
        const schema = new ValidationSchemaBuilder('test').hasMinLength(3).hasMaxLength(20).build()

        expect(schema.minLength).toBe(3)
        expect(schema.maxLength).toBe(20)
    })

    it('should build with pattern', () => {
        const pattern = /^[a-z]+$/
        const schema = new ValidationSchemaBuilder('test').hasPattern(pattern).build()

        expect(schema.pattern).toBe(pattern)
    })

    it('should build with custom messages', () => {
        const schema = new ValidationSchemaBuilder('test')
            .hasCustomError('This is an error')
            .hasCustomGuide('This is a guide')
            .build()

        expect(schema.customError).toBe('This is an error')
        expect(schema.customGuide).toBe('This is a guide')
    })

    it('should copy values from another builder with fromBuilder', () => {
        const baseBuilder = new ValidationSchemaBuilder('base')
            .isRequired(true)
            .hasMinLength(5)
            .hasPattern(/^\d+$/)

        const newBuilder = new ValidationSchemaBuilder('new').fromBuilder(baseBuilder)

        expect(newBuilder.required).toBe(true)
        expect(newBuilder.minLength).toBe(5)
        expect(newBuilder.pattern).toBe('^[0-9]+$')
    })
})

describe('Validation Schema Specific Builders', () => {
    it('should create BaseEmptyBuilder', () => {
        const builder = BaseEmptyBuilder()
        expect(builder.required).toBe(false)
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.BaseEmptyBuilder)
    })

    it('should create RequiredBuilder', () => {
        const builder = RequiredBuilder()
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.RequiredBuilder)
    })

    it('should create MinBuilder with correct value', () => {
        const builder = MinBuilder(10)
        expect(builder.min).toBe(10)
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.MinBuilder)
    })

    it('should create MaxBuilder with correct value', () => {
        const builder = MaxBuilder(20)
        expect(builder.max).toBe(20)
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.MaxBuilder)
    })

    it('should create MinMaxBuilder with correct values', () => {
        const builder = MinMaxBuilder(5, 10)
        expect(builder.min).toBe(5)
        expect(builder.max).toBe(10)
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.MinMaxBuilder)
    })

    it('should create MinLengthAndMaxLengthBuilder with correct values', () => {
        const builder = MinLengthAndMaxLengthBuilder(3, 20)
        expect(builder.minLength).toBe(3)
        expect(builder.maxLength).toBe(20)
        expect(builder.name).toBe(ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder)
    })

    // Test chaining and building
    it('should support method chaining and building', () => {
        const schema = MinLengthBuilder(5)
            .hasCustomGuide('Enter at least 5 characters')
            .hasPattern(/^[A-Z]/)
            .build()

        expect(schema.minLength).toBe(5)
        expect(schema.customGuide).toBe('Enter at least 5 characters')
        expect(schema.pattern).toBe('^[A-Z]')
    })
})
