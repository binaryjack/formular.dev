import {
    createValidationConstraints,
    ValidationConfig,
    ValidationConstraintFactory,
    ValidationPresets
} from './validation-constraint-factory'

describe('ValidationConstraintFactory', () => {
    describe('Fluent API', () => {
        it('should create required constraint', () => {
            const factory = new ValidationConstraintFactory()
            const constraints = factory.required(true, 'Required field').build()

            expect(constraints).toHaveLength(1)
            expect(constraints[0].type).toBe('required')
            expect(constraints[0].value).toBe(true)
            expect(constraints[0].error.message).toBe('Required field')
        })

        it('should chain multiple constraints', () => {
            const factory = new ValidationConstraintFactory()
            const constraints = factory
                .required(true)
                .minLength(3)
                .maxLength(50)
                .pattern(/^[a-zA-Z]+$/)
                .build()

            expect(constraints).toHaveLength(4)
            expect(constraints[0].type).toBe('required')
            expect(constraints[1].type).toBe('minLength')
            expect(constraints[2].type).toBe('maxLength')
            expect(constraints[3].type).toBe('pattern')
        })

        it('should handle numeric range', () => {
            const factory = new ValidationConstraintFactory()
            const constraints = factory.min(18).max(120).build()

            expect(constraints).toHaveLength(2)
            expect(constraints[0].value).toBe(18)
            expect(constraints[1].value).toBe(120)
        })

        it('should reset factory', () => {
            const factory = new ValidationConstraintFactory()
            factory.required(true).minLength(3)

            expect(factory.getConstraints()).toHaveLength(2)

            factory.reset()
            expect(factory.getConstraints()).toHaveLength(0)
        })
    })

    describe('createValidationConstraints helper', () => {
        it('should create constraints from config object', () => {
            const config: ValidationConfig = {
                required: true,
                minLength: 3,
                maxLength: 50
            }

            const constraints = createValidationConstraints(config, 'username')

            expect(constraints).toHaveLength(3)
            expect(constraints[0].name).toBe('username')
        })

        it('should handle complex constraint configs', () => {
            const config: ValidationConfig = {
                required: {
                    type: 'required',
                    value: true,
                    errorMessage: 'This is required',
                    guideMessage: 'Please fill this field'
                },
                minLength: 5
            }

            const constraints = createValidationConstraints(config)

            expect(constraints).toHaveLength(2)
            expect(constraints[0].build().error.message).toBe('This is required')
            expect(constraints[0].build().guide.message).toBe('Please fill this field')
        })

        it('should handle pattern validation', () => {
            const config: ValidationConfig = {
                pattern: /^[a-z]+$/
            }

            const constraints = createValidationConstraints(config, 'field')

            expect(constraints).toHaveLength(1)
            expect(constraints[0].constraint).toEqual(/^[a-z]+$/)
        })
    })

    describe('ValidationPresets', () => {
        it('should create email validation config', () => {
            const config = ValidationPresets.email(true)

            expect(config.required).toBe(true)
            expect(config.pattern).toBeInstanceOf(RegExp)
            expect(config.maxLength).toBe(150)
        })

        it('should create password validation config', () => {
            const config = ValidationPresets.password(true)

            expect(config.required).toBe(true)
            expect(config.minLength).toBe(8)
            expect(config.maxLength).toBe(128)
            expect(config.pattern).toBeInstanceOf(RegExp)
        })

        it('should create username validation config', () => {
            const config = ValidationPresets.username(true)

            expect(config.required).toBe(true)
            expect(config.minLength).toBe(3)
            expect(config.maxLength).toBe(50)
        })

        it('should create numeric range config', () => {
            const config = ValidationPresets.numericRange(18, 120, true)

            expect(config.required).toBe(true)
            expect(config.min).toBe(18)
            expect(config.max).toBe(120)
        })

        it('should create text length config', () => {
            const config = ValidationPresets.textLength(5, 100, false)

            expect(config.required).toBeFalsy()
            expect(config.minLength).toBe(5)
            expect(config.maxLength).toBe(100)
        })
    })

    describe('Integration', () => {
        it('should work with presets and createValidationConstraints', () => {
            const emailConfig = ValidationPresets.email(true)
            const constraints = createValidationConstraints(emailConfig, 'email')

            expect(constraints.length).toBeGreaterThanOrEqual(2)
            const types = constraints.map((c) => c.type)
            expect(types).toContain('required')
            expect(types).toContain('pattern')
        })

        it('should build complete validation for complex field', () => {
            const factory = new ValidationConstraintFactory()

            factory
                .required(true, 'Username is required')
                .minLength(3, 'Username must be at least 3 characters')
                .maxLength(50, 'Username cannot exceed 50 characters')
                .pattern(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, _ and -')

            const constraints = factory.build()

            expect(constraints).toHaveLength(4)
            constraints.forEach((c) => {
                expect(c).toHaveProperty('type')
                expect(c).toHaveProperty('value')
                expect(c).toHaveProperty('error')
                expect(c).toHaveProperty('guide')
            })
        })
    })
})
