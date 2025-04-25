import validator from './validator.strategy'
import {
    hasMax,
    hasMaxLength,
    hasMin,
    hasMinLength,
    hasPattern,
    isRequired,
    newValidatorStrategyData,
    ValidationErrorsCodes,
    ValidationTriggerModeType
} from './validator.types'

describe('Validator Strategy Tests', () => {
    // Helper function to create validation data
    const createTestData = (
        value: any,
        validationOptions: any = {},
        fieldState: ValidationTriggerModeType = 'onChange'
    ) => {
        return newValidatorStrategyData('testField', 'text', validationOptions, value, null, {
            fieldName: 'testField',
            fieldState
        })
    }

    describe('Required Validator', () => {
        it('should pass validation when required=true and value exists', () => {
            const data = createTestData('test value', {
                requiredData: isRequired(true, 'Field is required', 'Please enter a value')
            })
            const results = validator.validate(data)

            // Find required validation result
            const requiredResult = results.find((r) => r?.code === ValidationErrorsCodes.required)
            expect(requiredResult?.state).toBe(true)
        })

        it('should fail validation when required=true and value is empty', () => {
            const data = createTestData('', {
                requiredData: isRequired(true, 'Field is required', 'Please enter a value')
            })
            const results = validator.validate(data)

            // Find required validation result
            const requiredResult = results.find((r) => r?.code === ValidationErrorsCodes.required)
            expect(requiredResult?.state).toBe(false)
            expect(requiredResult?.error?.message).toBe('Field is required')
        })

        it('should pass validation when required=false and value is empty', () => {
            const data = createTestData('', {
                requiredData: isRequired(false)
            })
            const results = validator.validate(data)

            const requiredResult = results.find((r) => r?.code === ValidationErrorsCodes.required)
            expect(requiredResult?.state).toBe(true)
        })

        it('should skip validation when fieldState is reset', () => {
            const data = createTestData(
                '',
                {
                    requiredData: isRequired(true)
                },
                'reset'
            )
            const results = validator.validate(data)

            expect(results.length).toBe(0)
        })
    })

    describe('MinLength Validator', () => {
        it('should pass validation when value length >= minLength', () => {
            const data = createTestData('test value', {
                minLength: hasMinLength(5, 'Too short', 'Should be at least 5 characters')
            })
            const results = validator.validate(data)

            const minLengthResult = results.find((r) => r?.code === ValidationErrorsCodes.minLength)
            expect(minLengthResult?.state).toBe(true)
        })

        it('should fail validation when value length < minLength', () => {
            const data = createTestData('test', {
                minLength: hasMinLength(5, 'Too short', 'Should be at least 5 characters')
            })
            const results = validator.validate(data)

            const minLengthResult = results.find((r) => r?.code === ValidationErrorsCodes.minLength)
            expect(minLengthResult?.state).toBe(false)
            expect(minLengthResult?.error?.message).toBe('Too short')
            expect(minLengthResult?.guide?.message).toBe('Should be at least 5 characters')
        })
    })

    describe('MaxLength Validator', () => {
        it('should pass validation when value length <= maxLength', () => {
            const data = createTestData('test', {
                maxLength: hasMaxLength(10, 'Too long', 'Should be at most 10 characters')
            })
            const results = validator.validate(data)

            const maxLengthResult = results.find((r) => r?.code === ValidationErrorsCodes.maxLength)
            expect(maxLengthResult?.state).toBe(true)
        })

        it('should fail validation when value length > maxLength', () => {
            const data = createTestData('test value that is too long', {
                maxLength: hasMaxLength(10, 'Too long', 'Should be at most 10 characters')
            })
            const results = validator.validate(data)

            const maxLengthResult = results.find((r) => r?.code === ValidationErrorsCodes.maxLength)
            expect(maxLengthResult?.state).toBe(false)
            expect(maxLengthResult?.error?.message).toBe('Too long')
        })
    })

    describe('Min Validator', () => {
        it('should pass validation when numeric value >= min', () => {
            const data = createTestData(10, {
                min: hasMin(5, 'Too small', 'Should be at least 5')
            })
            const results = validator.validate(data)

            const minResult = results.find((r) => r?.code === ValidationErrorsCodes.min)
            expect(minResult?.state).toBe(true)
        })

        it('should fail validation when numeric value < min', () => {
            const data = createTestData(3, {
                min: hasMin(5, 'Too small', 'Should be at least 5')
            })
            const results = validator.validate(data)

            const minResult = results.find((r) => r?.code === ValidationErrorsCodes.min)
            expect(minResult?.state).toBe(false)
            expect(minResult?.error?.message).toBe('Too small')
        })
    })

    describe('Max Validator', () => {
        it('should pass validation when numeric value <= max', () => {
            const data = createTestData(8, {
                max: hasMax(10, 'Too large', 'Should be at most 10')
            })
            const results = validator.validate(data)

            const maxResult = results.find((r) => r?.code === ValidationErrorsCodes.max)
            expect(maxResult?.state).toBe(true)
        })

        it('should fail validation when numeric value > max', () => {
            const data = createTestData(15, {
                max: hasMax(10, 'Too large', 'Should be at most 10')
            })
            const results = validator.validate(data)

            const maxResult = results.find((r) => r?.code === ValidationErrorsCodes.max)
            expect(maxResult?.state).toBe(false)
            expect(maxResult?.error?.message).toBe('Too large')
        })
    })

    describe('Pattern Validator', () => {
        it('should pass validation when value matches pattern', () => {
            const data = createTestData('test123@example.com', {
                pattern: hasPattern(
                    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                    'Invalid email',
                    'Enter a valid email'
                )
            })
            const results = validator.validate(data)

            const patternResult = results.find((r) => r?.code === ValidationErrorsCodes.custom)
            expect(patternResult?.state).toBe(true)
        })

        it('should fail validation when value does not match pattern', () => {
            const data = createTestData('not-an-email', {
                pattern: hasPattern(
                    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                    'Invalid email',
                    'Enter a valid email'
                )
            })
            const results = validator.validate(data)

            const patternResult = results.find((r) => r?.code === ValidationErrorsCodes.custom)
            expect(patternResult?.state).toBe(false)
            expect(patternResult?.error?.message).toBe('Invalid email')
        })
    })

    describe('Validation Builder Tests', () => {
        it('should combine multiple validations correctly', () => {
            // Test case with multiple validation rules
            const data = createTestData('100', {
                requiredData: isRequired(true),
                minLength: hasMinLength(3),
                maxLength: hasMaxLength(10),
                min: hasMin(0),
                max: hasMax(100)
            })

            const results = validator.validate(data)

            // All validations should pass
            expect(results.every((r) => r.state)).toBe(true)
            expect(results.length).toBeGreaterThan(0)
        })

        it('should fail with multiple validation errors when appropriate', () => {
            const data = createTestData('a', {
                requiredData: isRequired(true),
                minLength: hasMinLength(3, 'Too short'),
                maxLength: hasMaxLength(10),
                pattern: hasPattern('^[0-9]+$', 'Numbers only')
            })

            const results = validator.validate(data)

            // Should have at least two failures (minLength and pattern)
            const failures = results.filter((r) => !r.state)
            expect(failures.length).toBeGreaterThanOrEqual(2)

            // Check specific failures
            const minLengthFailure = failures.find(
                (r) => r?.code === ValidationErrorsCodes.minLength
            )
            const patternFailure = failures.find((r) => r?.code === ValidationErrorsCodes.custom)

            expect(minLengthFailure).toBeDefined()
            expect(patternFailure).toBeDefined()
        })
    })
})
