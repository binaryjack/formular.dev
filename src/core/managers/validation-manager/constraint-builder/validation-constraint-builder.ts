import { ValidationConstraintTypeEnum } from './enums/validation-constraint-type.enum'
import { IValidationConstraintBuilder } from './interfaces/i-validation-constraint-builder'
import { ValidationConstraintType } from './types/validation-constraint.type'

// Re-export for backward compatibility
export { ValidationConstraintTypeEnum }
export type { IValidationConstraintBuilder, ValidationConstraintType }

export const ValidationConstraintBuilder = function <T>(
    this: IValidationConstraintBuilder<T>,
    type: ValidationConstraintType
) {
    this.type = type
    this.errorMessage = null
    this.guideMessage = null

    this.setConstraint = function (constraint: T): IValidationConstraintBuilder<T> {
        this.constraint = constraint
        return this
    }

    this.setName = function (name: string): IValidationConstraintBuilder<T> {
        this.name = name
        return this
    }

    this.setErrorMessage = function (
        this: IValidationConstraintBuilder<T>,
        errorMessage: string | null
    ): IValidationConstraintBuilder<T> {
        this.errorMessage = errorMessage
        return this
    }

    this.setGuideMessage = function (
        this: IValidationConstraintBuilder<T>,
        guideMessage: string | null
    ): IValidationConstraintBuilder<T> {
        this.guideMessage = guideMessage
        return this
    }

    this.build = function <TOut>(): TOut {
        return {
            type: this.type,
            value: this.constraint,
            error: {
                message: this.errorMessage,
                code: this.type,
                name: this.name ?? this.type
            },
            guide: {
                message: this.guideMessage,
                code: this.type,
                name: this.name ?? this.type
            }
        } as unknown as TOut
    }

    this.clone = function <TOut>(this: IValidationConstraintBuilder<T>): TOut {
        const cloneInstance = new ValidationConstraintBuilder(this.type)
        cloneInstance.type = this.type
        cloneInstance.constraint = this.constraint
        cloneInstance.errorMessage = this.errorMessage
        cloneInstance.guideMessage = this.guideMessage
        return cloneInstance as TOut
    }
} as any as IValidationConstraintBuilder<any>
