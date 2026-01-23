import { IValidationConstraintBuilder } from './interfaces/i-validation-constraint-builder'
import { ValidationConstraintType } from './types/validation-constraint.type'
import { ValidationConstraintBuilder } from './validation-constraint-builder'

/**
 * Configuration for a validation constraint
 */
export interface ValidationConstraintConfig<T = any> {
    type: ValidationConstraintType
    value: T
    name?: string
    errorMessage?: string | null
    guideMessage?: string | null
}

/**
 * Type-safe validation configuration for common field types
 */
export interface ValidationConfig {
    required?: boolean | ValidationConstraintConfig<boolean>
    min?: number | ValidationConstraintConfig<number>
    max?: number | ValidationConstraintConfig<number>
    minLength?: number | ValidationConstraintConfig<number>
    maxLength?: number | ValidationConstraintConfig<number>
    pattern?: RegExp | ValidationConstraintConfig<RegExp>
    custom?: ValidationConstraintConfig<any>
}

/**
 * Factory class for creating validation constraints
 * Provides a fluent interface for building multiple validation constraints
 */
export class ValidationConstraintFactory {
    private constraints: IValidationConstraintBuilder<any>[] = []

    /**
     * Add a required validation constraint
     */
    required(
        value: boolean = true,
        errorMessage?: string,
        guideMessage?: string,
        name?: string
    ): this {
        this.constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(value)
                .setName(name || 'required')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a min value validation constraint
     */
    min(value: number, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<number>('min')
                .setConstraint(value)
                .setName(name || 'min')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a max value validation constraint
     */
    max(value: number, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<number>('max')
                .setConstraint(value)
                .setName(name || 'max')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a minLength validation constraint
     */
    minLength(value: number, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<number>('minLength')
                .setConstraint(value)
                .setName(name || 'minLength')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a maxLength validation constraint
     */
    maxLength(value: number, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<number>('maxLength')
                .setConstraint(value)
                .setName(name || 'maxLength')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a pattern validation constraint
     */
    pattern(value: RegExp, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<RegExp>('pattern')
                .setConstraint(value)
                .setName(name || 'pattern')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a custom validation constraint
     */
    custom<T>(value: T, errorMessage?: string, guideMessage?: string, name?: string): this {
        this.constraints.push(
            new ValidationConstraintBuilder<T>('custom')
                .setConstraint(value)
                .setName(name || 'custom')
                .setErrorMessage(errorMessage || null)
                .setGuideMessage(guideMessage || null)
        )
        return this
    }

    /**
     * Add a raw constraint builder
     */
    addConstraint(constraint: IValidationConstraintBuilder<any>): this {
        this.constraints.push(constraint)
        return this
    }

    /**
     * Build all constraints
     */
    build<T = any>(): T[] {
        return this.constraints.map((c) => c.build<T>())
    }

    /**
     * Get the raw constraint builders
     */
    getConstraints(): IValidationConstraintBuilder<any>[] {
        return this.constraints
    }

    /**
     * Reset the factory
     */
    reset(): this {
        this.constraints = []
        return this
    }
}

/**
 * Functional helper to create validation constraints from a configuration object
 *
 * @example
 * ```typescript
 * const constraints = createValidationConstraints({
 *   required: true,
 *   minLength: 3,
 *   maxLength: 50,
 *   pattern: /^[a-zA-Z0-9]+$/
 * }, 'username');
 * ```
 */
export function createValidationConstraints(
    config: ValidationConfig,
    fieldName?: string
): IValidationConstraintBuilder<any>[] {
    const factory = new ValidationConstraintFactory()

    // Handle required
    if (config.required !== undefined) {
        if (typeof config.required === 'boolean') {
            factory.required(config.required, undefined, undefined, fieldName)
        } else {
            factory.required(
                config.required.value,
                config.required.errorMessage || undefined,
                config.required.guideMessage || undefined,
                config.required.name || fieldName
            )
        }
    }

    // Handle min
    if (config.min !== undefined) {
        if (typeof config.min === 'number') {
            factory.min(config.min, undefined, undefined, fieldName)
        } else {
            factory.min(
                config.min.value,
                config.min.errorMessage || undefined,
                config.min.guideMessage || undefined,
                config.min.name || fieldName
            )
        }
    }

    // Handle max
    if (config.max !== undefined) {
        if (typeof config.max === 'number') {
            factory.max(config.max, undefined, undefined, fieldName)
        } else {
            factory.max(
                config.max.value,
                config.max.errorMessage || undefined,
                config.max.guideMessage || undefined,
                config.max.name || fieldName
            )
        }
    }

    // Handle minLength
    if (config.minLength !== undefined) {
        if (typeof config.minLength === 'number') {
            factory.minLength(config.minLength, undefined, undefined, fieldName)
        } else {
            factory.minLength(
                config.minLength.value,
                config.minLength.errorMessage || undefined,
                config.minLength.guideMessage || undefined,
                config.minLength.name || fieldName
            )
        }
    }

    // Handle maxLength
    if (config.maxLength !== undefined) {
        if (typeof config.maxLength === 'number') {
            factory.maxLength(config.maxLength, undefined, undefined, fieldName)
        } else {
            factory.maxLength(
                config.maxLength.value,
                config.maxLength.errorMessage || undefined,
                config.maxLength.guideMessage || undefined,
                config.maxLength.name || fieldName
            )
        }
    }

    // Handle pattern
    if (config.pattern !== undefined) {
        if (config.pattern instanceof RegExp) {
            factory.pattern(config.pattern, undefined, undefined, fieldName)
        } else {
            factory.pattern(
                config.pattern.value,
                config.pattern.errorMessage || undefined,
                config.pattern.guideMessage || undefined,
                config.pattern.name || fieldName
            )
        }
    }

    // Handle custom
    if (config.custom !== undefined) {
        factory.custom(
            config.custom.value,
            config.custom.errorMessage || undefined,
            config.custom.guideMessage || undefined,
            config.custom.name || fieldName
        )
    }

    return factory.getConstraints()
}

/**
 * Common validation preset configurations
 */
export const ValidationPresets = {
    /**
     * Email validation preset
     */
    email: (required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 150
    }),

    /**
     * Password validation preset
     */
    password: (required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        minLength: 8,
        maxLength: 128,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    }),

    /**
     * Username validation preset
     */
    username: (required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9_-]+$/
    }),

    /**
     * Phone validation preset
     */
    phone: (required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        pattern: /^[\d\s\-+()]+$/,
        minLength: 10,
        maxLength: 20
    }),

    /**
     * URL validation preset
     */
    url: (required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        pattern: /^https?:\/\/.+/,
        maxLength: 2048
    }),

    /**
     * Numeric range validation preset
     */
    numericRange: (min: number, max: number, required: boolean = true): ValidationConfig => ({
        ...(required && { required: true }),
        min,
        max
    }),

    /**
     * Text length validation preset
     */
    textLength: (
        minLength: number,
        maxLength: number,
        required: boolean = true
    ): ValidationConfig => ({
        ...(required && { required: true }),
        minLength,
        maxLength
    })
}
