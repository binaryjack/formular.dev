import { ValidationConstraintType } from '../types/validation-constraint.type'

export interface IValidationConstraintBuilder<T> {
    setValidationTrigger(trigger: string): unknown
    new <T>(type: ValidationConstraintType): IValidationConstraintBuilder<T>
    type: ValidationConstraintType
    constraint: T
    name: string | null
    errorMessage: string | null
    guideMessage: string | null
    setConstraint: (constraint: T) => IValidationConstraintBuilder<T>
    setName: (name: string) => IValidationConstraintBuilder<T>
    setErrorMessage: (errorMessage: string | null) => IValidationConstraintBuilder<T>
    setGuideMessage: (guideMessage: string | null) => IValidationConstraintBuilder<T>
    build: <TOut>() => TOut
    clone: <TOut>() => TOut
}
